export default [
  {
    path: '/login',
    component: () => import('./layouts/MainLayout.vue'),
    children: [
      {
        name: 'Login Page',
        path: '',
        component: () => import('./pages/LoginPage.vue')
      }
    ]
  },
  {
  path: '/register',
  component: () => import('./layouts/MainLayout.vue'),
  children: [
    {
      name: 'Register Page',
      path: '',
      component: () => import('./pages/RegisterPage.vue')
    }
  ]
  },
  {
    path: '/forgot-password',
    component: () => import('./layouts/MainLayout.vue'),
    children: [{
      name: 'Forgot Password',
      path: '',
      component: () => import('./pages/ForgotPassword.vue')
    }]
  },
  {
    path: '/lock',
    component: () => import('./layouts/MainLayout.vue'),
    children: [{
      name: 'Lock Screen',
      path: '',
      component: () => import('./pages/LockScreen.vue')
    }]
  }
]
