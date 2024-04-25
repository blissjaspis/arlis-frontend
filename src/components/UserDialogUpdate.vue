<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { onUpdated, reactive } from 'vue'
import type { FormUsers, Users } from '@/types/User'
import { useToast } from './ui/toast'
import { apiAuth } from '@/lib/useAuth'

const { toast } = useToast()
const dialogStore = useDialogStore()

const emit = defineEmits(['eventLoadUser'])

const props = defineProps<{
    data: Users | null,
}>()

const resource = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    dialog: false
}

const form: FormUsers = reactive(resource)

const resetForm = () => {
    form.name = ''
    form.email = ''
    form.password = ''
    form.phone_number = ''
    form.address = ''
}

const handleCancelButton = () => {
    dialogStore.closeDialog()
    resetForm()
}

onUpdated(() => {
    if (dialogStore.show !== false) {
        form.name = props.data?.name ?? ''
        form.email = props.data?.email ?? ''
        form.password = ''
        form.phone_number = props.data?.phone_number ?? ''
        form.address = props.data?.address ?? ''
    }
})

const handleSubmitUser = () => {
    apiAuth().put(`/api/user/${props.data?.id}`, {
        name: form.name,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        address: form.address
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully update user'
        })
        resetForm()
        dialogStore.closeDialog()
        emit('eventLoadUser')
    }).catch(err => {
        toast({
            title: err.response.message
        })
    })
}
</script>
<template>
    <Dialog :open="dialogStore.show">
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
                <DialogTitle>Form Update User</DialogTitle>
                <DialogDescription>
                    Update a user to use this app gym
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5 py-4 overflow-y-auto px-6">
                <Input v-model="form.name" placeholder="Name" />

                <Input v-model="form.email" type="email" placeholder="Email" />

                <Input v-model="form.password" type="password" placeholder="Password" />

                <Input v-model="form.phone_number" placeholder="Phone Number" />

                <Textarea v-model="form.address" placeholder="Address" />
            </div>

            <DialogFooter>
                <Button variant="ghost" @click="handleCancelButton">Cancel</Button>
                <Button @click="handleSubmitUser">Update User</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>