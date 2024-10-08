import { NextApiRequest, NextApiResponse } from 'next';
import { syncSupabase } from '@/api/supabase';

export function supabaseSyncWrapper(handler: Function, syncType: string) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            if (req.method === 'GET') {
                // GET 메서드에 대해서만 Supabase 동기화 작업을 수행
                await syncSupabase(syncType, req.query);
            }

            // 원래의 API 핸들러 실행
            return handler(req, res);
        } catch (error) {
            console.error(`Error in wrapper: ${error}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
