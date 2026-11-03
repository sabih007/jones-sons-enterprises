import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Sends contact messages through Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * Without them the endpoint validates input and returns 503 so the form never claims
 * a message was delivered when it wasn't.
 */
export async function POST(req: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The request could not be read. Refresh the page and try again." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Jones & Sons Website <onboarding@resend.dev>";
  if (!key || !to) {
    return NextResponse.json(
      { error: "Online messages aren't connected yet. Your message was not sent." },
      { status: 503 },
    );
  }

  const { name, email, company, topic, message } = body as ContactInput;
  const text = [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "-"}`, `Topic: ${topic}`, "", message].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Website inquiry: ${topic}`, text }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("Contact delivery failed", err);
    return NextResponse.json({ error: "Your message could not be sent. Try again in a few minutes." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
