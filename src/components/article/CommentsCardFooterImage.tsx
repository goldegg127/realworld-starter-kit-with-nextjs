'use client';

import Image from 'next/image';

export default function CardFooterImage({ username, image }: { username?: string; image?: string }) {
    const initImage = '/images/demo-avatar.png';

    return (
        <Image
            src={image || initImage}
            alt={`${username ? `${username} profile image` : ''}`}
            className="comment-author-img"
            width={32}
            height={32}
            onError={event => (event.currentTarget.src = initImage)}
        />
    );
}
