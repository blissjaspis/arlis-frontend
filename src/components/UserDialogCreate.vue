<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
</script>
<template>
    <Dialog>
        <DialogTrigger>
            <Button size="sm">Create New User</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form Create User</DialogTitle>
                <DialogDescription>
                    Create a user to use this app gym
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5">
                <Input placeholder="Name" />

                <Input type="email" placeholder="Email" />

                <Input type="password" placeholder="Password" />

                <Input placeholder="Phone Number" />

                <Textarea placeholder="Address" />
            </div>

            <DialogFooter>
                <Button>Save User</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>