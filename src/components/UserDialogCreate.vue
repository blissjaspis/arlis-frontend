<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { reactive } from 'vue'
import type { FormUsers } from '@/types/User'
import { useToast } from './ui/toast'
import { apiAuth } from '@/lib/useAuth'

const { toast } = useToast()

const emit = defineEmits(['eventLoadUser'])


const form: FormUsers = reactive({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
    dialog: false
})

const resetForm = () => {
    form.name = ''
    form.email = ''
    form.password = ''
    form.phone_number = ''
    form.address = ''
}

const handleSubmitUser = () => {
    apiAuth().post('/api/user', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        address: form.address
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully create user'
        })
        resetForm()
        form.dialog = false
        emit('eventLoadUser')
    }).catch(err => {
        toast({
            title: err.response.message
        })
    })
}
</script>
<template>
    <Dialog :open="form.dialog">
        <DialogTrigger>
            <Button @click="form.dialog = true" size="sm">Create New User</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
                <DialogTitle>Form Create User</DialogTitle>
                <DialogDescription>
                    Create a user to use this app gym
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
                <Button variant="ghost" @click="form.dialog = false">Cancel</Button>
                <Button @click="handleSubmitUser">Save User</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>