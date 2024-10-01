import Link from 'next/link';

export default function ArticleButtonEdit({ slug }: { slug: string }) {
    return (
        <Link className="btn btn-sm btn-outline-secondary" href={`/editor?slug=${slug}`}>
            <i className="ion-edit"></i> Edit Article
        </Link>
    );
}
