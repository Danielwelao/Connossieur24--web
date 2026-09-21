import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return NextResponse.json({ error: 'Email is already subscribed' }, { status: 400 });
    }

    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
        source: source || 'footer',
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!', 
      subscriber: newSubscriber 
    }, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}