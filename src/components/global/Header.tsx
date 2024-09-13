'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { formatProfileLink } from '@/util/format';

export default function Header() {
    const { userInfo, isLoggedIn, logout } = useAuthStore();
    const [isReady, setIsReady] = useState(false); // 서버-클라이언트 렌더 차이 방지
    const pathname = usePathname();
    const styleActive = (path: string) => (pathname === path ? ' active' : '');
    const username = userInfo?.username || '';
    const myProfilePath = formatProfileLink(username);

    useEffect(() => {
        setIsReady(true); // 렌더링 준비 완료
    }, []);

    if (!isReady) {
        return null; // 초기 렌더링 시 서버와 클라이언트의 차이를 피하기 위해 null 반환
    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    conduit
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className={`nav-link${styleActive('/login')}`} href="/login">
                                    Sign in
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link${styleActive('/register')}`} href="/register">
                                    Sign up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className={`nav-link${styleActive('/editor')}`} href="/editor">
                                    <i className="ion-compose"></i> New Article
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link${styleActive('/settings')}`} href="/settings">
                                    <i className="ion-gear-a"></i> Settings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link${styleActive(myProfilePath)}`} href={myProfilePath}>
                                    <img src={userInfo?.image} className="user-pic" />
                                    {username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logout} href="/">
                                    <i className="ion-log-out"></i> Logout
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
