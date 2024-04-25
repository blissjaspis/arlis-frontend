<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select'
import { SelectTrigger, SelectValue, } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onUpdated, reactive } from 'vue'
import { apiAuth } from '@/lib/useAuth'
import { useToast } from './ui/toast'
import { useDialogStore } from '@/stores/dialog'
import type { FormOrder, Order } from '@/types/Service'

const { toast } = useToast()
const dialogStore = useDialogStore()

const emit = defineEmits(['eventLoadOrder'])

const props = defineProps<{
    data: Order | null,
}>()

const form: FormOrder = reactive({
    order_code: '',
    user_id: '',
    service_id: '',
    users: [],
    services: [],
})

const resetForm = () => {
    form.order_code = ''
    form.user_id = ''
    form.service_id = ''
}

const handleCancelButton = () => {
    dialogStore.closeDialog()
    resetForm()
}

const handleSubmitOrder = () => {
    apiAuth().put(`/api/order/${props.data?.id}`, {
        order_code: form.order_code,
        user_id: form.user_id,
        service_id: form.service_id,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully update order'
        })
        resetForm()
        dialogStore.closeDialog()
        emit('eventLoadOrder')
    }).catch(err => {
        toast({
            title: err.response.data.message
        })
    })
}

onUpdated(() => {
    if (dialogStore.show !== false) {

        apiAuth().get('/api/user').then((res) => {
            form.users = res.data
        })
        apiAuth().get('/api/service').then((res) => {
            form.services = res.data
        })

        form.order_code = props.data?.order_code ?? ''
        form.user_id = props.data?.user_id ?? ''
        form.service_id = props.data?.service_id ?? ''
    }
})
</script>
<template>
    <Dialog :open="dialogStore.show">
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle>Form Update Service</DialogTitle>
                <DialogDescription>
                    Update this service as you want.
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
                <Button variant="ghost" @click="handleCancelButton()">Cancel</Button>
                <Button @click="handleSubmitOrder">Update Order</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>