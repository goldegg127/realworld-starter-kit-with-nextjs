export default function TagList({ tagList }: { tagList: string[] }) {
    return (
        <div className="tag-list">
            {tagList.map(
                (tag, index) =>
                    tag && (
                        <span key={`${index}-${tag}`} className="tag-default tag-pill">
                            {/**
                             * @todo 태그 삭제 기능, PUT 메서드는 태그 수정 불가 업데이트 시 삭제기능 제거
                             */}
                            <i className="ion-close-round"></i> {tag}
                        </span>
                    ),
            )}
        </div>
    );
}
