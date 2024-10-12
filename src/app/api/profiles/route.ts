import { NextResponse } from 'next/server';
import { syncProfilesWithSupabase, fetchProfilesFromSupabase } from '@/dataSources/supabase';

export async function GET(req: Request, params: { author: string }) {
    const { author } = params;

    try {
        const articlesData = await fetchProfilesFromSupabase(author);

        if (articlesData) {
            if (process.env.NODE_ENV !== 'production') console.log('Profiles completed successfully!');

            return NextResponse.json(articlesData);
        } else {
            await syncProfilesWithSupabase(author);

            const updateArticlesData = await fetchProfilesFromSupabase(author);

            return NextResponse.json(updateArticlesData);
        }
    } catch (error) {
        console.error('Final Error: ', error);

        return new NextResponse('Failed to fetch profiles', { status: 500 });
    }
}
