import Link from 'next/link';
import Image from 'next/image';
import { ArticleActionsProps } from './type';
import ArticleButtons from '@/components/article/ArticleButtons';

export default function ArticleActions({ slug, profileLink, image, username, date }: ArticleActionsProps) {
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
