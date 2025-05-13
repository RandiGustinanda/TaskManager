<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->foreignUuid('project_id')->constrained()->onDelete('cascade'); // Ganti menjadi foreignUuid
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignUuid('assigned_to')->nullable()->constrained('users'); // Ganti menjadi foreignUuid
            $table->string('attachment')->nullable(); // path file PDF
            $table->softDeletes(); // Soft delete
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
