'use client';

import Link from 'next/link';
import { navigator } from '@/util/navigation';
import { SigninForm } from '@/components/sign';

export default function SigninPage() {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link href={navigator.signup}>Need an account?</Link>
                        </p>
                        <SigninForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
