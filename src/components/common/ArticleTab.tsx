import Link from 'next/link';
import { TabNavProps, TabMenuProps } from './type';

function TabNav({ children, navStyle }: TabNavProps) {
    return (
        <nav className={navStyle}>
            <ul className="nav nav-pills outline-active">{children}</ul>
        </nav>
    );
}

function TabMenu({ children, isActive, link }: TabMenuProps) {
    return (
        <li className="nav-item">
            <Link className={`nav-link${isActive ? ' active' : ''}`} href={link}>
                {children}
            </Link>
        </li>
    );
}

export { TabNav, TabMenu };
