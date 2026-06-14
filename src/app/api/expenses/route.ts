import { DATABASE_URL } from '@/lib/constants';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');
    const { date, purchase, store, category, want_or_need, amount, card, notes, flag } =
      await request.json();

    if (
      amount === undefined ||
      amount === null ||
      amount < 0 ||
      !purchase ||
      !store ||
      !want_or_need ||
      !category ||
      !card
    ) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    let result;

    if (date) {
      result = await sql`
        INSERT INTO expenses (date, purchase, store, category, want_or_need, amount, card, notes, flag)
        VALUES (${date}, ${purchase}, ${store}, ${category}, ${want_or_need}, ${amount}, ${card}, ${notes}, ${flag})
        RETURNING *
      `;
    } else {
      result = await sql`
        INSERT INTO expenses (purchase, store, category, want_or_need, amount, card, notes, flag)
        VALUES (${purchase}, ${store}, ${category}, ${want_or_need}, ${amount}, ${card}, ${notes}, ${flag})
        RETURNING *
      `;
    }

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting expense:', error);
    return NextResponse.json({ error: 'Failed to insert expense' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const params = searchParams.get('params') || '';
    const order = searchParams.get('order') || 'DESC';
    const filter = searchParams.get('filter') || 'none';
    const day = searchParams.get('day') || '';
    const month = searchParams.get('month') || '';
    const year = searchParams.get('year') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';

    const match = `${year}-${month.toString().padStart(2, '0')}`;
    const fullDateMatch = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    let data;
    switch (query) {
      case 'sum_total_amount':
        data = await sql`
          SELECT category, ROUND(CAST(SUM(amount) AS NUMERIC), 2) as total
          FROM expenses
          WHERE CAST(date AS TEXT) LIKE ${'%' + match + '%'} 
          GROUP BY category
          UNION ALL
          SELECT 'yearly_spend' as category, ROUND(CAST(SUM(amount) AS NUMERIC), 2) as total
          FROM expenses
          WHERE CAST(date AS TEXT) LIKE ${'%' + year + '%'} 
          UNION ALL
          SELECT 'monthly_spend' as category, ROUND(CAST(SUM(amount) AS NUMERIC), 2) as total
          FROM expenses
          WHERE CAST(date AS TEXT) LIKE ${'%' + match + '%'} 
          UNION ALL
          SELECT 'daily_spend' as category, SUM(amount) as total
          FROM expenses WHERE CAST(date AS TEXT) LIKE ${'%' + fullDateMatch + '%'} 
          UNION ALL
          SELECT 'bilt_spend' as category, SUM(amount) AS total
          FROM expenses
          WHERE card = 'wells fargo - bilt - 4376'
          AND date BETWEEN ${startDate} AND ${endDate}
          AND purchase not like '%rent%'
          `;
        break;
      case 'predictive_search':
        const store = params.split(';')?.[0];

        data =
          await sql`SELECT purchase, category, want_or_need FROM expenses WHERE store = ${store} limit 1`;

        if (!data?.[0]) {
          data =
            await sql`SELECT purchase, category, want_or_need FROM expenses WHERE store like '%${store}%' limit 1`;
        }
        data = data?.[0];

        break;
      default:
        if (order === 'ASC') {
          data = await sql`SELECT * FROM expenses ORDER BY date ASC, id DESC`;
        } else if (order === 'DESC') {
          data = await sql`SELECT * FROM expenses ORDER BY date DESC, id DESC`;
        }
        break;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sql = neon(DATABASE_URL || '');
    const { id, purchase, store, category, want_or_need, amount, card, notes, flag } =
      await request.json();

    if (
      amount === undefined ||
      amount === null ||
      amount < 0 ||
      !purchase ||
      !store ||
      !want_or_need ||
      !category ||
      !card ||
      !id
    ) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 });
    }

    const result = await sql`
    UPDATE expenses
    SET purchase = ${purchase}, store = ${store}, category = ${category}, want_or_need = ${want_or_need}, amount = ${amount}, card = ${card}, notes = ${notes}, flag = ${flag}
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
