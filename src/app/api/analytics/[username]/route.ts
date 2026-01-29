import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rwevvpdpguhincowygzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZXZ2cGRwZ3VoaW5jb3d5Z3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDg1MTQsImV4cCI6MjA3ODEyNDUxNH0.W-2ECC9vNHaOC0lP8BntGUM4StaseOl-nAwtmCKsxl0';

const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    // Get total views count
    const { count: totalViews, error: countError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .eq('username', username);

    if (countError) {
      console.error('Error counting views:', countError);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Get views grouped by country with pagination to handle large datasets
    let countryData: any[] = [];
    let hasMore = true;
    let offset = 0;
    const pageSize = 1000;

    while (hasMore) {
      const { data, error } = await supabase
        .from('page_views')
        .select('country, country_code')
        .eq('username', username)
        .range(offset, offset + pageSize - 1);

      if (error) {
        console.error('Error fetching country data:', error);
        break;
      }

      if (data && data.length > 0) {
        countryData = countryData.concat(data);
        offset += pageSize;
        hasMore = data.length === pageSize;
      } else {
        hasMore = false;
      }
    }

    // Count views by country
    const countryStats: { [key: string]: { country: string; code: string; count: number } } = {};
    countryData.forEach((view) => {
      const key = view.country_code || 'UN';
      if (!countryStats[key]) {
        countryStats[key] = {
          country: view.country || 'Unknown',
          code: view.country_code || 'UN',
          count: 0,
        };
      }
      countryStats[key].count++;
    });

    // Get recent views (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentViews, error: recentError } = await supabase
      .from('page_views')
      .select('*')
      .eq('username', username)
      .gte('viewed_at', thirtyDaysAgo.toISOString())
      .order('viewed_at', { ascending: false })
      .limit(100);

    if (recentError) {
      console.error('Error fetching recent views:', recentError);
    }

    // Get views by date (last 7 days) with pagination
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let dailyViews: any[] = [];
    let hasMoreDaily = true;
    let dailyOffset = 0;

    while (hasMoreDaily) {
      const { data, error } = await supabase
        .from('page_views')
        .select('viewed_at')
        .eq('username', username)
        .gte('viewed_at', sevenDaysAgo.toISOString())
        .range(dailyOffset, dailyOffset + pageSize - 1);

      if (error) {
        console.error('Error fetching daily views:', error);
        break;
      }

      if (data && data.length > 0) {
        dailyViews = dailyViews.concat(data);
        dailyOffset += pageSize;
        hasMoreDaily = data.length === pageSize;
      } else {
        hasMoreDaily = false;
      }
    }

    // Group by date
    const dailyStats: { [key: string]: number } = {};
    dailyViews.forEach((view) => {
      const date = new Date(view.viewed_at).toISOString().split('T')[0];
      dailyStats[date] = (dailyStats[date] || 0) + 1;
    });

    return NextResponse.json({
      username,
      totalViews: totalViews || 0,
      countries: Object.values(countryStats).sort((a, b) => b.count - a.count),
      recentViews: recentViews || [],
      dailyStats,
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

