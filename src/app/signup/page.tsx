import Link from 'next/link';
import { navigator } from '@/utils/navigation';
import { SignupForm } from '@/components/sign';

export default function SignupPage() {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link href={navigator.signin}>Have an account?</Link>
                        </p>
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
