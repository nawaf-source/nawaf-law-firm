import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, contactEmail } from "@/server/email";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body || {};

    // prevent sending if core fields are missing
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "الحقول الأساسية ناقصة" },
        { status: 422 }
      );
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: "رسالة تواصل من الموقع - مكتب المحاماة",
      html: contactEmail(body),
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
