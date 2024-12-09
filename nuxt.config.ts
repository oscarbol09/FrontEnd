export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],  // Elimina '@nuxt/http'
  
  // Configuración del runtime para la base URL
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000', // Usa la URL base
    },
  },
});
