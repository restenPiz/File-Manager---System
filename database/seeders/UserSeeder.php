<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        //*Inicio da seeder responsavel pelo registro de dados do utilizador
        $user = User::create([
            'name' => 'Administrador',
            'email' => 'super@gmail.com',
            'password' => Hash::make('admin@123'),
        ]);

        $user->addRole('admin');
    }
}
