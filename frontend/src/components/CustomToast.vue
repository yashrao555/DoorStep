<template>
    <div class="notifications">
      <div v-if="type" class="toast" :class="type">
        <i :class="icon"></i>
        <div class="content">
          <div class="title">{{ title }}</div>
          <span>{{ text }}</span>
        </div>
        <i class="fa-solid fa-xmark" @click="removeToast"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      type: String,
      icon: String,
      title: String,
      text: String
    },
    methods: {
      removeToast() {
        this.$emit('remove-toast');
      },
    },
    mounted() {
      if (this.type) {
        setTimeout(() => {
          this.$emit('remove-toast');
        }, 5000);
      }
    },
  };
  </script>
  
  <style scoped>
    
  .notifications {
  position: fixed;
  top: 30px;
  right: 20px;
}

.toast {
  position: relative;
  padding: 10px;
  color: #fff;
  margin-bottom: 10px;
  width: 400px;
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  border-radius: 5px;
  --color: #0abf30;
  background-image: linear-gradient(to right, #0abf3055, #22242f 30%);
  animation: show 0.3s ease 1 forwards;
}

.toast i {
  color: var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
}

.toast .title {
  font-size: x-large;
  font-weight: bold;
}

.toast span,
.toast i:nth-child(3) {
  color: #fff;
  opacity: 0.6;
}

@keyframes show {
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-5%);
  }
  80% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-10%);
  }
}

.toast::before {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--color);
  width: 100%;
  height: 3px;
  content: '';
  box-shadow: 0 0 10px var(--color);
  animation: timeOut 5s linear 1 forwards;
}

@keyframes timeOut {
  to {
    width: 0;
  }
}

.toast.error {
  --color: #f24d4c;
  background-image: linear-gradient(to right, #f24d4c55, #22242f 30%);
}

.toast.warning {
  --color: #e9bd0c;
  background-image: linear-gradient(to right, #e9bd0c55, #22242f 30%);
}

.toast.info {
  --color: #3498db;
  background-image: linear-gradient(to right, #3498db55, #22242f 30%);
}
  </style>
  