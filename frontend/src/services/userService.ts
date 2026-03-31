const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5187/api';

export async function fetchAllUsers(token: string) {

    const cleanToken = token.replace(/^"|"$/g, '');

    const res = await fetch(`${API_BASE}/Users`, {
        headers: {
            'Authorization': `Bearer ${cleanToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export async function toggleUserLock(id: string, token: string) {
    const cleanToken = token.replace(/^"|"$/g, '');
    const res = await fetch(`${API_BASE}/Users/toggle-lock/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${cleanToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    if (!res.ok) throw new Error('Failed to toggle lock status');
    return res.json();
}