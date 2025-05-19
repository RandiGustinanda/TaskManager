import React from "react";
import { useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

// Audit Trail Component
const AuditTrail = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm h-full">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h2>
        <p className="text-gray-500 text-center py-8">No recent activities</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-4 border-indigo-500 pl-4 py-1">
            <p className="text-sm text-gray-900">{activity.event}</p>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-xs text-gray-600">
                    {activity.user.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-gray-600">{activity.user.name}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.created_at}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TaskIndex({ project, tasks, activities }) {
  // Function to handle form submission for updating status
  const { put, processing } = useForm();

  const handleStatusChange = (taskId) => {
    put(`/tasks/${taskId}/status`, { status: true });
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Section - Takes 2/3 of the screen on large devices */}
          <div className="lg:col-span-2 space-y-4">
            {tasks.data.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-4">
                  No tasks found for this project.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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
                          task.status === true
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.status ? "Completed" : "Pending"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Due Date</p>
                        <p className="text-gray-900 font-medium">
                          {task.deadline || "No due date"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Assigned To</p>
                        <div className="flex items-center mt-1">
                          {task.member ? (
                            <>
                              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                <span className="text-xs text-gray-600">
                                  {task.member.name.charAt(0)}
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
                      <div>
                        <p className="text-gray-500">Hasil</p>
                        <div className="flex items-center mt-1">
                          {task.attachment && (
                            <p className="text-sm text-green-600 mt-2">
                              Sudah diunggah:{" "}
                              <a
                                href={`/storage/${task.attachment}`}
                                target="_blank"
                                className="underline"
                              >
                                Lihat File
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Button untuk menandai tugas sebagai selesai */}
                    <button
                      onClick={() => handleStatusChange(task.id)}
                      disabled={task.status === true || processing}
                      className={`mt-4 px-6 py-2 text-white font-medium rounded-lg ${
                        task.status === true
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {task.status === true ? "Done" : "Mark as Done"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
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
          </div>

          {/* Audit Trail Section - Takes 1/3 of the screen on large devices */}
          <div className="lg:col-span-1">
            <AuditTrail activities={activities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}