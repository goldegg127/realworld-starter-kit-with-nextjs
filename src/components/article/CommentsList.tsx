import { formatDate, formatProfileLink } from "@/util/format";

type Comments = Comment[];
type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

async function fetchComments(slug: string) {
  const res = await fetch(
    `https://api.realworld.io/api/articles/${slug}/comments`
  );

  if (!res.ok) {
    throw new Error("failed to fetch comments");
  }

  return res.json();
}

export default async function CommentsList({ slug }: { slug: string }) {
  const data = await fetchComments(slug);
  const { comments }: { comments: Comments } = data;

  return (
    <ul>
      {comments.map((comment) => {
        const { id, createdAt, updatedAt, body, author } = comment;
        const { username, bio, image, following } = author;
        const profileLink = formatProfileLink(username);
        const date = formatDate(createdAt);

        return (
          <li key={id}>
            <article className="card">
              <div className="card-block">
                <p className="card-text">{body}</p>
              </div>
              <div className="card-footer">
                <a href="/profile/author" className="comment-author">
                  <img src={image} alt="" className="comment-author-img" />
                </a>
                &nbsp;
                <a href={profileLink} className="comment-author">
                  {username}
                </a>
                <span className="date-posted">{date}</span>
                {/* 로그인 기능 구현 후 적용 
                                <span className="mod-options">
                                    <i className="ion-trash-a"></i>
                                </span> 
                                */}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
