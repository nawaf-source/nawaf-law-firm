import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, newCaseEmail } from "@/server/email";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, phone, email, caseType, description } = body || {};

    // prevent sending if core fields are missing
    if (!fullName || !phone || !email || !caseType || !description) {
      return NextResponse.json(
        { ok: false, error: "الحقول الأساسية ناقصة" },
        { status: 422 }
      );
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: "طلب تسجيل قضية جديدة - موقع مكتب المحاماة",
      html: newCaseEmail(body),
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
