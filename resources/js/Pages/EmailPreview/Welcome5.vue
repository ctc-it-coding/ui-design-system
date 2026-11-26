<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import MobileAppStoreBadge from '@/Components/MobileAppStoreBadge.vue';

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
    <Head title="Welcome to Untitled" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header (centered) -->
            <header class="flex justify-center">
                <Logo />
            </header>

            <!-- Body -->
            <section class="mt-uui-12 flex flex-col gap-uui-6 text-md-regular text-gray-700">
                <p>Hi Olivia,</p>
                <p>
                    Welcome to Untitled! You’re already on your way to creating
                    beautiful visual products.
                </p>
                <p>
                    We’ve created a quick intro video to get you up and running
                    as soon as possible. If you have any questions,
                    <a href="#" class="text-gray-700 underline">please get in touch</a>.
                </p>
            </section>

            <!-- Video player mock -->
            <div class="mt-uui-8 relative aspect-[504/284] w-full overflow-hidden rounded-uui-md bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1024"
                    alt="Intro video"
                    class="size-full object-cover opacity-90"
                />
                <!-- Play button -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="flex size-16 items-center justify-center rounded-full bg-white/80 text-gray-900 backdrop-blur">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                        </svg>
                    </div>
                </div>
                <!-- Bottom controls -->
                <div class="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 py-3 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                    <span class="text-xs-medium">0:00</span>
                    <div class="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                        <div class="h-full w-[2%] bg-white" />
                    </div>
                    <span class="text-xs-medium">8:24</span>
                </div>
            </div>

            <p class="mt-uui-8 text-md-regular text-gray-700">
                Thanks,<br />
                The team
            </p>

            <!-- Download the app -->
            <div class="mt-uui-16 flex flex-col items-center text-center">
                <h3 class="text-lg-semibold text-gray-900">Download the app</h3>
                <p class="mt-uui-2 text-md-regular text-gray-600">
                    Get the most of Untitled by installing our new mobile app.
                </p>
                <div class="mt-uui-6 flex items-center gap-uui-3">
                    <MobileAppStoreBadge store="app-store" size="md" style-variant="brand" />
                    <MobileAppStoreBadge store="google-play" size="md" style-variant="brand" />
                </div>
            </div>

            <!-- Social row centered -->
            <div class="mt-uui-8 flex items-center justify-center gap-uui-4 text-gray-400">
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

            <!-- Footer text centered -->
            <footer class="mt-uui-8 flex flex-col items-center gap-uui-4 text-center text-sm-regular text-gray-600">
                <p>
                    Untitled is committed to sustainable building. This email was
                    sent with 200% carbon offset. If you’d prefer to not receive
                    these emails, please
                    <a href="#" class="text-brand-700 underline">unsubscribe</a>.
                </p>
                <p>
                    © 2077 Untitled UI<br />
                    100 Smith Street, Melbourne VIC 3000
                </p>
            </footer>
        </div>
    </div>
</template>
