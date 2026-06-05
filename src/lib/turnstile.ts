/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true if the token is valid, false otherwise.
 * If TURNSTILE_SECRET_KEY is not configured, verification is skipped (dev mode).
 */
export async function verifyTurnstile(token?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }).toString(),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification failed", err);
    return false;
  }
}
