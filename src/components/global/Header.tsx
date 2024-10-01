'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { navigator } from '@/util/navigation';

export default function Header() {
    const [isReady, setIsReady] = useState(false); // 서버-클라이언트 렌더 차이 방지

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
                    <h1>conduit</h1>
                </Link>
                <Nav />
            </div>
        </nav>
    );
}

function Nav() {
    const { userInfo, isLoggedIn, logout } = useAuthStore();
    const username = userInfo?.username || '';

    return (
        <nav>
            <ul className="nav navbar-nav pull-xs-right">
                {!isLoggedIn ? (
                    <>
                        <NavItem navName="Sign in" path={navigator.login} />
                        <NavItem navName="Sign up" path={navigator.register} />
                    </>
                ) : (
                    <>
                        <NavItem navName="New Article" path={navigator.editor}>
                            <i className="ion-compose"></i>
                        </NavItem>
                        <NavItem navName="Settings" path={navigator.settings}>
                            <i className="ion-gear-a"></i>
                        </NavItem>
                        <NavItem navName={username} path={navigator.profile(username)}>
                            <Image
                                src={`${userInfo?.image}`}
                                alt={`${userInfo?.username} profile photo`}
                                className="user-pic"
                                width={26}
                                height={26}
                            />
                        </NavItem>
                        <NavItem navName="Logout" path="/" onClick={logout}>
                            <i className="ion-log-out"></i>
                        </NavItem>
                    </>
                )}
            </ul>
        </nav>
    );
}

function NavItem({
    navName,
    path,
    children,
    onClick,
}: {
    navName: string;
    path: string;
    children?: React.ReactNode;
    onClick?: () => void;
}) {
    const pathname = usePathname();
    const styleActive = (navName: string, path: string) => {
        if (navName === 'Logout') {
            return '';
        }

        return pathname === path ? ' active' : '';
    };

    return (
        <li className="nav-item">
            <Link className={`nav-link${styleActive(navName, path)}`} href={path} onClick={onClick}>
                {children} {navName}
            </Link>
        </li>
    );
}
