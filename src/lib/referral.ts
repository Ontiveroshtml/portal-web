const STORAGE_KEY = "gc_referral_code";

// Se captura una sola vez al entrar con ?ref=CODIGO y se guarda en
// localStorage (no sessionStorage: el visitante puede volver días después,
// desde otra pestaña, a pagar) para que el checkout lo lea aunque la compra
// no sea en la misma visita que el link.
export function captureReferralFromUrl(): void {
  const code = new URLSearchParams(window.location.search).get("ref");
  if (!code || !/^[a-z0-9_-]{2,40}$/i.test(code.trim())) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, code.trim().toLowerCase());
  } catch {
    // Privacidad estricta del navegador o cuota llena: sin código guardado,
    // el checkout simplemente sale sin comisión de afiliado.
  }
}

export function getStoredReferralCode(): string | undefined {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}
