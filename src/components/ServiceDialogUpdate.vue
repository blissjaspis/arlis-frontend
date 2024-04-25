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
import type { FormService, Service } from '@/types/Service'

const { toast } = useToast()
const dialogStore = useDialogStore()

const emit = defineEmits(['eventLoadService'])

const props = defineProps<{
    data: Service | null,
}>()

const form: FormService = reactive({
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

const handleCancelButton = () => {
    dialogStore.closeDialog()
    resetForm()
}

const handleSubmitService = () => {
    apiAuth().put(`/api/service/${props.data?.id}`, {
        name: form.name,
        price: form.price,
        type: form.type,
        duration_months: form.duration_months,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully update service'
        })
        resetForm()
        dialogStore.closeDialog()
        emit('eventLoadService')
    }).catch(err => {
        toast({
            title: err.response.data.message
        })
    })
}

onUpdated(() => {
    if (dialogStore.show !== false) {
        form.name = props.data?.name ?? ''
        form.price = props.data?.price_raw ?? ''
        form.type = props.data?.type ?? 'Gold'
        form.duration_months = props.data?.duration_months_raw ?? ''
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
                <Button variant="ghost" @click="handleCancelButton()">Cancel</Button>
                <Button @click="handleSubmitService">Update Service</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>