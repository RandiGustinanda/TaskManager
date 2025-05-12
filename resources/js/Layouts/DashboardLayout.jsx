import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    ClipboardList, 
    Users, 
    Shield, 
    UserCog, 
    LogOut 
} from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-xl border-r border-gray-100 p-6">
                <div className="flex items-center mb-10">
                    <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Project Pro</h2>
                        <p className="text-xs text-gray-500">Management Dashboard</p>
                    </div>
                </div>
                <nav className="space-y-2">
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
                    <Link 
                        href="/tasks" 
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
                    <Link 
                        href="/teams" 
                        className="flex items-center px-4 py-3 rounded-lg transition 
                        hover:bg-blue-50 hover:text-blue-600 
                        text-gray-700 group"
                    >
                        <Users 
                            className="mr-3 text-gray-400 group-hover:text-blue-500" 
                            size={20} 
                        />
                        Teams
                    </Link>
                    <Link 
                        href="/roles" 
                        className="flex items-center px-4 py-3 rounded-lg transition 
                        hover:bg-blue-50 hover:text-blue-600 
                        text-gray-700 group"
                    >
                        <Shield 
                            className="mr-3 text-gray-400 group-hover:text-blue-500" 
                            size={20} 
                        />
                        Role Management
                    </Link>
                    <Link 
                        href="/users" 
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
                </nav>

                {/* Bottom Logout */}
                <div className="absolute bottom-6 left-0 right-0 px-6">
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
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            Welcome, <strong className="text-blue-600">{auth?.user?.name}</strong>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                                {auth?.user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </header>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}