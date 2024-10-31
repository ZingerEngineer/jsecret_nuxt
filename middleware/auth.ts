export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
  
  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
  
  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})