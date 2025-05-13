import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function UserManagement() {
    const { users, flash, audits } = usePage().props;

    const { data, setData, post, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "Member",
    });

    // State untuk menyimpan role per user
    const [selectedRoles, setSelectedRoles] = useState({});
    
    // State for audit
    const [expandedAudit, setExpandedAudit] = useState(null);
    const [showAuditDetails, setShowAuditDetails] = useState(false);
    const [auditFilter, setAuditFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllAudits, setShowAllAudits] = useState(false);
    
    // Pagination settings
    const auditsPerPage = 5;
    const totalPages = Math.ceil(audits.length / auditsPerPage);
    
    // Calculate audits for display based on pagination
    const indexOfLastAudit = currentPage * auditsPerPage;
    const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
    const paginatedAudits = audits.slice(indexOfFirstAudit, indexOfLastAudit);

    // Set initial role per user ketika component mount
    useEffect(() => {
        const initialRoles = Object.fromEntries(
            users.map((user) => [user.id, user.role])
        );
        setSelectedRoles(initialRoles);
    }, [users]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"));
        reset(); // Clear form after submit
    };

    const handleRoleChange = (userId, newRole) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [userId]: newRole,
        }));

        axios
            .put(route("users.update", userId), { role: newRole })
            .then((response) => {
                Swal.fire({
                    title: "Berhasil!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.reload({ only: ["users"] });
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire(
                    "Oops!",
                    "Terjadi kesalahan saat mengubah role.",
                    "error"
                );
            });
    };
    
    // Format data changes for better display
    const formatAuditChanges = (oldValues, newValues) => {
        if (!oldValues || !newValues) return null;
        
        const changes = [];
        for (const key in newValues) {
            if (oldValues[key] !== newValues[key]) {
                changes.push({
                    field: key,
                    old: oldValues[key],
                    new: newValues[key]
                });
            }
        }
        return changes;
    };
    
    // Find user name by ID for better audit display
    const getUserNameById = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : `User #${userId}`;
    };
    
    // Get event color and icon
    const getEventStyle = (event) => {
        switch(event) {
            case 'created':
                return { 
                    bgColor: 'bg-green-100', 
                    textColor: 'text-green-800',
                    icon: '➕'
                };
            case 'updated':
                return { 
                    bgColor: 'bg-yellow-100', 
                    textColor: 'text-yellow-800',
                    icon: '🔄'
                };
            case 'deleted':
                return { 
                    bgColor: 'bg-red-100', 
                    textColor: 'text-red-800',
                    icon: '❌'
                };
            default:
                return { 
                    bgColor: 'bg-gray-100', 
                    textColor: 'text-gray-800',
                    icon: '📋'
                };
        }
    };

    // Format date in a more compact way
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'short',
            hour: '2-digit', 
            minute: '2-digit'
        });
    };
    
    // Filter audits
    const filteredAudits = auditFilter === "all" 
        ? (showAllAudits ? audits : paginatedAudits) 
        : (showAllAudits 
            ? audits.filter(audit => audit.event === auditFilter)
            : paginatedAudits.filter(audit => audit.event === auditFilter));
            
    // Handle pagination
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    
    return (
        <DashboardLayout>
       
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left Column - User Management */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <h1 className="text-2xl font-bold mb-2 text-gray-800">User Management</h1>

                            {/* User Form */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700">Tambah User Baru</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <select
                                            value={data.role}
                                            onChange={(e) => setData("role", e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Member">Member</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Administrator">Administrator</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out"
                                    >
                                        Tambah User
                                    </button>
                                </form>
                            </div>

                            {/* Users Table */}
                            <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                                <h2 className="text-lg font-semibold mb-4 text-gray-700">Daftar User</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Ubah Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            user.role === "Administrator" 
                                                                ? "bg-red-100 text-red-800" 
                                                                : user.role === "Manager" 
                                                                    ? "bg-blue-100 text-blue-800" 
                                                                    : "bg-green-100 text-green-800"
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <select
                                                            value={selectedRoles[user.id] || user.role}
                                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                            className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            </div>
                        </div>

                        {/* Right Column - Compact Audit Log */}
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {showAllAudits ? "Semua Aktivitas" : "Aktivitas Terbaru"}
                                    </h2>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => setShowAuditDetails(!showAuditDetails)}
                                            className="text-blue-600 text-xs hover:text-blue-800 focus:outline-none"
                                        >
                                            {showAuditDetails ? "Tampilan Ringkas" : "Tampilan Detail"}
                                        </button>
                                        <button 
                                            onClick={() => setShowAllAudits(!showAllAudits)}
                                            className="text-blue-600 text-xs hover:text-blue-800 focus:outline-none"
                                        >
                                            {showAllAudits ? "Tampilkan Terbaru" : "Tampilkan Semua"}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Filters */}
                                <div className="flex space-x-2 mb-3">
                                    <button 
                                        onClick={() => setAuditFilter("all")}
                                        className={`px-2 py-1 text-xs rounded-md ${
                                            auditFilter === "all" 
                                                ? "bg-blue-100 text-blue-800" 
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        Semua
                                    </button>
                                    <button 
                                        onClick={() => setAuditFilter("created")}
                                        className={`px-2 py-1 text-xs rounded-md ${
                                            auditFilter === "created" 
                                                ? "bg-green-100 text-green-800" 
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        Dibuat
                                    </button>
                                    <button 
                                        onClick={() => setAuditFilter("updated")}
                                        className={`px-2 py-1 text-xs rounded-md ${
                                            auditFilter === "updated" 
                                                ? "bg-yellow-100 text-yellow-800" 
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        Diubah
                                    </button>
                                    <button 
                                        onClick={() => setAuditFilter("deleted")}
                                        className={`px-2 py-1 text-xs rounded-md ${
                                            auditFilter === "deleted" 
                                                ? "bg-red-100 text-red-800" 
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                    >
                                        Dihapus
                                    </button>
                                </div>
                                
                                {/* Activity Timeline */}
                                <div className="max-h-96 overflow-y-auto pr-1">
                                    {filteredAudits.length > 0 ? (
                                        <div className="space-y-3">
                                            {filteredAudits.map((audit) => {
                                                const eventStyle = getEventStyle(audit.event);
                                                
                                                return (
                                                    <div key={audit.id} className="relative pl-6 pb-4 border-l border-gray-200 last:border-0 last:pb-0">
                                                        {/* Activity indicator */}
                                                        <div className={`absolute left-5 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full ${eventStyle.bgColor} ${eventStyle.textColor}`}>
                                                            <span className="text-xs">{eventStyle.icon}</span>
                                                        </div>
                                                        
                                                        {/* Activity content */}
                                                        <div className="ml-2">
                                                            <div className="flex items-center text-sm">
                                                                <span className="font-medium text-gray-900">
                                                                    {getUserNameById(audit.auditable_id)}
                                                                </span>
                                                                <span className="mx-1 text-gray-500">•</span>
                                                                <span className={`text-xs font-medium ${eventStyle.textColor}`}>
                                                                    {audit.event === 'created' ? 'dibuat' : 
                                                                    audit.event === 'updated' ? 'diubah' : 
                                                                    audit.event === 'deleted' ? 'dihapus' : audit.event}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex justify-between items-center mt-1">
                                                                <span className="text-xs text-gray-500">
                                                                    {formatDate(audit.created_at)}
                                                                </span>
                                                                
                                                                {showAuditDetails && audit.event === 'updated' && (
                                                                    <button
                                                                        className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none"
                                                                        onClick={() => setExpandedAudit(expandedAudit === audit.id ? null : audit.id)}
                                                                    >
                                                                        {expandedAudit === audit.id ? 'Tutup' : 'Detail'}
                                                                    </button>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Detail changes for expanded audit */}
                                                            {showAuditDetails && expandedAudit === audit.id && audit.event === 'updated' && (
                                                                <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                                                    {formatAuditChanges(audit.old_values, audit.new_values)?.map((change, idx) => (
                                                                        <div key={idx} className="grid grid-cols-3 gap-1 mb-1">
                                                                            <div className="font-medium">{change.field}</div>
                                                                            <div className="text-red-600 line-through overflow-hidden overflow-ellipsis">{change.old || '-'}</div>
                                                                            <div className="text-green-600 overflow-hidden overflow-ellipsis">{change.new || '-'}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-sm text-gray-500">
                                            Tidak ada aktivitas yang ditemukan
                                        </div>
                                    )}
                                </div>
                                
                                {/* Pagination */}
                                {!showAllAudits && totalPages > 1 && (
                                    <div className="flex items-center justify-center space-x-1 mt-4">
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-2 py-1 rounded-md text-xs ${
                                                currentPage === 1
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            &lt;
                                        </button>
                                        
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            // Calculate which page numbers to show
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-md text-xs ${
                                                        currentPage === pageNum
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-2 py-1 rounded-md text-xs ${
                                                currentPage === totalPages
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                                
                                {/* Summary */}
                                <div className="mt-3 text-center text-xs text-gray-500">
                                    {showAllAudits 
                                        ? `Menampilkan ${filteredAudits.length} aktivitas` 
                                        : `Halaman ${currentPage} dari ${totalPages}`
                                    }
                                </div>
                            </div>
                            
                            {/* Quick Stats Card */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-3 text-gray-700">Statistik User</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                                        <div className="text-xl font-bold text-blue-700">
                                            {users.length}
                                        </div>
                                        <div className="text-xs text-blue-600">Total User</div>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg text-center">
                                        <div className="text-xl font-bold text-green-700">
                                            {users.filter(u => u.role === "Member").length}
                                        </div>
                                        <div className="text-xs text-green-600">Member</div>
                                    </div>
                                    <div className="bg-red-50 p-3 rounded-lg text-center">
                                        <div className="text-xl font-bold text-red-700">
                                            {users.filter(u => u.role === "Administrator").length}
                                        </div>
                                        <div className="text-xs text-red-600">Admin</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      
        </DashboardLayout>
    );
}