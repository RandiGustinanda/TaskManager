<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('audits', function (Blueprint $table) {
            // Hapus index lama kalau ada
            $table->dropColumn('auditable_id');
            $table->dropColumn('user_id');

            // Tambah ulang dengan tipe UUID
            $table->uuid('auditable_id')->nullable();
            $table->uuid('user_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('audits', function (Blueprint $table) {
            $table->dropColumn('auditable_id');
            $table->dropColumn('user_id');

            $table->unsignedBigInteger('auditable_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
        });
    }
};

