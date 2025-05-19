<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusAndOptionsToTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            // Menambahkan field boolean 'status'
            $table->boolean('status')->default(false); 

            // Menambahkan field JSON 'options'
            $table->json('options')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            // Menghapus field 'status' dan 'options' jika rollback migrasi
            $table->dropColumn('status');
            $table->dropColumn('options');
        });
    }
}
