<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';

const router = useRouter()

const handleRoute = (path: string) => {
    router.push('/' + path)
}

</script>

<template>
    <main class="max-w-lg mx-auto my-20">
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>List All Menus on AR GYM</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="link" @click="handleRoute('user')">User</Button>
                <Button variant="link" @click="handleRoute('service')">Service</Button>
                <Button variant="link" @click="handleRoute('member')">Member</Button>
                <Button variant="link" @click="handleRoute('order')">Order</Button>
                <Button variant="link" @click="handleRoute('information')">Information</Button>
            </CardContent>
        </Card>
    </main>
</template>
