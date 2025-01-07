<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('File_name');
            $table->string('Path');
            $table->string('Quantity');

            //*Start with the foreign key
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('id_folder');
            $table->foreign('id_folder')->references('id')->on('folders')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
