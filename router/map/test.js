export default [
    {
        path: "/block",
        component: () => import('@components/block/index.vue'),
        children:[
            {
                path: 'index',
                component: () => import('@components/scroll')
            }
        ]
    }
]
