import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function UserManagement() {
    const { users, flash } = usePage().props;

    const { data, setData, post, put, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'Member',
    });

    // State untuk menyimpan role per user
    const [selectedRoles, setSelectedRoles] = useState({});

    // Set initial role per user ketika component mount
    useEffect(() => {
        const initialRoles = Object.fromEntries(users.map(user => [user.id, user.role]));
        setSelectedRoles(initialRoles);
    }, [users]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
        reset(); // Clear form after submit
    };

    const handleRoleChange = (userId, newRole) => {
        // Update UI terlebih dahulu
        setSelectedRoles(prev => ({
            ...prev,
            [userId]: newRole,
        }));

        // Kirim perubahan ke server
        put(route('users.update', userId), { role: newRole });
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">User Management</h1>

                <form onSubmit={handleSubmit} className="mb-6 space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="border p-2 w-full"
                    />
                    <select
                        value={data.role}
                        onChange={e => setData('role', e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="Member">Member</option>
                        <option value="Manager">Manager</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Tambah User
                    </button>
                </form>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Ubah Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2">
                                    <select
                                        value={selectedRoles[user.id] || user.role}
                                        onChange={e => handleRoleChange(user.id, e.target.value)}
                                        className="border p-1"
                                    >
                                        <option value="Member">Member</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Administrator">Administrator</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
