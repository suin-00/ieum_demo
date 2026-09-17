// src/lib/utils.ts
export const getSafeImageUrl = (url?: string) => {
  if (
    !url ||
    typeof url !== "string" ||
    url.trim() === "" ||
    url === "undefined" ||
    url === "null"
  ) {
    return "/images/unified_profile.png";
  }
  if (url.startsWith("images/")) {
    return `/${url}`;
  }
  return url;
};
