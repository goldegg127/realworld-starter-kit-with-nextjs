export default function TagList({ tagList }: { tagList: string[] }) {
    return (
        <div className="tag-list">
            {tagList.map(
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
