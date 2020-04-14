import loadable from '@loadable/component';

export const routes = [
    {
        path: '/page/home',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "home" */ '../pages/Home'))
    },
    {
        path: '/page/list',
        component: loadable(() => import(/* webpackChunkName: "list" */ '../pages/List'))
    }
];
