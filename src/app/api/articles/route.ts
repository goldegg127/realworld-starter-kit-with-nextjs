import { NextResponse } from 'next/server';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/app/api/supabase';

export async function GET(req: Request) {
    console.log('api/articles');

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const tag = searchParams.get('tag') ?? '';
    const params = {
        offset: (page - 1) * 10,
        tag,
    };

    await syncArticlesWithSupabase(params);

    try {
        const articlesData = await fetchArticlesFromSupabase(params);

        if (process.env.NODE_ENV !== 'production') {
            console.log('Articles completed successfully!');
        }

        return NextResponse.json(articlesData);
    } catch (error) {
        console.error('Final Error: ', error);
    }
}
