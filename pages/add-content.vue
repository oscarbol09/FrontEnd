<template>
  <div class="add-content-form">
    <h1>Agregar Contenido</h1>
    <form @submit.prevent="addContent">
      <!-- Título -->
      <div class="form-group">
        <label for="title">Título:</label>
        <input v-model="content.title" id="title" type="text" required />
      </div>

      <!-- Descripción -->
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea v-model="content.description" id="description" required></textarea>
      </div>

      <!-- Selección de archivo -->
      <div class="form-group">
        <label for="file">Archivo:</label>
        <input type="file" @change="onFileChange" id="file" required />
        <div v-if="filePreview">
          <p>Vista previa:</p>
          <img v-if="fileType === 'image'" :src="filePreview" alt="Vista previa" class="file-preview" />
          <p v-if="fileType === 'pdf'">Vista previa PDF cargado</p>
        </div>
      </div>

      <!-- Tipo de contenido -->
      <div class="form-group">
        <label for="contentType">Tipo de Contenido:</label>
        <select v-model="content.contentType" id="contentType" required>
          <option value="image">Imagen</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
        </select>
      </div>

      <!-- Botones -->
      <div class="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button" @click="cancel">Cancelar</button>
        <button type="button" @click="previewContent">Vista Previa</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const content = ref({
  title: '',
  description: '',
  contentType: 'image',
});

const filePreview = ref(null);
const fileType = ref(''); 

// Usamos useRouter dentro del setup()
const router = useRouter();

let selectedFile = null;

// Función para manejar el cambio de archivo
const onFileChange = (e) => {
  selectedFile = e.target.files[0];  // Seleccionamos el archivo
  if (selectedFile) {
    // Verificar tipo de archivo y asignar vista previa
    const fileReader = new FileReader();
    fileReader.onload = () => {
      filePreview.value = fileReader.result;
      fileType.value = selectedFile.type.includes('image') ? 'image' : selectedFile.type.includes('pdf') ? 'pdf' : 'other';
    };
    fileReader.readAsDataURL(selectedFile);
  }
};

// Función para agregar el contenido
const addContent = async () => {
  const formData = new FormData();
  formData.append('file', selectedFile);  // Agregamos el archivo al FormData

  try {
    // Enviar el archivo a /upload
    const uploadResponse = await $fetch('http://localhost:4000/content/upload', {
      method: 'POST',
      body: formData,
    });

    const fileUrl = uploadResponse.url;  // La URL devuelta por el backend

    // Ahora enviamos los datos del contenido junto con la URL del archivo
    const contentData = {
      title: content.value.title,
      description: content.value.description,
      contentType: content.value.contentType,
      fileUrl: fileUrl,  // Agregamos la URL del archivo
    };

    // Enviar los datos del contenido a la base de datos
    const response = await $fetch('http://localhost:4000/content', {
      method: 'POST',
      body: contentData,
    });

    // Si todo salió bien, redirigir a la página principal
    router.push('/');  
  } catch (error) {
    console.error('Error al agregar contenido:', error);
  }
};

// Función para cancelar la acción
const cancel = () => {
  router.push('/');
};

// Función para vista previa (opcional)
const previewContent = () => {
  console.log('Vista previa del contenido');
};
</script>

<style scoped>
/* Tus estilos aquí */
</style>
