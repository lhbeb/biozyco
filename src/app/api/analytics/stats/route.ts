import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rwevvpdpguhincowygzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZXZ2cGRwZ3VoaW5jb3d5Z3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDg1MTQsImV4cCI6MjA3ODEyNDUxNH0.W-2ECC9vNHaOC0lP8BntGUM4StaseOl-nAwtmCKsxl0';

const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usernames = searchParams.get('usernames');

    if (!usernames) {
      return NextResponse.json(
        { error: 'Usernames parameter is required' },
        { status: 400 }
      );
    }

    const usernameList = usernames.split(',').map((u) => u.trim()).filter(Boolean);

    if (usernameList.length === 0) {
      return NextResponse.json({ stats: {} });
    }

    // Initialize stats to zero for all users
    const stats: { [username: string]: number } = {};
    usernameList.forEach((u) => { stats[u] = 0; });

    // Single DB call for all usernames using .in() — fetches only the username column
    // This replaces the old sequential for-loop (N roundtrips → 1 roundtrip)
    const { data, error } = await supabase
      .from('page_views')
      .select('username')
      .in('username', usernameList);

    if (error) {
      console.error('Error fetching view stats:', error);
      return NextResponse.json({ stats });
    }

    // Aggregate counts in JS — fast since we only fetch the username column
    data?.forEach((row) => {
      if (stats[row.username] !== undefined) {
        stats[row.username]++;
      }
    });

    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error('Error in analytics stats endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
