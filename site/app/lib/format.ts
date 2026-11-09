// Slicing and UTC keep dates stable between the build and the visitor's time zone.
export const monthYear = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
export const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
export const pad = (n: number) => String(n).padStart(2, "0");
export const lastSegment = (url: string) => new URL(url).pathname.replace(/\.data$/, "").replace(/\/$/, "").split("/").pop() ?? "";
