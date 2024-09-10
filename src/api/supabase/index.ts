import { syncArticlesWithSupabase, fetchArticlesFromSupabase } from './syncArticles';
import { syncCommentsWithSupabase, fetchCommentsFromSupabase } from './syncComments';
import { syncDetailsWithSupabase, fetchDetailsFromSupabase } from './syncDetails';
import { syncProfilesWithSupabase, fetchProfilesFromSupabase } from './syncProfiles';
import { syncTagListWithSupabase, fetchTagListFromSupabase } from './syncTags';

export {
    // Articles
    syncArticlesWithSupabase,
    fetchArticlesFromSupabase,
    // Comments
    syncCommentsWithSupabase,
    fetchCommentsFromSupabase,
    // Details
    syncDetailsWithSupabase,
    fetchDetailsFromSupabase,
    // Profiles
    syncProfilesWithSupabase,
    fetchProfilesFromSupabase,
    // Tags
    syncTagListWithSupabase,
    fetchTagListFromSupabase,
};
