<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ServiceDialogCreate from '@/components/ServiceDialogCreate.vue';
import ServiceDialogUpdate from '@/components/ServiceDialogUpdate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { apiAuth } from '@/lib/useAuth';
import { onMounted, reactive } from 'vue';
import { useToast } from '@/components/ui/toast';
import { useDialogStore } from '@/stores/dialog';
import type { Service } from '@/types/Service'

const router = useRouter()
const { toast } = useToast()
const dialogStore = useDialogStore()

const handleRouter = () => router.replace('/dashboard')

const form: { services: Service[]; update: null | Service; } = reactive({
    services: [],
    update: null,
})

const handleLoadService = () => {
    apiAuth().get('/api/service').then(res => {
        console.log(res.data);

        form.services = res.data
    }).catch(err => {
        if (err.response.status == 401) {
            router.push('/')
            return
        }
    })
}

const handleDeleteService = (id: number) => {
    apiAuth().delete(`/api/service/${id}`)
        .then(res => {
            toast({ title: res.data.message })
            handleLoadService()
        })
        .catch(err => toast({ title: err.response.message }))
}

const handleEditService = (id: number) => {
    apiAuth().get(`/api/service/${id}`)
        .then(res => {
            form.update = res.data
            dialogStore.openDialog()
        })
        .catch(err => toast({ title: err.response.message }))
}

onMounted(() => {
    handleLoadService()
})
</script>
<template>
    <div class="container mx-auto my-20">
        <Button variant="ghost" class="mb-5" @click="handleRouter">
            <ChevronLeft class="w-4 h-4 mr-2" />
            Back to Dashboard
        </Button>

        <Card>
            <CardHeader>
                <CardTitle>Service</CardTitle>
                <CardDescription>All services</CardDescription>
            </CardHeader>
            <CardContent>
                <ServiceDialogCreate @eventLoadService="handleLoadService()" />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead class="text-right">
                                Duration
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(service, key) in form.services" :key="key">
                            <TableCell class="font-medium">
                                {{ service.name }}
                            </TableCell>
                            <TableCell>{{ service.price }}</TableCell>
                            <TableCell>{{ service.type }}</TableCell>
                            <TableCell class="text-right">
                                {{ service.duration_months }}
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button @click="handleEditService(service.id)" variant="secondary">Edit</Button>
                                    <Button @click="handleDeleteService(service.id)"
                                        variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <ServiceDialogUpdate :data="form.update" @eventLoadService="handleLoadService" />
    </div>
</template>