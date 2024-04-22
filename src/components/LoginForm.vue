<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>
<template>
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to AR GYM</CardDescription>
        </CardHeader>
        <CardContent>
            <Input type="email" placeholder="Email" class="mb-5" />
            <Input type="password" placeholder="Password" class="mb-5" />
            <Button>Login</Button>
        </CardContent>
    </Card>
</template>