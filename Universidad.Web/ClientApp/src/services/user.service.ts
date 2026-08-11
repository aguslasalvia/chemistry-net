import type { User } from '@models/user';

export const loginUser = async (email: string, password: string): Promise<User> => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'No se pudo iniciar sesión');
    }

    const data = await response.json();
    return data.user;
};

export const logoutUser = async (): Promise<void> => {
    await fetch('/api/user/logout', { method: 'POST' });
};

/** Resolves the logged-in user from the auth cookie, or null if there's no session. */
export const getCurrentUser = async (): Promise<User | null> => {
    const response = await fetch('/api/user/me');
    if (!response.ok) return null;

    const data = await response.json();
    return data.user;
};

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch('/api/user/users');
    const data = await response.json();
    return data?.users ?? [];
};

export const createUser = async (name: string, lastName: string, email: string): Promise<boolean> => {
    const response = await fetch('/api/user/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            lastName,
            email,
            password: 'defaultpassword', // In a real application, you would handle passwords securely
        }),
    });

    return response.ok;
};

export const updateUser = async (
    id: number,
    name: string,
    lastName: string,
    email: string,
): Promise<void> => {
    const response = await fetch(`/api/user/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastName, email }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`/api/user/users/${id}`, { method: 'DELETE' });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const changeUserPassword = async (id: number, newPassword: string): Promise<void> => {
    const response = await fetch(`/api/user/users/${id}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};
