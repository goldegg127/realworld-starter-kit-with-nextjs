import { fetchArticles } from '@/api';
import { Articles } from '@/type/index';
import ArticleFeeds from './ArticleFeeds';

export default async function List() {
    const data = await fetchArticles({});
    const {
        articles,
        articlesCount,
    }: {
        articles: Articles;
        articlesCount: number;
    } = data;

    return (
        <>
            <nav className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    {/** 
                      * @todo 로그인 기능 구현 후 적용
                      <li className="nav-item">
                          <a className="nav-link" href="">Your Feed</a>
                      </li> 
                    */}
                    <li className="nav-item">
                        <a className="nav-link active" href="">
                            Global Feed
                        </a>
                    </li>
                </ul>
            </nav>
            <ArticleFeeds articles={articles} articlesCount={articlesCount} />
        </>
    );
}
