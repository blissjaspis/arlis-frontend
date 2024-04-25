<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { apiAuth, removeSession } from '@/lib/useAuth';
import { useToast } from '@/components/ui/toast';

const router = useRouter()
const { toast } = useToast()

const handleRoute = (path: string) => {
    router.push('/' + path)
}

const handleLogout = () => {
    apiAuth().post('/api/logout').then(() => {
        removeSession()
        router.push('/')
    }).catch(err => {
        toast({
            title: err.response.data.message,
            variant: 'destructive'
        })
    })
}

onMounted(() => {
    apiAuth().get('/api/user').catch(err => {
        if (err.response.status == 401) {
            router.replace('/')
            return
        }
    })
})

</script>

<template>
    <main class="max-w-lg mx-auto my-20">
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>List All Menus on AR GYM</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="mb-5">
                    <Button variant="link" @click="handleRoute('user')">User</Button>
                    <Button variant="link" @click="handleRoute('service')">Service</Button>
                    <Button variant="link" @click="handleRoute('member')">Member</Button>
                    <Button variant="link" @click="handleRoute('order')">Order</Button>
                    <Button variant="link" @click="handleRoute('information')">Information</Button>
                </div>

                <Button @click="handleLogout()" variant="ghost" size="sm">Logout</Button>
            </CardContent>
        </Card>
    </main>
</template>
