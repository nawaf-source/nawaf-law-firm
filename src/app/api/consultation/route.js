import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, consultationEmail } from "@/server/email";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, type, description } = body || {};

    if (!name || !phone || !email || !type || !description) {
      return NextResponse.json(
        { ok: false, error: "الحقول الأساسية ناقصة" },
        { status: 422 }
      );
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: "طلب استشارة قانونية - موقع مكتب المحاماة",
      html: consultationEmail(body),
    });

    if (error) {
      console.error("[api/consultation] Resend error:", error);
      return NextResponse.json({ ok: false, error: "تعذر إرسال البريد" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/consultation] unexpected:", err);
    return NextResponse.json({ ok: false, error: "خطأ غير متوقع" }, { status: 500 });
  }
}
