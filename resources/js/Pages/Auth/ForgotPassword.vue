<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import InputField from '@/Components/InputField.vue';
import Button from '@/Components/Button.vue';

defineProps<{ status?: string }>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot password" />

    <div class="flex min-h-screen bg-white">
        <!-- Left: form -->
        <div class="flex flex-1 flex-col px-8 py-12 lg:px-16">
            <Logo />

            <div class="flex flex-1 items-center justify-center">
                <div class="w-full max-w-[360px]">
                    <h1 class="text-display-md-semibold text-gray-900">
                        Forgot password?
                    </h1>
                    <p class="mt-3 text-md-regular text-gray-600">
                        No worries, we’ll send you reset instructions.
                    </p>

                    <p
                        v-if="status"
                        class="mt-4 text-sm-medium text-success-600"
                    >
                        {{ status }}
                    </p>

                    <form class="mt-8 flex flex-col gap-5" @submit.prevent="submit">
                        <InputField
                            v-model="form.email"
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            :destructive="!!form.errors.email"
                            :hint="form.errors.email"
                        />

                        <Button
                            type="submit"
                            hierarchy="primary"
                            size="lg"
                            :disabled="form.processing"
                            class="w-full justify-center"
                        >
                            Reset password
                        </Button>
                    </form>

                    <p class="mt-8 text-center text-sm-regular text-gray-600">
                        <Link
                            :href="route('login')"
                            class="text-sm-semibold text-brand-700 hover:text-brand-800"
                        >
                            ← Back to log in
                        </Link>
                    </p>
                </div>
            </div>

            <p class="text-sm-regular text-gray-500">© Untitled UI 2077</p>
        </div>

        <!-- Right: decorative panel -->
        <div class="hidden flex-1 bg-gray-50 lg:block">
            <div class="flex h-full items-center justify-center">
                <div class="text-md-regular text-gray-400">Dashboard preview</div>
            </div>
        </div>
    </div>
</template>
