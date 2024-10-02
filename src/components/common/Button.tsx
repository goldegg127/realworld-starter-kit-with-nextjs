import Link from 'next/link';

export default function Button({
    children,
    type,
    style: { size, outline, color, pull, action },
    onClick,
    link,
}: ButtonProps) {
    const clasName = `btn btn-${size}${outline ? ` btn-outline-${color}` : ` btn-${color}`}${pull ? ` ${pull}` : ''}${
        action ? ' action-btn' : ''
    }`;

    return link ? (
        <Link href={link} onClick={onClick} className={clasName}>
            {children}
        </Link>
    ) : (
        <button type={type} onClick={onClick} className={clasName}>
            {children}
        </button>
    );
}

type ButtonProps = {
    children: React.ReactNode;
    type?: 'submit' | 'reset' | 'button' | undefined;
    style: {
        size: 'xs' | 'sm' | 'lg';
        outline: boolean;
        color: 'primary' | 'secondary' | 'danger';
        pull?: 'pull-xs-right';
        action?: boolean;
    };
    onClick?: () => void;
    link?: string;
};
