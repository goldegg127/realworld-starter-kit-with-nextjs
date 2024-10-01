'use client';

import { useHandleDeleteArticle } from '../hooks/useHandleDeleteArticle';
import ArticleButtonDelete from './ArticleButtonDelete';
import ArticleButtonEdit from './ArticleButtonEdit';

export default function ArticleButtons({ slug }: { slug: string }) {
    const { handleDeleteArticle } = useHandleDeleteArticle(slug);

    return (
        <div className="buttons">
            {/**
             * @todo 로그인 기능 구현 후 적용 예정
                 <button className="btn btn-sm btn-outline-secondary"> 
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow Eric Simons <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Post <span className="counter">(29)</span>
                </button>
            */}
            <ArticleButtonEdit slug={slug} />
            <ArticleButtonDelete onClick={handleDeleteArticle} />
        </div>
    );
}
