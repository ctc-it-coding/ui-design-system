<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import Button from '@/Components/Button.vue';

defineProps<{ status?: string }>();

const page = usePage();
const email = computed<string>(
    () => (page.props.auth as any)?.user?.email ?? 'olivia@untitledui.com',
);
</script>

<template>
    <Head title="Check your email" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
        <!-- Background grid -->
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#EAECF0_1px,transparent_1px),linear-gradient(to_bottom,#EAECF0_1px,transparent_1px)] [background-size:80px_80px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)]"
        />

        <div class="relative z-10 flex w-full max-w-[400px] flex-col items-center text-center">
            <!-- Mail icon -->
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
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </div>

            <h1 class="mt-6 text-display-sm-semibold text-gray-900">
                Check your email
            </h1>
            <p class="mt-3 text-md-regular text-gray-600">
                We sent a verification link to<br />
                <span class="text-md-medium text-gray-700">{{ email }}</span>
            </p>

            <p
                v-if="status === 'verification-link-sent'"
                class="mt-4 text-sm-medium text-success-600"
            >
                A new verification link has been sent.
            </p>

            <Link :href="route('verification.send')" method="post" as="button" class="mt-8 w-full">
                <Button hierarchy="primary" size="lg" class="w-full justify-center">
                    Enter code manually
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
