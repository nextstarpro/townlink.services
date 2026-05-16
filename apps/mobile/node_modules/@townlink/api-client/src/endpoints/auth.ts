import { apiFetch } from "../client";

export async function sendOtp(phone: string, countryCode: string) {
  return apiFetch("/auth", {
    method: "POST",
    body: JSON.stringify({ action: "send-otp", phone, countryCode }),
  });
}

export async function verifyOtp(phone: string, code: string) {
  return apiFetch<{ token: string }>("/auth", {
    method: "POST",
    body: JSON.stringify({ action: "verify-otp", phone, code }),
  });
}
