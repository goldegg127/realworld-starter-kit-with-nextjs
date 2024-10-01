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

                {/**
                  * @todo 로그인 기능 구현 후 적용 예정
                  <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow Eric Simons
                  </button>
                  <button className="btn btn-sm btn-outline-primary">
                      <i className="ion-heart"></i>
                      &nbsp; Favorite Article <span className="counter">(29)</span>
                  </button>
                */}
                <ArticleButtons slug={slug} />
            </div>
        </div>
    );
}
