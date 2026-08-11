import type { Page } from '@models/page';

export const getPages = async (): Promise<Page[]> => {
    const response = await fetch('/api/page');
    const data = await response.json();
    return data?.pages ?? [];
};

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
    const response = await fetch(`/api/page/by-slug/${encodeURIComponent(slug)}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.page;
};

export const createPage = async (
    title: string,
    slug: string,
    body: string,
    userId: number,
    groupId: number,
    imageUrl?: string,
): Promise<Page> => {
    const response = await fetch('/api/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, body, imageUrl, userId, groupId }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();
    return data.page;
};

export const updatePage = async (
    id: number,
    title: string,
    slug: string,
    body: string,
    imageUrl?: string,
): Promise<void> => {
    const response = await fetch(`/api/page/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, body, imageUrl }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const deletePage = async (id: number): Promise<void> => {
    const response = await fetch(`/api/page/${id}`, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};
