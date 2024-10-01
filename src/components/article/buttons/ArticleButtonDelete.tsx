export default function ArticleButtonDelete({ onClick }: { onClick: () => void }) {
    return (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onClick}>
            <i className="ion-trash-a"></i> Delete Article
        </button>
    );
}
