'use client';

import { useEffect } from 'react';
import { useArticleStore } from '@/stores/articleStore';

export default function TagList({ readOnly }: { readOnly: boolean }) {
    const { tagList, setTagList } = useArticleStore();

    const deleteTag = (clickedTag: string) => {
        const newTags = tagList.filter(tag => tag !== clickedTag);
        setTagList(newTags);
    };

    useEffect(() => {}, [tagList]);

    return (
        <div className="tag-list">
            {tagList.map(
                (tag, index) =>
                    tag && (
                        <span key={`${index}-${tag}`} className="tag-default tag-pill">
                            {!readOnly && (
                                <button type="button" aria-label={`remove tag ${tag}`} onClick={() => deleteTag(tag)}>
                                    <i className="ion-close-round"></i>
                                </button>
                            )}
                            {tag}
                        </span>
                    ),
            )}
        </div>
    );
}
