<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
</script>

<template>
    <Head title="Welcome to Untitled" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header -->
            <header>
                <Logo />
            </header>

            <!-- Video player mock -->
            <div class="mt-uui-12 relative aspect-[504/360] w-full overflow-hidden rounded-uui-md bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1024"
                    alt="Intro video"
                    class="size-full object-cover opacity-90"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="flex size-16 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                        </svg>
                    </div>
                </div>
                <div class="absolute inset-x-0 bottom-0 flex items-center gap-3 px-uui-6 py-uui-4 text-white">
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

            <!-- Heading + body centered -->
            <h1 class="mt-uui-12 text-center text-display-sm-semibold text-gray-900">
                Welcome to Untitled!
            </h1>
            <p class="mt-uui-6 text-center text-md-regular text-gray-700">
                Hi Olivia, thanks for checking out Untitled. Here are a few tips
                to help you get up and running as soon as possible. If you have
                any questions, just reply to this email — we’ll be happy to hear
                from you!
            </p>

            <!-- Buttons centered -->
            <div class="mt-uui-8 flex items-center justify-center gap-uui-3">
                <Button hierarchy="secondary-gray" size="lg">
                    <template #leading>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                        </svg>
                    </template>
                    Watch intro
                </Button>
                <Button hierarchy="primary" size="lg">Log in</Button>
            </div>

            <!-- Divider -->
            <div class="mt-uui-12 border-t border-gray-200" />

            <!-- Footer centered -->
            <footer class="mt-uui-8 flex flex-col items-center gap-uui-6 text-center">
                <p class="text-sm-regular text-gray-600">
                    You’re receiving this email because you subscribed to receive
                    marketing emails. If you’d prefer to not receive these emails,
                    please
                    <a href="#" class="text-brand-700 underline">unsubscribe</a>.
                </p>

                <nav class="flex items-center gap-uui-6 text-sm-semibold text-gray-700">
                    <a href="#" class="hover:text-gray-900">Terms</a>
                    <a href="#" class="hover:text-gray-900">Privacy</a>
                    <a href="#" class="hover:text-gray-900">Cookies</a>
                    <a href="#" class="hover:text-gray-900">Contact us</a>
                </nav>

                <p class="text-sm-regular text-gray-600">
                    © 2077 Untitled UI<br />
                    100 Smith Street, Melbourne VIC 3000
                </p>
            </footer>
        </div>
    </div>
</template>
