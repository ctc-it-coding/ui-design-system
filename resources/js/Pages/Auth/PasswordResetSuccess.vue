<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Button from '@/Components/Button.vue';
</script>

<template>
    <Head title="Password reset" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
        <!-- Background grid -->
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#EAECF0_1px,transparent_1px),linear-gradient(to_bottom,#EAECF0_1px,transparent_1px)] [background-size:80px_80px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)]"
        />

        <div class="relative z-10 flex w-full max-w-[400px] flex-col items-center text-center">
            <!-- Check icon -->
            <div
                class="flex size-14 items-center justify-center rounded-uui-xl border border-gray-200 shadow-uui-xs"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-700"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 12 15 16 10" />
                </svg>
            </div>

            <h1 class="mt-6 text-display-sm-semibold text-gray-900">
                Password reset
            </h1>
            <p class="mt-3 text-md-regular text-gray-600">
                Your password has been successfully reset.<br />
                Click below to log in magically.
            </p>

            <Link :href="route('login')" class="mt-8 w-full">
                <Button hierarchy="primary" size="lg" class="w-full justify-center">
                    Continue
                </Button>
            </Link>

            <Link
                :href="route('login')"
                class="mt-8 inline-flex items-center gap-2 text-sm-semibold text-gray-600 hover:text-gray-900"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                </svg>
                Back to log in
            </Link>
        </div>
    </div>
</template>
