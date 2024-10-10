import { NextResponse } from 'next/server';
import { syncArticleDetailsWithSupabase, fetchArticleDetailsFromSupabase } from '@/app/api/supabase';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        const articlesData = await fetchArticleDetailsFromSupabase(slug);

        if (articlesData) {
            if (process.env.NODE_ENV !== 'production') console.log('Article Details completed successfully!');

            return NextResponse.json(articlesData);
        } else {
            await syncArticleDetailsWithSupabase(slug);

            const updateArticlesData = await fetchArticleDetailsFromSupabase(slug);

            return NextResponse.json(updateArticlesData);
        }
    } catch (error) {
        console.error('Final Error: ', error);

        return new NextResponse('Failed to fetch article details', { status: 500 });
    }
}
