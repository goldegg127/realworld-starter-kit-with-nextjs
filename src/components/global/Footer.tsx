import Link from 'next/link';
import { navigator } from '@/util/navigation';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <Link href={navigator.main} className="logo-font">
                    conduit
                </Link>
                <span className="attribution">
                    An interactive learning project from{' '}
                    <a href="https://thinkster.io" target="_blank">
                        Thinkster
                    </a>
                    . Code &amp; design licensed under MIT.
                </span>
            </div>
        </footer>
    );
}
