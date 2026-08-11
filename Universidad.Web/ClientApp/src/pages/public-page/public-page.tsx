import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FileQuestion } from 'lucide-react';
import ImageSlot from '@components/ui/image-slot/image-slot';
import { getPageBySlug } from '@services/page.service';
import type { Page } from '@models/page';

type Status = 'loading' | 'found' | 'not-found';

interface Resolved {
    slug: string;
    status: Status;
    page: Page | null;
}

const PublicPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [resolved, setResolved] = useState<Resolved | null>(null);

    useEffect(() => {
        if (!slug) return;
        let active = true;

        getPageBySlug(slug)
            .then((result) => {
                if (active) setResolved({ slug, status: result ? 'found' : 'not-found', page: result });
            })
            .catch(() => {
                if (active) setResolved({ slug, status: 'not-found', page: null });
            });

        return () => {
            active = false;
        };
    }, [slug]);

    const status: Status = resolved !== null && resolved.slug === slug ? resolved.status : 'loading';
    const page = resolved !== null && resolved.slug === slug ? resolved.page : null;

    if (status === 'loading') return null;

    if (status === 'not-found' || !page) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
                <FileQuestion className="text-fq-muted" size={40} />
                <h1 className="font-display text-2xl font-bold text-fq-text">Página no encontrada</h1>
                <p className="max-w-sm text-fq-muted">
                    Todavía no hay contenido publicado en <span className="font-semibold">/{slug}</span>.
                </p>
                <a
                    href="/"
                    className="rounded-fq bg-fq-primary px-6 py-3 font-display text-sm font-bold text-fq-text transition-colors hover:bg-fq-primary-hover"
                >
                    Volver al inicio
                </a>
            </div>
        );
    }

    return (
        <article className="px-[clamp(20px,5vw,64px)] py-section">
            <div className="mx-auto max-w-[760px]">
                {page.imageUrl !== undefined && (
                    <ImageSlot
                        alt={page.title}
                        src={page.imageUrl}
                        className="mb-8 aspect-[16/9] w-full rounded-fq-lg"
                    />
                )}
                <h1 className="mb-6 text-h2-lg font-bold">{page.title}</h1>
                <p className="text-[16.5px] leading-[1.75] whitespace-pre-line text-fq-body">{page.body}</p>
            </div>
        </article>
    );
};

export default PublicPage;
