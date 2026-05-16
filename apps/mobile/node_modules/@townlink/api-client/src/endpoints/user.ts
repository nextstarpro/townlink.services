import type { User } from "@townlink/core";
import { apiFetch } from "../client";

export async function getProfile(token: string) {
  return apiFetch<User>("/user", { token });
}

export async function updateProfile(token: string, data: Partial<User>) {
  return apiFetch<User>("/user", {
    method: "PUT",
    token,
    body: JSON.stringify(data),
  });
}
