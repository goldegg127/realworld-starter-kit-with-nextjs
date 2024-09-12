'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Header() {
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false); // 서버-클라이언트 렌더 차이 방지

    const handleLogout = () => {
        Cookies.remove('real-world-token', {
            secure: true,
            sameSite: 'Strict',
        });
        setToken('');
    };

    useEffect(() => {
        const token = Cookies.get('real-world-token');
        setToken(token || null);
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
                    <li className="nav-item">
                        <Link className={`nav-link${pathname === '/' ? ' active' : ''}`} href="/">
                            Home
                        </Link>
                    </li>
                    {!token ? (
                        <>
                            <li className="nav-item">
                                <Link className={`nav-link${pathname === '/login' ? ' active' : ''}`} href="/login">
                                    Sign in
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link${pathname === '/register' ? ' active' : ''}`}
                                    href="/register">
                                    Sign up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className={`nav-link${pathname === '/editor' ? ' active' : ''}`} href="/editor">
                                    <i className="ion-compose"></i> New Article
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link${pathname === '/settings' ? ' active' : ''}`}
                                    href="/settings">
                                    <i className="ion-gear-a"></i> Settings
                                </Link>
                            </li>
                            {/** 
                            * @todo 전역 상태관리 설치 후 적용
                            <li className="nav-item">
                                <Link className="nav-link" href="/profile/eric-simons">
                                    <img src="" className="user-pic" />
                                    Eric Simons
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout} href="/">
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
