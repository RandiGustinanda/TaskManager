import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, usePage } from "@inertiajs/react";

export default function TaskIndex({ project, tasks }) {
    return (
        <DashboardLayout>
            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {project.name}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Project Tasks Management
                        </p>
                    </div>
                    <Link
                        href={`/projects/${project.id}/tasks/create`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                    >
                        + New Task
                    </Link>
                </div>

                {tasks.data.length === 0  ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 mb-4">
                            No tasks found for this project.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tasks.data.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {task.title}
                                        </h3>
                                        <p className="text-gray-500 mt-1 text-sm">
                                            {task.description}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            task.status === "completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">
                                            Due Date
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {task.deadline || "No due date"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">
                                            Assigned To
                                        </p>
                                        <div className="flex items-center mt-1">
                                            {task.member ? (
                                                <>
                                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                                        <span className="text-xs text-gray-600">
                                                            {task.member.name.charAt(
                                                                0
                                                            )}
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-900 font-medium">
                                                        {task.member.name}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-gray-500 italic">
                                                    Unassigned
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-8 flex justify-center space-x-2">
                {tasks.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded-md text-sm ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        } ${!link.url && "opacity-50 pointer-events-none"}`}
                    />
                ))}
            </div>
        </DashboardLayout>
    );
}
