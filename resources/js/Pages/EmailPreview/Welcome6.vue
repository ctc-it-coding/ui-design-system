<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
import Badge from '@/Components/Badge.vue';

const socials = [
    {
        name: 'X',
        path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
        name: 'Facebook',
        path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z',
    },
];
</script>

<template>
    <Head title="How to get up and running" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header: logo + log in + socials -->
            <header class="flex items-center justify-between">
                <Logo />
                <div class="flex items-center gap-uui-4">
                    <a href="#" class="text-md-semibold text-gray-900 hover:text-brand-700">Log in</a>
                    <div class="flex items-center gap-uui-3 text-gray-400">
                        <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path :d="s.path" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            <!-- Heading -->
            <h1 class="mt-uui-12 text-center text-display-md-semibold text-gray-900">
                How to get up and running as soon as possible
            </h1>

            <!-- Body -->
            <p class="mt-uui-6 text-center text-md-regular text-gray-700">
                We’ve created a quick intro video to get you up and running as
                soon as possible. Don’t hesitate to
                <a href="#" class="text-gray-700 underline">get in touch</a>.
            </p>

            <!-- Video player mock with overlay -->
            <div class="mt-uui-8 relative aspect-[504/470] w-full overflow-hidden rounded-uui-md bg-gradient-to-b from-[#A5B4FC] to-[#C4B5FD]">
                <!-- Title block -->
                <div class="absolute left-uui-6 top-uui-8 flex flex-col items-start gap-uui-4">
                    <Badge color="gray" type="badge-color" size="md">Part 1</Badge>
                    <p class="text-display-xs-semibold text-white">How to get started</p>
                </div>

                <!-- Center play -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="flex size-16 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                        </svg>
                    </div>
                </div>

                <!-- Bottom bar -->
                <div class="absolute inset-x-0 bottom-0 flex items-center gap-3 px-uui-6 py-uui-4 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                    <div class="flex flex-1 flex-col gap-1">
                        <div class="relative h-1 overflow-hidden rounded-full bg-white/30">
                            <div class="h-full w-[2%] bg-white" />
                        </div>
                        <div class="flex justify-between text-xs-medium">
                            <span>0:00</span>
                            <span>8:24</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Watch video button centered -->
            <div class="mt-uui-8 flex justify-center">
                <Button hierarchy="primary" size="lg">
                    <template #leading>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                        </svg>
                    </template>
                    Watch video
                </Button>
            </div>

            <!-- Footer -->
            <footer class="mt-uui-16 flex flex-col gap-uui-6">
                <p class="text-sm-regular text-gray-600">
                    This email was sent to
                    <a href="mailto:olivia@untitledui.com" class="text-brand-700 underline"
                        >olivia@untitledui.com</a
                    >. If you'd rather not receive this kind of email, you can
                    <a href="#" class="text-brand-700 underline">unsubscribe</a>
                    or
                    <a href="#" class="text-brand-700 underline">manage your email preferences</a>.
                </p>
                <p class="text-sm-regular text-gray-600">
                    © 2077 Untitled UI, 100 Smith Street, Melbourne VIC 3000
                </p>

                <div class="mt-uui-6 flex items-center justify-between">
                    <Logo />
                    <div class="flex items-center gap-uui-4 text-gray-400">
                        <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path :d="s.path" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
