<?php

return [
    'create_users' => false,

    'truncate_tables' => true,

    'roles_structure' => [
        'super' => [
            'users' => 'c,r,u,d',
            'payments' => 'c,r,u,d',
            'profile' => 'r,u',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        's' => 'show',
        't' => 'dowloand',
        'p' => 'upload',
    ],
];
