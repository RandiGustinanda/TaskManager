import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    Shield,
    UserCog,
    LogOut,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-xl border-r border-gray-100 p-6 flex flex-col relative">
                <div className="flex items-center mb-10">
                    <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Project Pro
                        </h2>
                        <p className="text-xs text-gray-500">
                            Management Dashboard
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2 flex-grow">
                    {/* Dashboard Link */}
                    {auth.user.role === "Administrator" ||
                    auth.user.role === "Manager" ||
                    auth.user.role === "Member" ? (
                        <Link
                            href="/dashboard"
                            className="flex items-center px-4 py-3 rounded-lg transition 
                            hover:bg-blue-50 hover:text-blue-600 
                            text-gray-700 group"
                        >
                            <LayoutDashboard
                                className="mr-3 text-gray-400 group-hover:text-blue-500"
                                size={20}
                            />
                            Dashboard
                        </Link>
                    ) : null}

                    {auth.user.role === "Member" ? (
                        <Link
                            href="/tugas"
                            className="flex items-center px-4 py-3 rounded-lg transition 
                            hover:bg-blue-50 hover:text-blue-600 
                            text-gray-700 group"
                        >
                            <LayoutDashboard
                                className="mr-3 text-gray-400 group-hover:text-blue-500"
                                size={20}
                            />
                            Tugas
                        </Link>
                    ) : null}
                    {/* Task Management Link (Only for Administrator and Manager) */}
                    {auth.user.role === "Administrator" ||
                    auth.user.role === "Manager" ? (
                        <Link
                            href="/project"
                            className="flex items-center px-4 py-3 rounded-lg transition 
                            hover:bg-blue-50 hover:text-blue-600 
                            text-gray-700 group"
                        >
                            <ClipboardList
                                className="mr-3 text-gray-400 group-hover:text-blue-500"
                                size={20}
                            />
                            Task Management
                        </Link>
                    ) : null}

                    {/* User Management Link (Only for Administrator) */}
                    {auth.user.role === "Administrator" ? (
                        <Link
                            href="/user-management"
                            className="flex items-center px-4 py-3 rounded-lg transition 
                            hover:bg-blue-50 hover:text-blue-600 
                            text-gray-700 group"
                        >
                            <UserCog
                                className="mr-3 text-gray-400 group-hover:text-blue-500"
                                size={20}
                            />
                            User Management
                        </Link>
                    ) : null}
                </nav>

                {/* Logout Button - Now inside the sidebar's flex container */}
                <div className="mt-auto pt-6">
                    <Link
                        href="/logout"
                        method="post"
                        className="flex items-center justify-center w-full px-4 py-3 
                        bg-red-50 text-red-600 rounded-lg transition 
                        hover:bg-red-100"
                    >
                        <LogOut className="mr-3" size={20} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
