<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import UserDialogCreate from '@/components/UserDialogCreate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie'
import type { Users } from "@/types/User"

const router = useRouter()

const handleBackToDashboard = () => router.replace('/dashboard')

const form: { users: Users[] } = reactive({
    users: []
})

onMounted(() => {
    const domain = import.meta.env.VITE_BACKEND_DOMAIN

    axios.get(domain + '/api/user', {
        headers: {
            Authorization: Cookies.get('ar_gym_session')
        }
    }).then(res => {
        console.log(res.data);
        form.users = res.data
    }).catch(err => {
        console.log(err.response.data.message);
    })
})
</script>
<template>
    <div class="container mx-auto my-20">
        <Button variant="ghost" class="mb-5" @click="handleBackToDashboard">
            <ChevronLeft class="w-4 h-4 mr-2" />
            Back to Dashboard
        </Button>

        <Card>
            <CardHeader>
                <CardTitle>User</CardTitle>
                <CardDescription>All users</CardDescription>
            </CardHeader>
            <CardContent>
                <UserDialogCreate />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead class="text-right">
                                Join
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(user, key) in form.users" :key="key">
                            <TableCell class="font-medium">
                                {{ user.name }}
                            </TableCell>
                            <TableCell>{{ user.email }}</TableCell>
                            <TableCell>{{ user.phone_number }}</TableCell>
                            <TableCell class="text-right">
                                {{ user.join }}
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button variant="secondary">Edit</Button>
                                    <Button variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</template>
