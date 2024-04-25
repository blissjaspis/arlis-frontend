<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select'
import { SelectTrigger, SelectValue, } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onUpdated, reactive } from 'vue'
import { apiAuth } from '@/lib/useAuth'
import { useToast } from './ui/toast'

const { toast } = useToast()

const emit = defineEmits(['eventLoadOrder'])

interface Form {
    order_code: string
    user_id: string
    service_id: string
    dialog: boolean
    users: {
        id: number
        name: string
    }[]
    services: {
        id: number
        name: string
    }[]
}

const form: Form = reactive({
    order_code: '',
    user_id: '',
    service_id: '',
    users: [],
    services: [],
    dialog: false
})

const resetForm = () => {
    form.order_code = ''
    form.user_id = ''
    form.service_id = ''
    form.dialog = false
}

const handleSubmitOrder = () => {
    apiAuth().post('/api/order', {
        order_code: form.order_code,
        user_id: form.user_id,
        service_id: form.service_id,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully create order'
        })
        resetForm()
        emit('eventLoadOrder')
    }).catch(err => {
        toast({
            title: err.response.data.message
        })
    })
}

onUpdated(() => {
    if (form.dialog !== false) {
        apiAuth().get('/api/user').then((res) => {
            form.users = res.data
        })
        apiAuth().get('/api/service').then((res) => {
            form.services = res.data
        })
    }
})
</script>
<template>
    <Dialog :open="form.dialog">
        <DialogTrigger>
            <Button @click="form.dialog = true" size="sm">Create New Order</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle>Form Order</DialogTitle>
                <DialogDescription>
                    Create a order.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5 py-4 overflow-y-auto px-6">
                <Input v-model="form.order_code" placeholder="Order code" />

                <Select v-model="form.user_id">
                    <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Users</SelectLabel>
                            <SelectItem v-for="user in form.users" :value="user.id.toString()" :key="user.id">{{
                                user.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select v-model="form.service_id">
                    <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            <SelectItem v-for="service in form.services" :value="service.id.toString()"
                                :key="service.id">{{
                                    service.name }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>

            <DialogFooter>
                <Button variant="ghost" @click="form.dialog = false">Cancel</Button>
                <Button @click="handleSubmitOrder">Save Order</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>