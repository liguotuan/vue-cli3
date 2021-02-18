export default [
    {
        path: "/pdf",
        component: () => import('@components/pdf/index.vue'),
        // children:[
        //     {
        //         path: 'index',
        //         component: () => import('@components/scroll')
        //     }
        // ]
    }
]
