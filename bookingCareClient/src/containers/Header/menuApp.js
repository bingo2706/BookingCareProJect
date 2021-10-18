export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.header',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            }

        ]
    },
    {
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    {
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    }, {
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
];