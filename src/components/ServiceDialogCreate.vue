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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>
<template>
    <Dialog>
        <DialogTrigger>
            <Button size="sm">Create New Service</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form Create Service</DialogTitle>
                <DialogDescription>
                    Create a service that you want.
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-5">
                <Input placeholder="Name" />

                <Input type="number" placeholder="Price" />

                <Select>
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

                <Input type="number" placeholder="Duration Months" />
            </div>

            <DialogFooter>
                <Button>Save Service</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>