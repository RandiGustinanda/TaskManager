import React from "react";
import { Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index() {
    const { projects, history } = usePage().props;

    return (
        <DashboardLayout>
            <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            Daftar Project
                        </h1>
                        <p className="mt-2 text-gray-500">
                            Kelola semua project Anda di satu tempat
                        </p>
                    </div>
                    <Link
                        href={route("projects.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Tambah Project
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <svg
                            className="mx-auto h-24 w-24 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            Belum ada project
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Mulai dengan membuat project baru
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border rounded-lg hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                {project.name}
                                            </h3>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {project.tasks_count} Task
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={route(
                                                    "projects.edit",
                                                    project.id
                                                )}
                                                className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                            </Link>

                                            <Link
                                                method="delete"
                                                href={route(
                                                    "projects.destroy",
                                                    project.id
                                                )}
                                                as="button"
                                                className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                title="Hapus"
                                                onBefore={() =>
                                                    confirm(
                                                        "Yakin ingin menghapus project ini?"
                                                    )
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </Link>

                                            <Link
                                                href={route(
                                                    "projects.tasks.index",
                                                    project.id
                                                )}
                                                className="text-gray-600 hover:text-green-600 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                                title="Lihat Task"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {history.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm mt-12 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Riwayat Perubahan
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Project ID
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Event
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {history.map((log) => (
                                        <tr key={log.id}>
                                            <td className="px-4 py-2 text-sm text-gray-900">
                                                {/* Menampilkan nama project */}
                                                {log.auditable
                                                    ? log.auditable.name
                                                    : "Project Deleted"}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-600 capitalize">
                                                {/* Menampilkan event (aksi yang dilakukan) */}
                                                {log.event}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                                {/* Menampilkan nama user */}
                                                {log.user?.name || "System"}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                {/* Menampilkan waktu perubahan */}
                                                {new Date(
                                                    log.created_at
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
