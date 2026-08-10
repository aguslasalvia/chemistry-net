import type { Group, Rol } from '@models/group';

export const getGroups = async (): Promise<Group[]> => {
    const response = await fetch('/api/group');
    const data = await response.json();
    return data?.groups ?? [];
};

export const createGroup = async (name: string, description: string): Promise<Group> => {
    const response = await fetch('/api/group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();
    return data.group;
};

export const updateGroup = async (id: number, name: string, description: string): Promise<void> => {
    const response = await fetch(`/api/group/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const deleteGroup = async (id: number): Promise<void> => {
    const response = await fetch(`/api/group/${id}`, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const addUserToGroup = async (groupId: number, userId: number, role: Rol): Promise<void> => {
    const response = await fetch(`/api/group/${groupId}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const removeUserFromGroup = async (groupId: number, userId: number): Promise<void> => {
    const response = await fetch(`/api/group/${groupId}/users/${userId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};
