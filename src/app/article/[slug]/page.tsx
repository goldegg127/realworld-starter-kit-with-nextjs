import { syncDetailsWithSupabase, fetchDetailsFromSupabase } from '@/api/supabase';
import { Article } from '@/types';
import { formatDate } from '@/utils/format';
import { navigator } from '@/utils/navigation';
import { ArticleBanner, ArticleContent, ArticleActions, CommentsList, CommentEditor } from '@/components/article';

export default async function ArticleDetailsPage({ params }: { params: { slug: string } }) {
    await syncDetailsWithSupabase(params.slug);

    const { article } = await fetchDetailsFromSupabase(params.slug);
    const { slug, title, description, body, tagList, createdAt, author }: Article = article;
    const { username, image } = author;
    const profileLink = navigator.profile(username);
    const date = formatDate(createdAt);

    return (
        <div className="article-page">
            <ArticleBanner
                slug={slug}
                title={title}
                profileLink={profileLink}
                image={image}
                username={username}
                date={date}
            />
            <div className="container page">
                <ArticleContent title={title} description={description} body={body} tagList={tagList} />
                <hr />
                <ArticleActions slug={slug} profileLink={profileLink} image={image} username={username} date={date} />
                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <CommentEditor slug={slug} />
                        <CommentsList slug={slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}
