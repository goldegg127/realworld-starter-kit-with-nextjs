'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { navigator } from '@/util/navigation';
import { useActiveStyle } from '@/hooks/useActiveStyle';

export default function HeaderActions() {
    const { userInfo, isLoggedIn, logout } = useAuthStore();
    const username = userInfo?.username || '';

    return (
        <ul className="nav navbar-nav pull-xs-right">
            {!isLoggedIn ? (
                <>
                    <NavItem navName="Sign in" path={navigator.signin} />
                    <NavItem navName="Sign up" path={navigator.signup} />
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

type NavItemProps = {
    navName: string;
    path: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

function NavItem({ navName, path, children, onClick }: NavItemProps) {
    const { activeNav } = useActiveStyle();
    const active = activeNav(navName, path);

    return (
        <li className="nav-item">
            <Link className={`nav-link${active}`} href={path} onClick={onClick}>
                {children} {navName}
            </Link>
        </li>
    );
}
