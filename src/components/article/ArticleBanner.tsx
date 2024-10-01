import Link from 'next/link';
import Image from 'next/image';
import { ArticleButtons } from '@/components/article/buttons';

export default function ArticleBanner({
    slug,
    title,
    profileLink,
    image,
    username,
    date,
}: {
    slug: string;
    title: string;
    profileLink: string;
    image: string;
    username: string;
    date: string;
}) {
    return (
        <section className="banner">
            <div className="container">
                <h1>{title}</h1>

                <div className="article-meta">
                    <Link href={profileLink}>
                        <Image src={image} alt={`${username} profile image`} width={32} height={32} />
                    </Link>
                    <div className="info">
                        <Link href={profileLink} className="author">
                            {username}
                        </Link>
                        <span className="date">{date}</span>
                    </div>
                    <ArticleButtons slug={slug} />
                </div>
            </div>
        </section>
    );
}
