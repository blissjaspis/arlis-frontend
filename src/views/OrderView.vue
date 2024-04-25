<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import OrderDialogCreate from '@/components/OrderDialogCreate.vue';
import OrderDialogUpdate from '@/components/OrderDialogUpdate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { apiAuth } from '@/lib/useAuth';
import { onMounted, reactive } from 'vue';
import { useToast } from '@/components/ui/toast';
import { useDialogStore } from '@/stores/dialog';
import type { Order } from '@/types/Service'

const router = useRouter()
const { toast } = useToast()
const dialogStore = useDialogStore()

const handleRouter = () => router.replace('/dashboard')

const form: { orders: Order[]; update: null | Order; } = reactive({
    orders: [],
    update: null,
})

const handleLoadOrder = () => {
    apiAuth().get('/api/order').then(res => {
        console.log(res.data);

        form.orders = res.data
    }).catch(err => {
        if (err.response.status == 401) {
            router.push('/')
            return
        }
    })
}

const handleDeleteOrder = (id: number) => {
    apiAuth().delete(`/api/order/${id}`)
        .then(res => {
            toast({ title: res.data.message })
            handleLoadOrder()
        })
        .catch(err => toast({ title: err.response.message }))
}

const handleEditOrder = (id: number) => {
    apiAuth().get(`/api/order/${id}`)
        .then(res => {
            form.update = res.data
            dialogStore.openDialog()
        })
        .catch(err => toast({ title: err.response.message }))
}

onMounted(() => {
    handleLoadOrder()
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
                <CardTitle>Order</CardTitle>
                <CardDescription>All order</CardDescription>
            </CardHeader>
            <CardContent>
                <OrderDialogCreate @eventLoadOrder="handleLoadOrder()" />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Order Code
                            </TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead class="text-right">
                                Total Price
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(order, key) in form.orders" :key="key">
                            <TableCell class="font-medium">
                                {{ order.order_code }}
                            </TableCell>
                            <TableCell>{{ order.user_name }}</TableCell>
                            <TableCell>{{ order.service_name }}</TableCell>
                            <TableCell class="text-right">
                                {{ order.total_price }}
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button @click="handleEditOrder(order.id)" variant="secondary">Edit</Button>
                                    <Button @click="handleDeleteOrder(order.id)" variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <OrderDialogUpdate :data="form.update" @eventLoadOrder="handleLoadOrder" />
    </div>
</template>