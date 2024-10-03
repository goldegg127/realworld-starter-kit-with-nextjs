import Link from 'next/link';
import { ButtonProps } from './type';

export default function Button({
    children,
    type,
    styleClass: { size, outline, color, pull, action },
    onClick,
    link,
}: ButtonProps) {
    const className = `btn btn-${size}${outline ? ` btn-outline-${color}` : ` btn-${color}`}${pull ? ` ${pull}` : ''}${
        action ? ' action-btn' : ''
    }`;

    return link ? (
        <Link href={link} onClick={onClick} className={className}>
            {children}
        </Link>
    ) : (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
}
