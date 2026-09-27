import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: 'Looks like this email is already subscribed!' }, { status: 400 });
    }

    const finalSource = source || 'newsletter';

    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
        source: finalSource,
      }
    });

    const successMessage = finalSource === 'waitlist'
      ? "You're on the waitlist! We'll email you as soon as we open up access."
      : "Thanks for subscribing! We'll send the latest security tips straight to your inbox.";

    return NextResponse.json({ 
      success: successMessage, 
      subscriber: newSubscriber 
    }, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}