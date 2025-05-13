// resources/js/Pages/Tasks/Create.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const Create = ({ project, members }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        assigned_to: "",
        description: "",
        deadline: "",
    });

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("tasks.store", project.id));
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-100 pb-4">
                        Create New Task for{" "}
                        <span className="text-indigo-600">{project.name}</span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.title
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter task name"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="assigned_to"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Assign To
                                </label>
                                <select
                                    id="assigned_to"
                                    value={data.assigned_to}
                                    onChange={(e) =>
                                        setData("assigned_to", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select Member</option>
                                    {members.map((member) => (
                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="deadline"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Deadline
                                </label>
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    value={data.deadline}
                                    onChange={(e) => {
                                        const formatted =
                                            e.target.value.replace("T", " ") +
                                            ":00";
                                        setData("deadline", formatted);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Task description..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {processing ? "Creating..." : "Create Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Create;
