export type ContactInput = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export const topics = [
  "General inquiry",
  "Partnership",
  "Media & press",
  "One of our brands",
] as const;

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();
  if (name.length < 2) errors.name = "Enter your full name.";
  else if (name.length > 120) errors.name = "Keep your name under 120 characters.";
  if (!email) errors.email = "Enter your email address.";
  else if (!emailRe.test(email) || email.length > 200) errors.email = "Enter an email address like name@company.com.";
  if ((input.company ?? "").length > 160) errors.company = "Keep the company name under 160 characters.";
  if (!topics.includes((input.topic ?? "") as (typeof topics)[number])) errors.topic = "Choose what your message is about.";
  if (message.length < 20) errors.message = "Add a little more detail, at least 20 characters.";
  else if (message.length > 4000) errors.message = "Keep your message under 4,000 characters.";
  return errors;
}
