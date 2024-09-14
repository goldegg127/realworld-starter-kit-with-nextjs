export default function TagList({ articleTags }: { articleTags: string[] }) {
    return (
        <div className="tag-list">
            {articleTags.map(
                (tag, index) =>
                    tag && (
                        <span key={`${index}-${tag}`} className="tag-default tag-pill">
                            <i className="ion-close-round"></i> {tag}
                        </span>
                    ),
            )}
        </div>
    );
}
