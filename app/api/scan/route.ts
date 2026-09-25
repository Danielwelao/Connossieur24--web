import { NextResponse } from 'next/server';

// Forces Next.js to treat this as a dynamic endpoint, not a static cached page
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HIBP_API_KEY;
    
    // DEV MODE: Deterministic simulation
    if (!apiKey) {
      console.log('⚠️ Running in Dev Mode: Simulating OSINT scan for', email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      // Calculate a consistent number based on the characters in the email
      const charSum = email.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      
      // If the sum is even, they are breached. If odd, they are safe. 
      // This guarantees the exact same email always gets the exact same result.
      const isExposed = charSum % 2 === 0;
      
      if (!isExposed) {
        return NextResponse.json({
          email,
          status: 'safe',
          breachCount: 0,
        });
      }

      // If exposed, generate consistent breach data based on that same charSum
      return NextResponse.json({
        email,
        status: 'exposed',
        breachCount: (charSum % 4) + 2, // Always returns a consistent number between 2 and 5
        breaches: [
          { name: "Apollo Data Scraping", domain: "apollo.io" },
          { name: "LinkedIn Scrape", domain: "linkedin.com" },
          { name: "Canva Breach", domain: "canva.com" }
        ].slice(0, (charSum % 3) + 1), // Always returns a consistent list of domains
        message: 'Dev mode simulation'
      });
    }

    // PRODUCTION MODE: Actual HIBP API Call
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
      method: 'GET',
      headers: {
        'hibp-api-key': apiKey,
        'user-agent': 'Connossieur24-Security-Scanner', 
      },
    });

    if (response.status === 404) {
      return NextResponse.json({
        email,
        status: 'safe',
        breachCount: 0,
      });
    }

    if (response.status === 200) {
      const data = await response.json();
      return NextResponse.json({
        email,
        status: 'exposed',
        breachCount: data.length,
        // Map and return the top 3 most recent/relevant breaches
        breaches: data.slice(0, 3).map((b: any) => ({ 
          name: b.Name, 
          domain: b.Domain 
        })) 
      });
    }

    // Handle Rate Limiting
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