import { NextRequest, NextResponse } from 'next/server';
import { END_POINT } from '@/config';
import {
    syncArticlesWithSupabase,
    syncCommentsWithSupabase,
    syncDetailsWithSupabase,
    syncProfilesWithSupabase,
    syncTagListWithSupabase,
} from '@/api/supabase';

export async function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;

    const ARTICLES_API = `/api/${END_POINT.ARTICLES}`;
    const PROFILES_API = `/api/${END_POINT.PROFILES}`;
    const TAGS_API = `/api/${END_POINT.TAGS}`;

    if (pathname.startsWith(ARTICLES_API) && req.method === 'GET') {
        if (pathname === ARTICLES_API) {
            const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
            const tag = searchParams.get('tag') ?? '';

            // 서버에서 Supabase와 동기화
            await syncArticlesWithSupabase({ offset: (currentPage - 1) * 10, tag });
        } else if (pathname.match(/^\/api\/articles\/([^/]+)\/comments$/)) {
            const slugMatch = pathname.match(/^\/api\/articles\/([^/]+)\/comments$/);

            if (slugMatch) {
                const slug = slugMatch[1];
                await syncCommentsWithSupabase(slug);
            }
        } else {
            const slugMatch = pathname.match(/^\/api\/articles\/([^/]+)/);

            if (slugMatch) {
                const slug = slugMatch[1];
                await syncDetailsWithSupabase(slug);
            }
        }
    }

    if (pathname.startsWith(PROFILES_API) && req.method === 'GET') {
        const usernameMatch = pathname.match(/^\/api\/profiles\/([^/]+)/);
        if (usernameMatch) {
            const username = usernameMatch[1];
            await syncProfilesWithSupabase(username);
        }
    }

    if (pathname === TAGS_API && req.method === 'GET') {
        await syncTagListWithSupabase();
    }

    // 요청을 계속 진행
    return NextResponse.next();
}

// 미들웨어가 적용될 경로를 설정
export const config = {
    matcher: [
        `/api/${END_POINT.ARTICLES}`,
        `/api/${END_POINT.ARTICLES}/:slug*`,
        `/api/${END_POINT.PROFILES}/:username*`,
        `/api/${END_POINT.TAGS}`,
    ],
};
