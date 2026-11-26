<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import Logomark from '@/Components/Logomark.vue';
import InputField from '@/Components/InputField.vue';
import Button from '@/Components/Button.vue';
import SocialButton from '@/Components/SocialButton.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const hasMinLength = computed(() => form.password.length >= 8);
const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.password));

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Sign up" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">
        <!-- Background grid -->
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#EAECF0_1px,transparent_1px),linear-gradient(to_bottom,#EAECF0_1px,transparent_1px)] [background-size:80px_80px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)]"
        />

        <div class="relative z-10 flex w-full max-w-[360px] flex-col items-center text-center">
            <!-- Logo mark -->
            <div
                class="flex size-14 items-center justify-center rounded-uui-xl border border-gray-200 bg-white shadow-uui-xs"
            >
                <Logomark />
            </div>

            <h1 class="mt-6 text-display-sm-semibold text-gray-900">
                Create an account
            </h1>
            <p class="mt-3 text-md-regular text-gray-600">
                Start your 30-day free trial.
            </p>

            <form class="mt-8 flex w-full flex-col gap-5 text-left" @submit.prevent="submit">
                <InputField
                    v-model="form.name"
                    type="text"
                    label="Name*"
                    placeholder="Enter your name"
                    :destructive="!!form.errors.name"
                    :hint="form.errors.name"
                />

                <InputField
                    v-model="form.email"
                    type="email"
                    label="Email*"
                    placeholder="Enter your email"
                    :destructive="!!form.errors.email"
                    :hint="form.errors.email"
                />

                <InputField
                    v-model="form.password"
                    type="password"
                    label="Password*"
                    placeholder="Create a password"
                    :destructive="!!form.errors.password"
                    :hint="form.errors.password"
                />

                <ul class="-mt-2 flex flex-col gap-2">
                    <li class="flex items-center gap-2 text-sm-regular text-gray-600">
                        <span
                            :class="[
                                'flex size-5 items-center justify-center rounded-full',
                                hasMinLength ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-400',
                            ]"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        Must be at least 8 characters
                    </li>
                    <li class="flex items-center gap-2 text-sm-regular text-gray-600">
                        <span
                            :class="[
                                'flex size-5 items-center justify-center rounded-full',
                                hasSpecial ? 'bg-success-500 text-white' : 'bg-gray-200 text-gray-400',
                            ]"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        Must contain one special character
                    </li>
                </ul>

                <div class="flex flex-col gap-4">
                    <Button
                        type="submit"
                        hierarchy="primary"
                        size="lg"
                        :disabled="form.processing"
                        class="w-full justify-center"
                    >
                        Get started
                    </Button>
                    <SocialButton social="google" theme="brand" class="w-full justify-center">
                        Sign up with Google
                    </SocialButton>
                </div>
            </form>

            <p class="mt-8 text-sm-regular text-gray-600">
                Already have an account?
                <Link
                    :href="route('login')"
                    class="ms-1 text-sm-semibold text-brand-700 hover:text-brand-800"
                >
                    Log in
                </Link>
            </p>
        </div>
    </div>
</template>
