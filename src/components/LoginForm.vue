<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { reactive } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import { apiAuth, setSession } from '@/lib/useAuth'
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

const handleRouteToRegister = () => router.push('/register')

const handleSubmitLogin = () => {
    apiAuth().post('/api/login', {
        email: form.email,
        password: form.password
    }).then(res => {
        console.log(res.data);
        setSession(res.data.type, res.data.access_token)
        toast({
            title: 'Successfully login'
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
            <Input @keyup.enter="handleSubmitLogin" v-model="form.password" type="password" placeholder="Password"
                class="mb-5" />
            <div class="flex justify-end mb-2">
                <a href="javascript:;" @click="handleRouteToRegister"
                    class="text-sm text-gray-700 hover:text-blue-500">Register?</a>
            </div>
            <Button @click="handleSubmitLogin">Login</Button>
        </CardContent>
    </Card>
</template>
