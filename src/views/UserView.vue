<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserDialogCreate from '@/components/UserDialogCreate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import type { Users } from "@/types/User"
import { apiAuth } from '@/lib/useAuth';
import { toast } from '@/components/ui/toast';
import UserDialogUpdate from '@/components/UserDialogUpdate.vue';
import { useDialogStore } from '@/stores/dialog';

const router = useRouter()
const dialogStore = useDialogStore()

const handleBackToDashboard = () => router.replace('/dashboard')

const form: { users: Users[]; update: null | Users; } = reactive({
    users: [],
    update: null,
})

const handleLoadUser = () => {
    apiAuth().get('/api/user').then(res => {
        form.users = res.data
    }).catch(err => {
        if (err.response.status == 401) {
            router.replace('/')
            return
        }
    })
}

const handleDeleteUser = (id: number) => {
    apiAuth().delete(`/api/user/${id}`)
        .then(res => {
            toast({ title: res.data.message })
            handleLoadUser()
        })
        .catch(err => toast({ title: err.response.message }))
}

const handleEditUser = (id: number) => {
    apiAuth().get(`/api/user/${id}`)
        .then(res => {
            form.update = res.data
            dialogStore.openDialog()
        })
        .catch(err => toast({ title: err.response.message }))
}

onMounted(() => {
    handleLoadUser()
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
                <UserDialogCreate @eventLoadUser="handleLoadUser" />

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
                                    <Button @click="handleEditUser(user.id)" variant="secondary">Edit</Button>
                                    <Button @click="handleDeleteUser(user.id)" variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <UserDialogUpdate :data="form.update" @eventLoadUser="handleLoadUser" />
        <Toaster />
    </div>
</template>
