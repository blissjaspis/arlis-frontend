<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select'
import { SelectTrigger, SelectValue, } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { reactive } from 'vue'
import { apiAuth } from '@/lib/useAuth'
import { useToast } from './ui/toast'

const { toast } = useToast()

const emit = defineEmits(['eventLoadService'])

interface Form {
    name: string
    price: string
    type: string
    duration_months: string
    dialog: boolean
}

const form: Form = reactive({
    name: '',
    price: '',
    type: 'gold',
    duration_months: '',
    dialog: false
})

const resetForm = () => {
    form.name = ''
    form.price = ''
    form.type = 'gold'
    form.duration_months = ''
}

const handleSubmitService = () => {
    apiAuth().post('/api/service', {
        name: form.name,
        price: form.price,
        type: form.type,
        duration_months: form.duration_months,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully create service'
        })
        resetForm()
        form.dialog = false
        emit('eventLoadService')
    }).catch(err => {
        toast({
            title: err.response.data.message
        })
    })
}
</script>
<template>
    <Dialog :open="form.dialog">
        <DialogTrigger>
            <Button @click="form.dialog = true" size="sm">Create New Service</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle>Form Create Service</DialogTitle>
                <DialogDescription>
                    Create a service that you want.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5 py-4 overflow-y-auto px-6">
                <Input v-model="form.name" placeholder="Name" />

                <Input v-model="form.price" type="number" placeholder="Price" />

                <Select v-model="form.type">
                    <SelectTrigger>
                        <SelectValue placeholder="Select type service" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            <SelectItem value="gold">
                                Gold
                            </SelectItem>
                            <SelectItem value="bronze">
                                Bronze
                            </SelectItem>
                            <SelectItem value="silver">
                                Silver
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input v-model="form.duration_months" type="number" placeholder="Duration Months" />
            </div>

            <DialogFooter>
                <Button variant="ghost" @click="form.dialog = false">Cancel</Button>
                <Button @click="handleSubmitService">Save Service</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>