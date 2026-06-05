/* ============================================================
   Shared attachment rules for the case-registration form.
   Imported by BOTH the client form and the server API route so
   client-side and server-side validation can never drift apart.
   ============================================================ */

export const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB per file
export const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10 MB total

// Allowed extensions (authoritative — extension check is more reliable
// than MIME for heic/rar/zip across browsers).
export const ALLOWED_EXT = [
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "jpg", "jpeg", "png", "webp", "heic", "txt", "zip", "rar",
];

// Mirror for the <input accept="…"> attribute.
export const ACCEPT_ATTR = ALLOWED_EXT.map((e) => "." + e).join(",");

// Exact Arabic validation messages.
export const ERR_TYPE = "نوع الملف غير مسموح.";
export const ERR_FILE_SIZE = "حجم الملف يتجاوز الحد المسموح.";
export const ERR_TOTAL_SIZE = "إجمالي حجم المرفقات يتجاوز الحد المسموح.";

// WhatsApp fallback for oversized attachments.
export const WHATSAPP_NUMBER = "966591119098";
export const WHATSAPP_MESSAGE =
  "حجم المرفقات كبير جدًا ولا يمكن إرساله من خلال النموذج. يرجى إرسال الملفات الكبيرة عبر الواتساب، ثم إكمال إرسال بيانات القضية.";
export const WHATSAPP_PREFILL =
  "السلام عليكم، أرغب بإرسال مرفقات القضية الكبيرة الخاصة بطلب تسجيل قضية.";
export const WHATSAPP_BTN_TEXT = "إرسال الملفات عبر واتساب";
export function whatsappHref() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;
}

export function extOf(name) {
  const m = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

export function fmtSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

/**
 * Strict validation — used on the SERVER (and as a final client guard).
 * Rejects the whole batch on the first problem. Returns { ok, error }
 * with an exact Arabic message.
 *
 * @param incoming files being checked (File objects or { name, size })
 * @param existingBytes bytes already accepted
 */
export function validateFiles(incoming, existingBytes = 0) {
  let total = existingBytes;
  for (const f of incoming) {
    const ext = extOf(f.name);
    if (!ALLOWED_EXT.includes(ext)) {
      return { ok: false, error: ERR_TYPE };
    }
    if (f.size > MAX_FILE_BYTES) {
      return { ok: false, error: ERR_FILE_SIZE };
    }
    total += f.size;
  }
  if (total > MAX_TOTAL_BYTES) {
    return { ok: false, error: ERR_TOTAL_SIZE };
  }
  return { ok: true, error: "" };
}

/**
 * Lenient partition — used on the CLIENT when the user picks files.
 * Keeps every valid file, sets flags for the rejected ones so the UI
 * can show a type error and/or the WhatsApp fallback WITHOUT discarding
 * the good files or clearing the form.
 *
 * @returns { accepted, typeError, oversize }
 *   accepted  – File[] that pass all rules (added to the form)
 *   typeError – true if any file had a disallowed extension
 *   oversize  – true if any single file > 4MB OR adding it would exceed 10MB total
 */
export function partitionFiles(incoming, existingBytes = 0) {
  let total = existingBytes;
  const accepted = [];
  let typeError = false;
  let oversize = false;
  for (const f of incoming) {
    const ext = extOf(f.name);
    if (!ALLOWED_EXT.includes(ext)) {
      typeError = true;
      continue;
    }
    if (f.size > MAX_FILE_BYTES) {
      oversize = true;
      continue;
    }
    if (total + f.size > MAX_TOTAL_BYTES) {
      oversize = true;
      continue;
    }
    total += f.size;
    accepted.push(f);
  }
  return { accepted, typeError, oversize };
}
