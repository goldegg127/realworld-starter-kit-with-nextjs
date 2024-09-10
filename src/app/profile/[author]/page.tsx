// MVP 범위 밖

import Link from 'next/link';
import Image from 'next/image';
import { syncProfilesWithSupabase, fetchProfilesFromSupabase } from '@/api/supabase';
import { Profile } from '@/type';

export default async function UserProfile({ params }: { params: { author: string } }) {
    await syncProfilesWithSupabase(params.author);

    const { profile } = await fetchProfilesFromSupabase(params.author);
    const { username, bio, image, following }: Profile = profile;

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <Image src={image} alt="" className="user-img" width={32} height={32} />
                            <h4>{username}</h4>
                            <p>{bio}</p>
                            {/**
                             * @todo 로그인 기능 구현 후 적용 예정
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

            {/** @todo 하드코딩 데이터 페치 적용 예정 **/}
            {/* <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <Link className="nav-link active" href="">
                                        My Articles
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="">
                                        Favorited Articles
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <Link href="/profile/eric-simons">
                                    <Image src="http://i.imgur.com/Qr71crq.jpg" alt="" width={32} height={32} />
                                </Link>
                                <div className="info">
                                    <Link href="/profile/eric-simons" className="author">
                                        Eric Simons
                                    </Link>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 29
                                </button>
                            </div>
                            <Link href="/article/how-to-buil-webapps-that-scale" className="preview-link">
                                <h1>How to build webapps that scale</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    <li className="tag-default tag-pill tag-outline">realworld</li>
                                    <li className="tag-default tag-pill tag-outline">implementations</li>
                                </ul>
                            </Link>
                        </div>

                        <div className="article-preview">
                            <div className="article-meta">
                                <Link href="/profile/albert-pai">
                                    <Image src="http://i.imgur.com/N4VcUeJ.jpg" alt="" width={32} height={32} />
                                </Link>
                                <div className="info">
                                    <Link href="/profile/albert-pai" className="author">
                                        Albert Pai
                                    </Link>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 32
                                </button>
                            </div>
                            <Link href="/article/the-song-you" className="preview-link">
                                <h1>The song you won&apos;t ever stop singing. No matter how hard you try.</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    <li className="tag-default tag-pill tag-outline">Music</li>
                                    <li className="tag-default tag-pill tag-outline">Song</li>
                                </ul>
                            </Link>
                        </div>

                        <ul className="pagination">
                            <li className="page-item active">
                                <Link className="page-link" href="">
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" href="">
                                    2
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
