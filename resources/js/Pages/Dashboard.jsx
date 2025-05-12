import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { 
    ClipboardList, 
    Users, 
    CheckCircle 
} from 'lucide-react';

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-50 text-blue-500 p-3 rounded-lg">
                            <ClipboardList size={24} />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-blue-500 transition">
                            Total Tasks
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800">12</h2>
                        <div className="text-green-500 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            10%
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-50 text-green-500 p-3 rounded-lg">
                            <Users size={24} />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-green-500 transition">
                            Team Members
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800">5</h2>
                        <div className="text-blue-500 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            2%
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-50 text-purple-500 p-3 rounded-lg">
                            <CheckCircle size={24} />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-purple-500 transition">
                            Completed Projects
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800">3</h2>
                        <div className="text-green-500 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            15%
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Overview Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Tasks</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h4 className="font-medium text-gray-700">Design Dashboard</h4>
                                <p className="text-xs text-gray-400">In Progress</p>
                            </div>
                            <span className="text-blue-500 text-sm">70%</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h4 className="font-medium text-gray-700">Backend API</h4>
                                <p className="text-xs text-gray-400">Pending</p>
                            </div>
                            <span className="text-yellow-500 text-sm">40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-medium text-gray-700">User Authentication</h4>
                                <p className="text-xs text-gray-400">Completed</p>
                            </div>
                            <span className="text-green-500 text-sm">100%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Performance</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">JD</span>
                                </div>
                                <span className="text-gray-700">John Doe</span>
                            </div>
                            <span className="text-green-500 text-sm">95%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-semibold">JS</span>
                                </div>
                                <span className="text-gray-700">Jane Smith</span>
                            </div>
                            <span className="text-blue-500 text-sm">88%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold">MJ</span>
                                </div>
                                <span className="text-gray-700">Mike Johnson</span>
                            </div>
                            <span className="text-yellow-500 text-sm">75%</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}