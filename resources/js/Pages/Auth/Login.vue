<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import InputField from '@/Components/InputField.vue';
import CheckboxField from '@/Components/CheckboxField.vue';
import Button from '@/Components/Button.vue';
import SocialButton from '@/Components/SocialButton.vue';

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <div class="flex min-h-screen bg-white">
        <!-- Left: form -->
        <div class="flex flex-1 flex-col px-8 py-12 lg:px-16">
            <Logo />

            <div class="flex flex-1 items-center justify-center">
                <div class="w-full max-w-[360px]">
                    <h1 class="text-display-md-semibold text-gray-900">Log in</h1>
                    <p class="mt-3 text-md-regular text-gray-600">
                        Welcome back! Please enter your details.
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

                        <InputField
                            v-model="form.password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            :destructive="!!form.errors.password"
                            :hint="form.errors.password"
                        />

                        <div class="flex items-center justify-between">
                            <CheckboxField
                                v-model="form.remember"
                                label="Remember for 30 days"
                            />
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-sm-semibold text-brand-700 hover:text-brand-800"
                            >
                                Forgot password
                            </Link>
                        </div>

                        <div class="mt-2 flex flex-col gap-4">
                            <Button
                                type="submit"
                                hierarchy="primary"
                                size="lg"
                                :disabled="form.processing"
                                class="w-full justify-center"
                            >
                                Sign in
                            </Button>
                            <SocialButton social="google" theme="brand" class="w-full justify-center">
                                Sign in with Google
                            </SocialButton>
                        </div>
                    </form>

                    <p class="mt-8 text-center text-sm-regular text-gray-600">
                        Don’t have an account?
                        <Link
                            :href="route('register')"
                            class="ms-1 text-sm-semibold text-brand-700 hover:text-brand-800"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <p class="text-sm-regular text-gray-500">© Untitled UI 2077</p>
        </div>

        <!-- Right: decorative panel (placeholder) -->
        <div class="hidden flex-1 bg-gray-50 lg:block">
            <div class="flex h-full items-center justify-center">
                <div class="text-md-regular text-gray-400">Dashboard preview</div>
            </div>
        </div>
    </div>
</template>
