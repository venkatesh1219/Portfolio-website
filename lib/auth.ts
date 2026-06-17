/**
 * Minimal single-user admin auth. A username + password (from env) are checked
 * on login; on success we store a derived, non-reversible token in an httpOnly
 * cookie and the middleware compares it on every /admin request.
 *
 * Edge-safe: uses Web Crypto only (works in both middleware and server actions).
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The token that a valid session cookie must contain. */
export async function expectedToken(): Promise<string> {
  const user = process.env.ADMIN_USERNAME ?? "";
  const pass = process.env.ADMIN_PASSWORD ?? "";
  return sha256Hex(`${user}:${pass}:venkatesh-portfolio-admin`);
}

export async function credentialsMatch(
  username: string,
  password: string
): Promise<boolean> {
  if (!adminConfigured()) return false;
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}
