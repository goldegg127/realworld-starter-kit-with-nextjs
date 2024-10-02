'use client';

import { useHandleDeleteArticle } from './hooks';
import { Button } from '@/components/common';

export default function ArticleButtons({ slug }: { slug: string }) {
    const { handleDeleteArticle } = useHandleDeleteArticle(slug);

    return (
        <div className="buttons">
            {/**
            * @todo 로그인 기능 구현 후 적용 예정
            <Button type="button" styleClass={{ size: 'sm', outline: true, color: 'secondary' }}>
                <i className="ion-plus-round"></i>
                &nbsp; Follow Eric Simons <span className="counter">(10)</span>
            </Button>
            <Button type="button" styleClass={{ size: 'sm', outline: true, color: 'primary' }}>
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">(29)</span>
            </Button>
            */}
            <Button link={`/editor?slug=${slug}`} styleClass={{ size: 'sm', outline: true, color: 'secondary' }}>
                <i className="ion-edit"></i> Edit Article
            </Button>
            <Button
                type="button"
                styleClass={{ size: 'sm', outline: true, color: 'danger' }}
                onClick={handleDeleteArticle}>
                <i className="ion-trash-a"></i> Delete Article
            </Button>
        </div>
    );
}
