import { NextResponse } from 'next/server';
import { syncArticleDetailsWithSupabase, fetchArticleDetailsFromSupabase } from '@/app/api/supabase';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    await syncArticleDetailsWithSupabase(slug);

    try {
        const articlesData = await fetchArticleDetailsFromSupabase(slug);

        if (process.env.NODE_ENV !== 'production') {
            console.log('Article Details completed successfully!');
        }

        return NextResponse.json(articlesData);
    } catch (error) {
        console.error('Final Error: ', error);
    }
}
