import Link from 'next/link';
import Image from 'next/image';

export default function ArticleActions({
    profileLink,
    image,
    username,
    date,
}: {
    profileLink: string;
    image: string;
    username: string;
    date: string;
}) {
    return (
        <div className="article-actions">
            <div className="article-meta">
                <Link href={profileLink}>
                    <Image src={image} alt="" width={32} height={32} />
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
                  <button className="btn btn-sm btn-outline-secondary">
                      <i className="ion-edit"></i> Edit Article
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                      <i className="ion-trash-a"></i> Delete Article
                  </button> 
                */}
            </div>
        </div>
    );
}
