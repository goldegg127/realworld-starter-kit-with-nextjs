import Link from 'next/link';
import Image from 'next/image';
import { ArticleButtons } from '@/components/article/buttons';

export default function ArticleActions({
    slug,
    profileLink,
    image,
    username,
    date,
}: {
    slug: string;
    profileLink: string;
    image: string;
    username: string;
    date: string;
}) {
    return (
        <div className="article-actions">
            <div className="article-meta">
                <Link href={profileLink}>
                    <Image src={image} alt={`${username} profile image`} width={32} height={32} />
                </Link>
                <div className="info">
                    <Link href="" className="author">
                        {username}
                    </Link>
                    <span className="date">{date}</span>
                </div>
                <ArticleButtons slug={slug} />
            </div>
        </div>
    );
}
