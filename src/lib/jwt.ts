import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "./types";

// Sem "server-only" de propósito: o proxy.ts também confere o token. Nada aqui lê cookies.

export const SESSION_COOKIE = "bf_session";
export const SESSION_DAYS = 7;

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) {
    if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET is not set");
    // só em dev: em produção um segredo conhecido deixaria qualquer um forjar sessão
    return new TextEncoder().encode("dev-only-secret-change-me-dev-only-secret");
  }
  return new TextEncoder().encode(value);
}

export async function signSession(user: SessionUser) {
  return new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

/** Token inválido, expirado ou adulterado vira null — nunca lança. */
export async function verifySession(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    const role = payload.role;
    if (!payload.sub || (role !== "admin" && role !== "customer")) return null;
    return { id: payload.sub, name: String(payload.name ?? ""), email: String(payload.email ?? ""), role };
  } catch {
    return null;
  }
}
