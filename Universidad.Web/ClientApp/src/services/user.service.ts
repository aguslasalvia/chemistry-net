import type { User } from "@components/ui/UserList/UserList";

export const createUser = async (user: User): Promise<boolean> => {
  const response = await fetch("/api/user/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: "defaultpassword", // In a real application, you would handle passwords securely
    }),
  });

  if (!response.ok) {
    return false;
  }

  return true;
};

export const getUsers = async (): Promise<any> => {
  const response = await fetch("/api/user/users");
  const data = await response.json();
  return data?.users;
};
