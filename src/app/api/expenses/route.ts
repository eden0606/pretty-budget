import { DATABASE_URL } from '@/lib/constants';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');
    const { date, purchase, store, category, want_or_need, amount, card, notes } =
      await request.json();

    if (!amount || !purchase || !store || !want_or_need || !category || !card) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    let result;

    if (date) {
      result = await sql`
        INSERT INTO expenses (date, purchase, store, category, want_or_need, amount, card, notes)
        VALUES (${date}, ${purchase}, ${store}, ${category}, ${want_or_need}, ${amount}, ${card}, ${notes})
        RETURNING *
      `;
    } else {
      result = await sql`
        INSERT INTO expenses (purchase, store, category, want_or_need, amount, card, notes)
        VALUES (${purchase}, ${store}, ${category}, ${want_or_need}, ${amount}, ${card}, ${notes})
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
    const sql = neon(DATABASE_URL || '');
    const data = await sql`SELECT * FROM expenses ORDER BY date DESC`;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');
    const { id, purchase, store, category, want_or_need, amount, card, notes } =
      await request.json();

    if (!amount || !purchase || !store || !want_or_need || !category || !card || !id) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    const result = await sql`
    UPDATE expenses
    SET purchase = ${purchase}, store = ${store}, category = ${category}, want_or_need = ${want_or_need}, amount = ${amount}, card = ${card}, notes = ${notes}
    WHERE id = ${id}
    RETURNING *
  `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json({ error: `Failed to update expense, ${error}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    const result = await sql`DELETE FROM expenses WHERE id = ${id}`;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json({ error: `Failed to delete expense, ${error}` }, { status: 500 });
  }
}
