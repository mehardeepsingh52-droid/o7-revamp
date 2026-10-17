import { company } from "./site";

// No form backend yet: build a mailto link so the visitor's email app opens with the enquiry filled in.
export function enquiryMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const subject = `New enquiry: ${data.get("service")}`;
  const body = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone") || "-"}`,
    "",
    String(data.get("message")),
  ].join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
