import { NextResponse } from 'next/server';
import { fetchArticlesFromSupabase } from '@/app/api/supabase';

export async function GET(req: Request) {
    console.log('api/articles');

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const tag = searchParams.get('tag') ?? '';

    const articlesData = await fetchArticlesFromSupabase({
        offset: (page - 1) * 10,
        limit: 10,
        tag,
    });

    NextResponse.json(articlesData);
}
