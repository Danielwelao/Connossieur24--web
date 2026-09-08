import { NextResponse } from 'next/server';

// This forces Next.js to treat this as a dynamic endpoint, not a static page
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming request body
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // 2. Validate email format (basic regex to prevent junk data)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    /* 
      3. The OSINT Integration (Have I Been Pwned)
      In production, you will need a HIBP API Key stored in your .env.local file:
      HIBP_API_KEY=your_key_here
    */
    
    const apiKey = process.env.HIBP_API_KEY;
    
    // For development, if there's no API key, we simulate a realistic response
    if (!apiKey) {
      console.log('⚠️ Running in Dev Mode: Simulating OSINT scan for', email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network latency
      
      const isExposed = Math.random() > 0.5; // 50/50 chance for testing
      
      return NextResponse.json({
        email,
        status: isExposed ? 'exposed' : 'safe',
        breachCount: isExposed ? Math.floor(Math.random() * 5) + 1 : 0,
        message: 'Dev mode simulation'
      });
    }

    // PRODUCTION: Actual API Call to HIBP
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
      method: 'GET',
      headers: {
        'hibp-api-key': apiKey,
        'user-agent': 'Connoisseur24-Security-Scanner', // Required by HIBP
      },
    });

    if (response.status === 404) {
      // 404 means the email was NOT found in any breaches (Safe)
      return NextResponse.json({
        email,
        status: 'safe',
        breachCount: 0,
      });
    }

    if (response.status === 200) {
      // 200 means breaches were found
      const data = await response.json();
      return NextResponse.json({
        email,
        status: 'exposed',
        breachCount: data.length,
        breaches: data.slice(0, 3).map((b: any) => ({ name: b.Name, domain: b.Domain })) // Return top 3
      });
    }

    // Handle Rate Limiting (429) or other errors
    if (response.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    throw new Error(`HIBP API returned status: ${response.status}`);

  } catch (error) {
    console.error('Scan API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process security scan.' },
      { status: 500 }
    );
  }
}