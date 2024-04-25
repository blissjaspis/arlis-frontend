<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import InformationDialogCreate from '@/components/InformationDialogCreate.vue';
import InformationDialogUpdate from '@/components/InformationDialogUpdate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { apiAuth } from '@/lib/useAuth';
import { onMounted, reactive } from 'vue';
import { useToast } from '@/components/ui/toast';
import { useDialogStore } from '@/stores/dialog';
import type { Information } from '@/types/Service'

const router = useRouter()
const { toast } = useToast()
const dialogStore = useDialogStore()

const handleRouter = () => router.replace('/dashboard')

const form: { informations: Information[]; update: null | Information; } = reactive({
    informations: [],
    update: null,
})

const handleLoadInformation = () => {
    apiAuth().get('/api/information').then(res => {
        console.log(res.data);

        form.informations = res.data
    }).catch(err => {
        if (err.response.status == 401) {
            router.push('/')
            return
        }
    })
}

const handleDeleteInformation = (id: number) => {
    apiAuth().delete(`/api/information/${id}`)
        .then(res => {
            toast({ title: res.data.message })
            handleLoadInformation()
        })
        .catch(err => toast({ title: err.response.message }))
}

const handleEditInformation = (id: number) => {
    apiAuth().get(`/api/information/${id}`)
        .then(res => {
            form.update = res.data
            dialogStore.openDialog()
        })
        .catch(err => toast({ title: err.response.message }))
}

onMounted(() => {
    handleLoadInformation()
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
                <CardTitle>Information</CardTitle>
                <CardDescription>All information</CardDescription>
            </CardHeader>
            <CardContent>
                <InformationDialogCreate @eventLoadInformation="handleLoadInformation()" />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Food Recomendation
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(information, key) in form.informations" :key="key">
                            <TableCell class="font-medium">
                                {{ information.food_recomendation }}
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button @click="handleEditInformation(information.id)"
                                        variant="secondary">Edit</Button>
                                    <Button @click="handleDeleteInformation(information.id)"
                                        variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <InformationDialogUpdate :data="form.update" @eventLoadInformation="handleLoadInformation" />
    </div>
</template>