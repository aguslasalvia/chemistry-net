export type Rol = 'MasterAdmin' | 'Admin' | 'Profesor' | 'Student';

export interface GroupUser {
    id: number;
    name: string;
    email: string;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    users?: GroupUser[];
}
