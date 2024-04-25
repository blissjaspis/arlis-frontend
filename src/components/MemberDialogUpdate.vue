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
import type { FormMember, Member } from '@/types/Service'

const { toast } = useToast()
const dialogStore = useDialogStore()

const emit = defineEmits(['eventLoadMember'])

const props = defineProps<{
    data: Member | null,
}>()

const form: FormMember = reactive({
    expired_at: '',
    user_id: '',
    service_id: '',
    users: [],
    services: [],
})

const resetForm = () => {
    form.expired_at = ''
    form.user_id = ''
    form.service_id = ''
}

const handleCancelButton = () => {
    dialogStore.closeDialog()
    resetForm()
}

const handleSubmitMember = () => {
    apiAuth().put(`/api/member/${props.data?.id}`, {
        expired_at: form.expired_at,
        user_id: form.user_id,
        service_id: form.service_id,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully update member'
        })
        resetForm()
        dialogStore.closeDialog()
        emit('eventLoadMember')
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

        form.expired_at = props.data?.expired_at ?? ''
        form.user_id = props.data?.user_id ?? ''
        form.service_id = props.data?.service_id ?? ''
    }
})
</script>
<template>
    <Dialog :open="dialogStore.show">
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle>Form Update Member</DialogTitle>
                <DialogDescription>
                    Update this member as you want.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5 py-4 overflow-y-auto px-6">
                <Input v-model="form.expired_at" type="date" placeholder="Expired Member at" />

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
                <Button @click="handleSubmitMember">Update Member</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>