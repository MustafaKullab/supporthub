
<template>

  <Toaster position="top-right" dir="rtl" richColors />

  <Router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </Router-view>

</template>

<script setup>
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
