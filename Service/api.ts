import { $axios } from '@nuxtjs/axios';

export const api = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return await $axios.post('/upload', formData);
  },

  async getContent() {
    return await $axios.get('/content');
  },

  async addContent(data: any) {
    return await $axios.post('/content', data);
  },
};
