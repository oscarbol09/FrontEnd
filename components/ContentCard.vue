<template>
  <div class="tarjeta">
    <img :src="content.image || defaultImage" alt="Contenido" />
    <h3>{{ content.title }}</h3>
    <p>{{ content.description || 'Sin descripción disponible' }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultImage: 'path/to/default-image.jpg', // Ruta a una imagen predeterminada
    };
  },
};
</script>

<style scoped>
.tarjeta {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.tarjeta:hover {
  transform: scale(1.05);
}

.tarjeta img {
  max-width: 100%;
  border-radius: 5px;
}

.tarjeta h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.tarjeta p {
  font-size: 0.9rem;
  color: #666;
}
</style>
