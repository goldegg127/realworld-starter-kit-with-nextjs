import Link from 'next/link';

export default function Button({
    children,
    type,
    styleClass: { size, outline, color, pull, action },
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
    styleClass: {
        size?: 'xs' | 'sm' | 'lg';
        outline: boolean;
        color: 'primary' | 'secondary' | 'danger';
        pull?: 'pull-xs-right';
        action?: boolean;
    };
    onClick?: (event: React.MouseEvent) => Promise<void>;
    link?: string;
};
