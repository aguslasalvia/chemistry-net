export interface Page {
    id: number;
    title: string;
    slug: string;
    body: string;
    imageUrl?: string;
    creationDate: string;
    updatedDate: string;
    userId: number;
    userName: string;
    groupId: number;
    groupName: string;
}
