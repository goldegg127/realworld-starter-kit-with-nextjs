import { END_POINT } from '@/config';

import { syncArticlesWithSupabase } from './syncArticles';
import { syncCommentsWithSupabase } from './syncComments';
import { syncDetailsWithSupabase } from './syncDetails';
import { syncProfilesWithSupabase } from './syncProfiles';
import { syncTagListWithSupabase } from './syncTags';

async function syncSupabase(type: string, params: any) {
    switch (type) {
        case `${END_POINT.ARTICLES}`:
            if (!params.slug) {
                await syncArticlesWithSupabase(params);
                break;
            } else {
                await syncDetailsWithSupabase(params.slug);
            }

        case `${END_POINT.COMMENTS}`:
            await syncCommentsWithSupabase(params.slug);
            break;

        case `${END_POINT.TAGS}`:
            await syncTagListWithSupabase();
            break;

        case `${END_POINT.PROFILES}`:
            await syncProfilesWithSupabase(params.username);
            break;

        default:
            console.error(`Invalid sync type: ${type}`);
    }
}

export {
    syncArticlesWithSupabase,
    syncCommentsWithSupabase,
    syncDetailsWithSupabase,
    syncProfilesWithSupabase,
    syncTagListWithSupabase,
    syncSupabase,
};
