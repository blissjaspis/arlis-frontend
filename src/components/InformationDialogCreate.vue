<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { reactive } from 'vue'
import { apiAuth } from '@/lib/useAuth'
import { useToast } from './ui/toast'

const { toast } = useToast()

const emit = defineEmits(['eventLoadInformation'])

interface Form {
    food_recomendation: string
    dialog: boolean
}

const form: Form = reactive({
    food_recomendation: '',
    dialog: false
})

const resetForm = () => {
    form.food_recomendation = ''
}

const handleSubmitService = () => {
    apiAuth().post('/api/information', {
        food_recomendation: form.food_recomendation,
    }).then(res => {
        console.log(res);
        toast({
            title: 'Successfully create information'
        })
        resetForm()
        form.dialog = false
        emit('eventLoadInformation')
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
                <Input v-model="form.food_recomendation" placeholder="Food Recomendation" />
            </div>

            <DialogFooter>
                <Button variant="ghost" @click="form.dialog = false">Cancel</Button>
                <Button @click="handleSubmitService">Save Information</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>