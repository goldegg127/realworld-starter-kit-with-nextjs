// MVP 범위 밖

type Profile = {
    username: string;
    bio: string;
    image: string;
    following: boolean;
};

async function fetchProfile(username:string) {
    const res = await fetch(`https://api.realworld.io/api/profiles/${username}`);
    
    if(!res.ok) {
        throw new Error("failed to fetch profile");
    }

    return res.json();
}

export default async function Profile({params} : {params : {author:string}}) {
    const data = await fetchProfile(params.author);
    const { username, bio, image, following } : Profile = data.profile;

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={image} alt="" className="user-img" />
                            <h4>{username}</h4>
                            <p>{bio}</p>
                            {/* 로그인 기능 구현 후 적용
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp; Follow Eric Simons
                            </button>
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-gear-a"></i>
                                &nbsp; Edit Profile Settings
                            </button> 
                            */}
                        </div>
                    </div>
                </div>
            </div>

            {/* 하드코딩 데이터 페치 적용 예정 */}
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">My Articles</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="">Favorited Articles</a>
                                </li>
                            </ul>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                                <div className="info">
                                    <a href="/profile/eric-simons" className="author">Eric Simons</a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> 29
                                </button>
                            </div>
                            <a href="/article/how-to-buil-webapps-that-scale" className="preview-link">
                                <h1>How to build webapps that scale</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    <li className="tag-default tag-pill tag-outline">realworld</li>
                                    <li className="tag-default tag-pill tag-outline">implementations</li>
                                </ul>
                            </a>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <a href="/profile/albert-pai"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                                <div className="info">
                                    <a href="/profile/albert-pai" className="author">Albert Pai</a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 32
                                </button>
                            </div>
                            <a href="/article/the-song-you" className="preview-link">
                                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                <li className="tag-default tag-pill tag-outline">Music</li>
                                <li className="tag-default tag-pill tag-outline">Song</li>
                                </ul>
                            </a>
                        </div>

                        <ul className="pagination">
                            <li className="page-item active">
                                <a className="page-link" href="">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="">2</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}