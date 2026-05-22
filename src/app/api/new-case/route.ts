import { NextRequest, NextResponse } from "next/server";
import { newCaseSchema } from "@/lib/schemas";
import { verifyTurnstile } from "@/lib/turnstile";
import { newCaseEmail } from "@/lib/email-templates";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend-client";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Parse multipart so we can read files + JSON payload.
    const formData = await req.formData();
    const payloadRaw = formData.get("payload");
    if (typeof payloadRaw !== "string") {
      return NextResponse.json({ ok: false, error: "حمولة غير صالحة" }, { status: 400 });
    }
    const payload = JSON.parse(payloadRaw);

    const parsed = newCaseSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير مكتملة", issues: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const data = parsed.data;

    // Captcha
    const ok = await verifyTurnstile(data.turnstileToken);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "فشل التحقق من Captcha" }, { status: 403 });
    }

    // Collect file attachments
    const files = formData.getAll("files") as File[];
    const MAX_TOTAL = 25 * 1024 * 1024; // 25 MB total (Resend hard cap is 40MB raw)
    const MAX_PER = 10 * 1024 * 1024;   // 10 MB / file (per UI spec)
    let total = 0;
    const attachments: { filename: string; content: Buffer }[] = [];
    const fileSummaries: string[] = [];

    for (const f of files) {
      if (!(f instanceof File)) continue;
      if (f.size > MAX_PER) {
        return NextResponse.json(
          { ok: false, error: `الملف ${f.name} يتجاوز ١٠ ميجابايت` },
          { status: 413 }
        );
      }
      total += f.size;
      if (total > MAX_TOTAL) {
        return NextResponse.json(
          { ok: false, error: "إجمالي حجم المرفقات يتجاوز ٢٥ ميجابايت" },
          { status: 413 }
        );
      }
      const buf = Buffer.from(await f.arrayBuffer());
      attachments.push({ filename: f.name, content: buf });
      fileSummaries.push(`${f.name} — ${(f.size / 1024 / 1024).toFixed(2)} MB`);
    }

    const html = newCaseEmail(data, fileSummaries);

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.email,
      subject: "طلب تسجيل قضية جديدة - موقع مكتب المحاماة",
      html,
      attachments,
    });

    if (error) {
      console.error("[api/new-case] Resend error:", error);
      return NextResponse.json({ ok: false, error: "تعذر إرسال البريد" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/new-case] unexpected:", err);
    return NextResponse.json({ ok: false, error: "خطأ غير متوقع" }, { status: 500 });
  }
}
