<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import MemberDialogCreate from '@/components/MemberDialogCreate.vue';
import MemberDialogUpdate from '@/components/MemberDialogUpdate.vue';
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { apiAuth } from '@/lib/useAuth';
import { onMounted, reactive } from 'vue';
import { useToast } from '@/components/ui/toast';
import { useDialogStore } from '@/stores/dialog';
import type { Member } from '@/types/Service'

const router = useRouter()
const { toast } = useToast()
const dialogStore = useDialogStore()

const handleRouter = () => router.replace('/dashboard')

const form: { members: Member[]; update: null | Member; } = reactive({
    members: [],
    update: null,
})

const handleLoadMember = () => {
    apiAuth().get('/api/member').then(res => {
        console.log(res.data);

        form.members = res.data
    }).catch(err => {
        if (err.response.status == 401) {
            router.push('/')
            return
        }
    })
}

const handleDeleteMember = (id: number) => {
    apiAuth().delete(`/api/member/${id}`)
        .then(res => {
            toast({ title: res.data.message })
            handleLoadMember()
        })
        .catch(err => toast({ title: err.response.message }))
}

const handleEditMember = (id: number) => {
    apiAuth().get(`/api/member/${id}`)
        .then(res => {
            form.update = res.data
            dialogStore.openDialog()
        })
        .catch(err => toast({ title: err.response.message }))
}

onMounted(() => {
    handleLoadMember()
})
</script>
<template>
    <div class="container mx-auto my-20">
        <Button variant="ghost" class="mb-5" @click="handleRouter">
            <ChevronLeft class="w-4 h-4 mr-2" />
            Back to Dashboard
        </Button>

        <Card>
            <CardHeader>
                <CardTitle>Member</CardTitle>
                <CardDescription>All member</CardDescription>
            </CardHeader>
            <CardContent>
                <MemberDialogCreate @eventLoadMember="handleLoadMember()" />

                <Table class="mt-10">
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>
                                Expired Member
                            </TableHead>
                            <TableHead class="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(member, key) in form.members" :key="key">
                            <TableCell>{{ member.user_name }}</TableCell>
                            <TableCell>{{ member.service_name }}</TableCell>
                            <TableCell>
                                {{ member.expired_at_result }}
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button @click="handleEditMember(member.id)" variant="secondary">Edit</Button>
                                    <Button @click="handleDeleteMember(member.id)" variant="destructive">Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <MemberDialogUpdate :data="form.update" @eventLoadMember="handleLoadMember" />
    </div>
</template>