import { NextResponse } from 'next/server';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from '@/dataSources/supabase';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        const articlesData = await fetchCommentsFromSupabase(slug);

        if (articlesData) {
            if (process.env.NODE_ENV !== 'production') console.log('Comments completed successfully!');

            return NextResponse.json(articlesData);
        } else {
            await syncCommentsWithSupabase(slug);

            const updateArticlesData = await fetchCommentsFromSupabase(slug);

            return NextResponse.json(updateArticlesData);
        }
    } catch (error) {
        console.error('Final Error: ', error);

        return new NextResponse('Failed to fetch Comments', { status: 500 });
    }
}
