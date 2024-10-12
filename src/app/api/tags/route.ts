import { NextResponse } from 'next/server';
import { syncTagListWithSupabase, fetchTagListFromSupabase } from '@/dataSources/supabase';

export async function GET(req: Request) {
    try {
        const tagListData = await fetchTagListFromSupabase();

        if (tagListData) {
            if (process.env.NODE_ENV !== 'production') console.log('TagList completed successfully!');

            return NextResponse.json(tagListData);
        } else {
            await syncTagListWithSupabase();

            const updateTagListData = await fetchTagListFromSupabase();

            return NextResponse.json(updateTagListData);
        }
    } catch (error) {
        console.error('Final Error: ', error);

        return new NextResponse('Failed to fetch tagList', { status: 500 });
    }
}
