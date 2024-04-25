<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
import { onMounted } from 'vue';
import { apiAuth } from '@/lib/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
    apiAuth().get('/api/up').then(res => {
        if (res.data.status) {
            router.push('/dashboard')
        }
    })
})
</script>

<template>
    <main class="max-w-lg mx-auto my-20">
        <LoginForm />
    </main>
</template>
