export type ContentType = 'News' | 'Events' | 'Academic' | 'Default';

export interface Content {
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
    creationDate: string;
    userId: number;
    userName: string;
    groupId: number;
    groupName: string;
    type: ContentType;
}
