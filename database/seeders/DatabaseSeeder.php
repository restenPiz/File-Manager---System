<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(LaratrustSeeder::class);

        $user = \App\Models\User::create([
            'name' => 'Administrador',
            'email' => 'super@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin@123'),
        ]);

        $user->addRole('super');
    }
}
