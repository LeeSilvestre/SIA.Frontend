<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_family_infos', function (Blueprint $table) {
            $table->id('family_id');
            $table->string('student_id', 11);

            // Define foreign key constraint
            $table->foreign('student_id')->references('student_id')->on('student_profilings')->onDelete('cascade');

            $table->string('father_name')->nullable(false);
            $table->string('father_occupation')->nullable(false);
            $table->string('father_mobileno')->nullable(false);
            $table->string('mother_name')->nullable(true);
            $table->string('mother_occupation')->nullable(true);
            $table->string('mother_mobileno')->nullable(true);
            $table->string('guardian_name')->nullable(true);
            $table->string('guardian_occupation')->nullable(true);
            $table->string('guardian_mobileno')->nullable(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_family_info');
    }
};
