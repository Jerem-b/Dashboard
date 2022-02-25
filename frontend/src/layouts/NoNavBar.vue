<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.container {
  min-height: 100%;
  min-width: 100%;
  display: flex;
  background-color: #323232;
}
</style>
