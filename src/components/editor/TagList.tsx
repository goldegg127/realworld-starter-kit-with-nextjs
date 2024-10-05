'use client';

import React, { Dispatch, SetStateAction } from 'react';

export default function TagList({
    readOnly,
    tagList,
    setTagList,
}: {
    readOnly: boolean;
    tagList: string[];
    setTagList: Dispatch<SetStateAction<string[]>>;
}) {
    const deleteTag = (clickedTag: string) => {
        const newTags = tagList.filter(tag => tag !== clickedTag);
        setTagList(newTags);
    };

    return (
        <div className="tag-list">
            {tagList.length !== 0 &&
                tagList.map((tag, index) => (
                    <span key={`${index}-${tag}`} className="tag-default tag-pill">
                        {!readOnly && (
                            <button type="button" aria-label={`remove tag ${tag}`} onClick={() => deleteTag(tag)}>
                                <i className="ion-close-round"></i>
                            </button>
                        )}
                        {tag}
                    </span>
                ))}
        </div>
    );
}
