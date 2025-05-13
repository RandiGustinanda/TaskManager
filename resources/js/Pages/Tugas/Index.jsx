import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import axios from 'axios';

export default function TaskIndex() {
    const { tasks } = usePage().props;
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (e, taskId) => {
        const file = e.target.files[0];

        if (!file) return;
        if (file.type !== 'application/pdf') {
            setError("Hanya file PDF yang diperbolehkan.");
            return;
        }
        if (file.size < 102400 || file.size > 512000) {
            setError("Ukuran file harus antara 100KB dan 500KB.");
            return;
        }

        const formData = new FormData();
        formData.append('attachment', file);

        setUploading(true);
        setError(null);

        try {
            await axios.post(`/tasks/${taskId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            window.location.reload(); // Refresh data setelah upload
        } catch (err) {
            setError("Gagal upload. Periksa kembali file kamu.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-2xl font-bold mb-4">Tugas Saya</h1>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                {tasks.data.length > 0 ? (
                    <div className="space-y-4">
                        {tasks.data.map((task) => (
                            <div key={task.id} className="p-4 bg-white shadow rounded-md border">
                                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                                <p className="text-gray-600 mt-1">{task.description}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Ditugaskan ke: {task.member?.name || 'Tidak diketahui'}
                                </p>

                                <div className="mt-3">
                                    <label className="block text-sm font-medium mb-1">Upload file (PDF, 100-500KB):</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => handleUpload(e, task.id)}
                                        disabled={uploading}
                                    />
                                    {task.attachment && (
                                        <p className="text-sm text-green-600 mt-2">
                                            Sudah diunggah: <a href={`/storage/${task.attachment}`} target="_blank" className="underline">Lihat File</a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Tidak ada tugas yang ditugaskan ke Anda.</p>
                )}
            </div>
        </DashboardLayout>
    );
}
