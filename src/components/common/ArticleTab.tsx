import Link from 'next/link';

function TabNav({ children, navStyle }: { children: React.ReactNode; navStyle: 'articles-toggle' | 'feed-toggle' }) {
    return (
        <nav className={navStyle}>
            <ul className="nav nav-pills outline-active">{children}</ul>
        </nav>
    );
}

function TabMenu({ children, isActive, link }: { children: React.ReactNode; isActive: boolean; link: string }) {
    return (
        <li className="nav-item">
            <Link className={`nav-link${isActive ? ' active' : ''}`} href={link}>
                {children}
            </Link>
        </li>
    );
}

export { TabNav, TabMenu };
