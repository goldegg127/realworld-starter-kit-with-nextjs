import { NextApiRequest, NextApiResponse } from 'next';
import { fetchArticlesFromSupabase } from '@/api/supabase';
import { supabaseSyncWrapper } from '@/utils/supabaseSyncWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('api/articles');

    if (req.method === 'GET') {
        console.log('api/articles, GET');

        const { page, tag } = req.query;

        const articlesData = await fetchArticlesFromSupabase({
            offset: (parseInt(page as string, 10) - 1) * 10,
            limit: 10,
            tag: tag as string,
        });

        res.status(200).json(articlesData);
    }
}

// 공통 래퍼 함수 적용
export default supabaseSyncWrapper(handler, 'articles');
