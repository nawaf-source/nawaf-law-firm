import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { verifyTurnstile } from "@/lib/turnstile";
import { contactEmail } from "@/lib/email-templates";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend-client";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "بيانات غير صالحة", issues: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const data = parsed.data;

    const ok = await verifyTurnstile(data.turnstileToken);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "فشل التحقق من Captcha" }, { status: 403 });
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.email,
      subject: "رسالة تواصل من الموقع - مكتب المحاماة",
      html: contactEmail(data),
    });

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "تعذر إرسال البريد" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] unexpected:", err);
    return NextResponse.json({ ok: false, error: "خطأ غير متوقع" }, { status: 500 });
  }
}
