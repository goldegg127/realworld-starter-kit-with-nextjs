'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { navigator } from '@/util/navigation';

export default function HeaderActions() {
    const { userInfo, isLoggedIn, logout } = useAuthStore();
    const username = userInfo?.username || '';

    return (
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
