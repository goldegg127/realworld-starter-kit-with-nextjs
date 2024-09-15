import { EditorForm } from '@/components/editor';

export default function EditorPage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    const slug = searchParams?.slug ?? '';
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <EditorForm slug={slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}
