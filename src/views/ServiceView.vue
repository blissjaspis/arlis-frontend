<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ServiceDialogCreate from '@/components/ServiceDialogCreate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';

const router = useRouter()

const handleRouter = () => router.replace('/dashboard')
</script>
<template>
    <div class="container mx-auto my-20">
        <Button variant="ghost" class="mb-5" @click="handleRouter">
            <ChevronLeft class="w-4 h-4 mr-2" />
            Back to Dashboard
        </Button>

        <Card>
            <CardHeader>
                <CardTitle>Service</CardTitle>
                <CardDescription>All services</CardDescription>
            </CardHeader>
            <CardContent>
                <ServiceDialogCreate />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead class="text-right">
                                Duration
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell class="font-medium">
                                Gyms Gold
                            </TableCell>
                            <TableCell>Rp 1.000.000</TableCell>
                            <TableCell>Gold</TableCell>
                            <TableCell class="text-right">
                                1 Month
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button variant="secondary">Edit</Button>
                                    <Button variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</template>