import {
    fetchArticlesFromSupabase,
    fetchCommentsFromSupabase,
    fetchDetailsFromSupabase,
    fetchProfilesFromSupabase,
    fetchTagListFromSupabase,
} from './fetch';
import {
    syncArticlesWithSupabase,
    syncCommentsWithSupabase,
    syncDetailsWithSupabase,
    syncProfilesWithSupabase,
    syncTagListWithSupabase,
} from './sync';

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
