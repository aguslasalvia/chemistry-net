import type { User } from "@components/ui/UserList/UserList";

export const createUser = async (user: User): Promise<User> => {
    const response = await fetch('/api/user/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: 'defaultpassword' // In a real application, you would handle passwords securely
        })
    });

    if (!response.ok) {
        throw new Error('Error creating user');
    }

    return response.json();
};


export const getUsers = async (): Promise<User[]> => {
    const response = await fetch('/api/user/users');
    if (!response.ok) {
        return [];
    }
    return response.json();
}