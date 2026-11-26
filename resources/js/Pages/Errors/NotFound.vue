<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Button from '@/Components/Button.vue';

const goBack = () => {
    if (typeof window !== 'undefined') window.history.back();
};
</script>

<template>
    <Head title="404 — Page not found" />

    <div class="flex min-h-screen flex-col bg-white">
        <div class="flex flex-1 flex-col items-center px-6 pt-uui-24 text-center">
            <p class="text-md-semibold text-brand-700">404 error</p>
            <h1 class="mt-3 text-display-2xl-semibold text-gray-900">
                We lost this page
            </h1>
            <p class="mt-6 max-w-[640px] text-xl-regular text-gray-600">
                We searched high and low, but couldn’t find what you’re looking for.<br />
                Let’s find a better place for you to go.
            </p>

            <div class="mt-12 flex items-center gap-3">
                <Button hierarchy="secondary-gray" size="xl" @click="goBack">
                    <template #leading>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </template>
                    Go back
                </Button>
                <Link :href="'/'">
                    <Button hierarchy="primary" size="xl">Go home</Button>
                </Link>
            </div>
        </div>

        <!-- Helpful cards -->
        <div class="mx-auto grid w-full max-w-uui-container-desktop grid-cols-1 gap-6 px-6 py-uui-24 md:grid-cols-3">
            <div class="flex flex-col gap-uui-8 rounded-uui-2xl bg-gray-50 p-uui-6">
                <div class="flex size-10 items-center justify-center rounded-uui-lg bg-white text-brand-600 shadow-uui-xs">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg-semibold text-gray-900">Documentation</h3>
                    <p class="mt-1 text-md-regular text-gray-600">
                        Dive in to learn all about our product.
                    </p>
                    <a href="#" class="mt-uui-5 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                        Start learning
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>

            <div class="flex flex-col gap-uui-8 rounded-uui-2xl bg-gray-50 p-uui-6">
                <div class="flex size-10 items-center justify-center rounded-uui-lg bg-white text-brand-600 shadow-uui-xs">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg-semibold text-gray-900">Our blog</h3>
                    <p class="mt-1 text-md-regular text-gray-600">
                        Read the latest posts on our blog.
                    </p>
                    <a href="#" class="mt-uui-5 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                        View latest posts
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>

            <div class="flex flex-col gap-uui-8 rounded-uui-2xl bg-gray-50 p-uui-6">
                <div class="flex size-10 items-center justify-center rounded-uui-lg bg-white text-brand-600 shadow-uui-xs">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg-semibold text-gray-900">Chat to us</h3>
                    <p class="mt-1 text-md-regular text-gray-600">
                        Can’t find what you’re looking for?
                    </p>
                    <a href="#" class="mt-uui-5 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                        Chat to our team
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
