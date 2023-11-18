export default [
  {
    path: '/admin',
    component: () => import('./layouts/MainLayout.vue'),
    children: [{
      name: 'AdminDashboard',
      path: '',
      component: () => import('./pages/IndexPage.vue'),
      meta: { requireLogin: true }
    }, {
      name: 'formPost',
      path: 'form-post/:id?',
      component: () => import('./pages/FormPost.vue'),
      meta: { requireLogin: true }
    }]
  }
]
