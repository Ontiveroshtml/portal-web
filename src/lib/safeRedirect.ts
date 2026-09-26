import { detectLanguage, t } from "../i18n";

const ALLOWED_HOSTS = new Set([
  "checkout.stripe.com",
  "billing.stripe.com",
  "buy.stripe.com",
  "discord.com",
]);

// Solo redirige a https y a hosts conocidos; una URL rara del backend no navega.
export function safeRedirect(url: string): boolean {
  try {
    const u = new URL(url, window.location.href);
    if (u.protocol === "https:" && (ALLOWED_HOSTS.has(u.hostname) || u.hostname === window.location.hostname)) {
      window.location.assign(u.href);
      return true;
    }
  } catch {
    // URL inválida: cae al error de abajo.
  }
  console.error("Blocked redirect to untrusted URL");
  window.alert(t(detectLanguage(), "app.redirectBlocked"));
  return false;
}
