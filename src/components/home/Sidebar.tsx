import Link from 'next/link';
import { syncTagListWithSupabase, fetchTagListFromSupabase } from '@/api/supabase';

export default async function Sidebar() {
    await syncTagListWithSupabase();

    const { tags } = await fetchTagListFromSupabase();

    return (
        <article className="sidebar">
            <p>Popular Tags</p>
            <ul className="tag-list">
                {!tags || tags.length === 0 ? (
                    <p>⚠️ No tags available</p>
                ) : (
                    tags.map((tag, index) => (
                        <li key={`tag-${tag}-${index}`}>
                            <Link href={`?tag=${tag}`} className="tag-pill tag-default">
                                {tag}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </article>
    );
}
