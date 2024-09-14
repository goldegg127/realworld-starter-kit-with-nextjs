import type { Metadata } from 'next';
import Head from 'next/head';
import { Header, Footer } from '@/components/global';
import './globals.css';

export const metadata: Metadata = {
    title: 'Conduit',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
                    rel="stylesheet"
                    type="text/css"
                />
                <link rel="stylesheet" href="//demo.productionready.io/main.css" />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
