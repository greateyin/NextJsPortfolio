import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, senderEmail, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'dennis.yin@gmail.com',
      subject: `${name} From Contact Form`,
      html: `<p>Sender email: ${senderEmail}</p><p>${message}</p>`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}