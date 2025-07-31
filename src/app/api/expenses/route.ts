import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL || '');
    const { date, purchase, store, category, wantOrNeed, amount, card } = await request.json();

    if (!amount || !purchase || !store || !wantOrNeed || !category || !card) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    let result;

    if (date) {
      result = await sql`
        INSERT INTO expenses (date, purchase, store, category, want_or_need, amount, card)
        VALUES (${date}, ${purchase}, ${store}, ${category}, ${wantOrNeed}, ${amount}, ${card})
        RETURNING *
      `;
    } else {
      result = await sql`
        INSERT INTO expenses (purchase, store, category, want_or_need, amount, card)
        VALUES (${purchase}, ${store}, ${category}, ${wantOrNeed}, ${amount} ${card})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting expense:', error);
    return NextResponse.json({ error: 'Failed to insert expense' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || '');
    const data = await sql`SELECT * FROM expenses ORDER BY date DESC`;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}
