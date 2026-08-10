import type { Group } from '@models/group';

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    groups: Group[];
}
