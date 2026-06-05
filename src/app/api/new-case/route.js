import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO, newCaseEmail } from "@/server/email";

import { validateFiles } from "@/lib/attachments";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();

    // collect scalar fields
    const body = {};
    for (const [key, value] of form.entries()) {
      if (key === "files") continue;
      body[key] = typeof value === "string" ? value : "";
    }
    // normalise the declaration booleans coming through as "true"/""
    body.agreePrivacy = body.agreePrivacy === "true";
    body.agreeAccuracy = body.agreeAccuracy === "true";
    body.agreeNonContract = body.agreeNonContract === "true";

    const { fullName, phone, email, caseType, description } = body;

    // prevent sending if core fields are missing
    if (!fullName || !phone || !email || !caseType || !description) {
      return NextResponse.json(
        { ok: false, error: "الحقول الأساسية ناقصة" },
        { status: 422 }
      );
    }

    // gather uploaded files
    const uploads = form.getAll("files").filter((f) => f && typeof f === "object" && "arrayBuffer" in f && f.size > 0);

    // re-validate attachments on the server (never trust the client)
    const check = validateFiles(uploads.map((f) => ({ name: f.name, size: f.size })), 0);
    if (!check.ok) {
      return NextResponse.json({ ok: false, error: check.error }, { status: 422 });
    }

    // convert to Resend attachment objects ({ filename, content: Buffer })
    const attachments = [];
    for (const f of uploads) {
      const buf = Buffer.from(await f.arrayBuffer());
      attachments.push({ filename: f.name, content: buf });
    }

    // pass filename/size metadata to the email template
    body.files = uploads.map((f) => ({ name: f.name, size: f.size }));

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: "طلب تسجيل قضية جديدة - موقع مكتب المحاماة",
      html: newCaseEmail(body),
      ...(attachments.length ? { attachments } : {}),
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
