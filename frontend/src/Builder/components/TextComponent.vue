<template>
    <div :style="containerStyle" @click="openEditModal">
      <div :style="computedTextStyle">{{ content }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        required: true,
      },
      containerStyle: {
        type: Object,
        default: () => ({}),
      },
      textStyle: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      computedTextStyle() {
        return {
          ...this.textStyle,
          fontSize: this.textStyle.fontSize ? `${this.textStyle.fontSize}px` : undefined,
          textAlign: this.textStyle.textAlign || 'left',
        };
      },
    },
    methods: {
      openEditModal() {
        this.$emit('open-modal', {
          content: this.content,
          containerStyle: this.containerStyle,
          textStyle: this.textStyle,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles required */
  </style>
  