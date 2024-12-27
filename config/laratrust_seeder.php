<?php

return [
    'create_users' => false,

    'truncate_tables' => true,

    'roles_structure' => [
        'superadministrator' => [
            'users' => 'c,r,u,d,a,s,p',
            'files' => 'c,r,u,d,a,s,p',
            'folders' => 'c,r,u,d,a,s,p',
            'roles' => 'c,r,u,d,a,s,p',
            'permissions' => 'c,r,u,d,a,s,p',
            'settings' => 'c,r,u,d,',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
        's' => 'show',
        'a' => 'upload',
        'p' => 'share'
    ],
];
