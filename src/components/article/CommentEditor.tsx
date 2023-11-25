import Image from 'next/image';

export default function CommentEditor() {
    return (
        <form className="card comment-form">
            <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
            </div>
            <div className="card-footer">
                <Image src="http://i.imgur.com/Qr71crq.jpg" alt="" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
            </div>
        </form>
    );
}
