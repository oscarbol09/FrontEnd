<template>
  <div class="main-container">
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input 
        type="text" 
        placeholder="Buscar contenido..." 
        v-model="searchQuery" 
        @input="filterContent" 
      />
    </div>

    <!-- Tarjetas de contenido -->
    <div class="contenedor-tarjetas">
      <div 
        v-for="(content, index) in filteredContents" 
        :key="index" 
        class="content-card"
      >
        <img :src="content.image" alt="content image" />
        <h3>{{ content.title }}</h3>
        <p>{{ content.description }}</p>
        <button @click="viewContent(content.id)">Ver Contenido</button>
      </div>
    </div>

    <!-- Botón para agregar contenido -->
    <button @click="addContent" class="btn-agregar">+</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app'; 

// Variables reactivas
const searchQuery = ref('');
const contents = ref([]);
const filteredContents = ref(contents);

// Función para cargar los contenidos
const loadContents = async () => {
  const { data, error } = await useFetch('/content');
  if (error.value) {
    console.error('Error al cargar los contenidos:', error.value);
    return;
  }
  contents.value = data.value;
  filteredContents.value = data.value; // Al inicio, muestra todos los contenidos
};

// Filtrar contenido en base a la barra de búsqueda
const filterContent = () => {
  filteredContents.value = contents.value.filter(content => 
    content.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

// Redirigir a la página de agregar contenido
const addContent = () => {
  const router = useRouter();
  router.push('/add-content');
};

// Cargar los contenidos al montar el componente
onMounted(loadContents);
</script>

<style scoped>
.main-container {
  padding: 2rem;
}

.search-bar {
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contenedor-tarjetas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.content-card {
  border: 1px solid #ddd;
  padding: 1rem;
  width: 200px;
  text-align: center;
  border-radius: 8px;
}

.content-card img {
  max-width: 100%;
  border-radius: 8px;
}

.btn-agregar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
}
</style>
