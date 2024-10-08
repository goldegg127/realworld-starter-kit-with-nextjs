import { postComment } from '@/app/api/realworld';

function uesHandlePostComment({
    slug,
    commentBody,
    token,
}: {
    slug: string;
    commentBody: string;
    token: string | null;
}) {
    const handlePostComment = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await postComment({ slug, commentBody, token });
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return { handlePostComment };
}

export { uesHandlePostComment };
