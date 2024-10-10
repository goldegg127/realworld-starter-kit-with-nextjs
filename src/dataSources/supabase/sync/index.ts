import { END_POINT } from '@/config';

import { syncArticlesWithSupabase } from './syncArticles';
import { syncCommentsWithSupabase } from './syncComments';
import { syncArticleDetailsWithSupabase } from './syncArticleDetails';
import { syncProfilesWithSupabase } from './syncProfiles';
import { syncTagListWithSupabase } from './syncTags';

export {
    syncArticlesWithSupabase,
    syncCommentsWithSupabase,
    syncArticleDetailsWithSupabase,
    syncProfilesWithSupabase,
    syncTagListWithSupabase,
};
