<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
    <main class="max-w-lg mx-auto my-20">
        <LoginForm />
        <Toaster />
    </main>
</template>
