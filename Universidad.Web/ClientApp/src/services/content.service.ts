import type { Content, ContentType } from '@models/content';

export const getContent = async (): Promise<Content[]> => {
    const response = await fetch('/api/content');
    const data = await response.json();
    return data?.contents ?? [];
};

export const createContent = async (
    title: string,
    body: string,
    userId: number,
    groupId: number,
    type: ContentType,
    imageUrl?: string,
): Promise<Content> => {
    const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, imageUrl, userId, groupId, type }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();
    return data.content;
};

export const updateContent = async (
    id: number,
    title: string,
    body: string,
    type: ContentType,
    imageUrl?: string,
): Promise<void> => {
    const response = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, imageUrl, type }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const deleteContent = async (id: number): Promise<void> => {
    const response = await fetch(`/api/content/${id}`, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};
