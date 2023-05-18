import { query } from "./query";

export const logout = async () => {
  await query("/api/dashboard/auth/logout", "post");
  localStorage.clear();
  return (window.location.href = "/login");
};
