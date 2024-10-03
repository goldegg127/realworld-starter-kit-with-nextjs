import Link from 'next/link';
import { navigator } from '@/util/navigation';
import HeaderActions from '@/components/global/HeaderActions';

export default function Header() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" href={navigator.main}>
                    <h1 className="logo">conduit</h1>
                </Link>
                <HeaderActions />
            </div>
        </nav>
    );
}
