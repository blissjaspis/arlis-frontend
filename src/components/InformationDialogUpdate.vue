<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { onUpdated, reactive } from 'vue'
import { apiAuth } from '@/lib/useAuth'
import { useToast } from './ui/toast'
import { useDialogStore } from '@/stores/dialog'
import type { FormInformation, Information } from '@/types/Service'

const { toast } = useToast()
const dialogStore = useDialogStore()

const emit = defineEmits(['eventLoadInformation'])

const props = defineProps<{
    data: Information | null,
}>()

const form: FormInformation = reactive({
    food_recomendation: '',
})

const resetForm = () => {
    form.food_recomendation = ''
}

const handleCancelButton = () => {
    dialogStore.closeDialog()
    resetForm()
}

const handleSubmitInformation = () => {
    apiAuth().put(`/api/information/${props.data?.id}`, {
        food_recomendation: form.food_recomendation,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully update information'
        })
        resetForm()
        dialogStore.closeDialog()
        emit('eventLoadInformation')
    }).catch(err => {
        toast({
            title: err.response.data.message
        })
    })
}

onUpdated(() => {
    if (dialogStore.show !== false) {
        form.food_recomendation = props.data?.food_recomendation ?? ''
    }
})
</script>
<template>
    <Dialog :open="dialogStore.show">
        <DialogContent class="sm:max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh]">
            <DialogHeader>
                <DialogTitle>Form Update Service</DialogTitle>
                <DialogDescription>
                    Update this information as you want.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5 py-4 overflow-y-auto px-6">
                <Input v-model="form.food_recomendation" placeholder="Food Recomendation" />
            </div>

            <DialogFooter>
                <Button variant="ghost" @click="handleCancelButton()">Cancel</Button>
                <Button @click="handleSubmitInformation">Update Information</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>