<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast';
import { apiAuth } from '@/lib/useAuth';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const { toast } = useToast()

interface FormRegister {
    name: string
    email: string
    password: string
}

const form: FormRegister = reactive({
    name: '',
    email: '',
    password: ''
})

const handleSubmit = () => {
    apiAuth().post('/api/register', {
        name: form.name,
        email: form.email,
        password: form.password
    }).then(res => {
        console.log(res.data);
        toast({
            title: 'Successfully registered'
        })
        router.push('/')
    }).catch(err => {
        if (err.response.status == 422) {
            toast({
                title: err.response.data.message,
                variant: 'destructive'
            })
            return
        }
        console.log(err.response);
    })
}

const handleRouteToLogin = () => router.push('/')

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
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Register to AR GYM</CardDescription>
            </CardHeader>
            <CardContent>
                <Input v-model="form.name" placeholder="Name" class="mb-5" />
                <Input v-model="form.email" type="email" placeholder="Email" class="mb-5" />
                <Input @keyup.enter="handleSubmit" v-model="form.password" type="password" placeholder="Password"
                    class="mb-5" />
                <div class="flex justify-end mb-2">
                    <a href="javascript:;" @click="handleRouteToLogin"
                        class="text-sm text-gray-700 hover:text-blue-500">Already have account? Login here</a>
                </div>
                <Button @click="handleSubmit">Register</Button>
            </CardContent>
        </Card>
    </main>
</template>