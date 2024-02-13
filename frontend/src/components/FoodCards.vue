<!-- src/components/Card.vue -->
<template>
    <div class="card" style="width: 18rem;">
      <img :src="imageSrc" class="card-img-top" :alt="altText" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <a :href="link" class="btn btn-primary">{{ buttonText }}</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: String,
      altText: String,
      title: String,
      description: String,
      link: String,
      buttonText: String,
    },
  }
  </script>
  
 <style scoped>

 </style>
  