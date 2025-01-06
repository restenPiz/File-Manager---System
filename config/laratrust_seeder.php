<?php

return [
    'create_users' => false,

    'truncate_tables' => true,

    'roles_structure' => [
        'super' => [
            'users' => 'c,r,u,d',
            'folder' => 'c,r,u,d,p,s,t',
            'file' => 'c,r,u,d,p,s,t',
            'settings' => 'c,u,d'
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
