'use client';

import Link from 'next/link';
import { LoginForm } from '@/components/user';

export default function LoginPage() {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link href="/register">Need an account?</Link>
                        </p>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
