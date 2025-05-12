<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use OwenIt\Auditing\Models\Audit;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name')->get();
        return inertia('admin/usermanagement', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:Administrator,Manager,Member'
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
        ]);

        // Mencatat audit log manual menggunakan model Audit
        Audit::create([
            'event' => 'created',
            'user_id' => auth()->id(),
            'user_type' => User::class, // Menyebutkan tipe model User
            'auditable_id' => $user->id,
            'auditable_type' => User::class,
            'old_values' => null,
            'new_values' => $user->toArray(),
            'url' => url()->current()
        ]);

        return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'role' => 'required|in:Administrator,Manager,Member'
        ]);

        $oldRole = $user->role;
        $user->update([
            'role' => $request->role
        ]);

        // Mencatat audit log manual untuk perubahan role
        Audit::create([
            'event' => 'updated',
            'user_id' => auth()->id(),
            'user_type' => User::class,
            'auditable_id' => $user->id,
            'auditable_type' => User::class,
            'old_values' => ['role' => $oldRole],
            'new_values' => ['role' => $request->role],
            'url' => url()->current()
        ]);

        return inertia('admin/usermanagement', [
            'users' => User::orderBy('name')->get()
        ]);
    }
}
