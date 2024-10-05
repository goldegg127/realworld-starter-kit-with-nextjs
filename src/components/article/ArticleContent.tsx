import Link from 'next/link';
import { navigator } from '@/utils/navigation';
import { ArticleContentProps } from './type';

export default function ArticleContent({ title, description, body, tagList }: ArticleContentProps) {
    return (
        <section className="row article-content">
            <div className="col-md-12">
                <p>{description}</p>
                <h2 id="introducing-ionic">{title}</h2>
                <p>{body}</p>
                <ul className="tag-list">
                    {tagList.map((tag, index) => (
                        <li key={`tag-${tag}-${index}`}>
                            <Link href={navigator.tag(tag)} className="tag-default tag-pill tag-outline">
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
