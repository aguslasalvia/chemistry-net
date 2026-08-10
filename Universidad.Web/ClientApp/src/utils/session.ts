const KEY = 'fq-user-id';

export const setCurrentUserId = (id: number) => {
    localStorage.setItem(KEY, String(id));
};

export const getCurrentUserId = (): number | null => {
    const raw = localStorage.getItem(KEY);
    return raw ? Number(raw) : null;
};

export const clearCurrentUserId = () => {
    localStorage.removeItem(KEY);
};
