import { NextResponse } from 'next/server';
import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from '@/app/api/supabase';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const tag = searchParams.get('tag') ?? '';
    const params = {
        offset: (page - 1) * 10,
        tag,
    };

    try {
        const articlesData = await fetchArticlesFromSupabase(params);

        if (articlesData) {
            if (process.env.NODE_ENV !== 'production') console.log('Articles completed successfully!');

            return NextResponse.json(articlesData);
        } else {
            await syncArticlesWithSupabase(params);

            const updateArticlesData = await fetchArticlesFromSupabase(params);

            return NextResponse.json(updateArticlesData);
        }
    } catch (error) {
        console.error('Final Error: ', error);

        return new NextResponse('Failed to fetch articles', { status: 500 });
    }
}
