<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import axios from 'axios'
import { reactive } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
const { toast } = useToast()
const router = useRouter()

interface Form {
    email: string
    password: string
}

const form: Form = reactive({
    email: '',
    password: ''
})

const handleSubmitLogin = () => {
    const domain = import.meta.env.VITE_BACKEND_DOMAIN

    axios.post(domain + '/api/login', {
        email: form.email,
        password: form.password
    }).then(res => {
        console.log(res.data);
        Cookies.set('ar_gym_session', `${res.data.type} ${res.data.access_token}`)
        toast({
            title: 'Login successfully'
        })
        router.push('/dashboard')
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

</script>
<template>
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to AR GYM</CardDescription>
        </CardHeader>
        <CardContent>
            <Input v-model="form.email" type="email" placeholder="Email" class="mb-5" />
            <Input v-model="form.password" type="password" placeholder="Password" class="mb-5" />
            <Button @click="handleSubmitLogin">Login</Button>
        </CardContent>
    </Card>
</template>