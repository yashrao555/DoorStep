<template>
    <div :style="containerStyle" @click="openEditModal">
      <div class="content" :style="computedTextStyle">{{ content }}</div>
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
        console.log('textStyle prop:', this.textStyle);
        return {
          ...this.textStyle,
          fontSize: this.textStyle.fontSize ? `${this.textStyle.fontSize}px` : '32px',
          textAlign: this.textStyle.textAlign || 'left',
          fontFamily: this.textStyle.fontFamily || 'inherit',
          fontWeight: this.textStyle.fontWeight || 'normal',
          textDecoration: this.textStyle.textDecoration || 'none',
          lineHeight: this.textStyle.lineHeight || 'normal',
        };
      },
    },
    methods: {
      openEditModal() {
        this.$emit('open-modal-text', {
          content: this.content,
          containerStyle: this.containerStyle,
          textStyle: this.textStyle,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .content{
    content: wrap;
  }
  </style>
  