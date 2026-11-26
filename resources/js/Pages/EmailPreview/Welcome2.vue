<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';

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

const sections = [
    {
        title: 'Untitled changelog',
        body: 'Weekly new updates and improvements to Untitled.',
    },
    {
        title: 'Follow us on Twitter',
        body: 'Stay up-to-date with the latest announcements and jobs.',
    },
    {
        title: 'Why we’re building Untitled',
        body: 'Untitled is a new standard of design system and UI kit.',
    },
];
</script>

<template>
    <Head title="Welcome to Untitled" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header: logo + social row -->
            <header class="flex items-center justify-between">
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
            </header>

            <!-- Hero image -->
            <div class="mt-uui-12 aspect-[504/400] w-full overflow-hidden bg-gray-200">
                <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1024"
                    alt="Welcome"
                    class="size-full object-cover"
                />
            </div>

            <!-- Title + intro -->
            <h1 class="mt-uui-12 text-display-sm-semibold text-gray-900">
                Welcome to Untitled
            </h1>

            <div class="mt-uui-6 flex flex-col gap-uui-6 text-md-regular text-gray-700">
                <p>
                    We’re excited to welcome you to Untitled and we’re even more
                    excited about what we’ve got planned. You’re already on your
                    way to creating beautiful visual products.
                </p>
                <p>
                    Whether you’re here for your brand, for a cause, or just for
                    fun — welcome! If there’s anything you need, we’ll be here
                    every step of the way.
                </p>
            </div>

            <!-- Section list -->
            <div class="mt-uui-8 flex flex-col">
                <div
                    v-for="s in sections"
                    :key="s.title"
                    class="border-t border-gray-200 py-uui-6"
                >
                    <a
                        href="#"
                        class="inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800"
                    >
                        {{ s.title }}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                    <p class="mt-uui-2 text-md-regular text-gray-700">{{ s.body }}</p>
                </div>
                <div class="border-t border-gray-200" />
            </div>

            <!-- Sign-off -->
            <div class="mt-uui-6 flex flex-col gap-uui-6 text-md-regular text-gray-700">
                <p>
                    Thanks for signing up. If you have any questions, send us a
                    message at
                    <a href="mailto:hi@untitledui.com" class="text-brand-700 underline"
                        >hi@untitledui.com</a
                    >
                    or on
                    <a href="#" class="text-brand-700 underline">Twitter</a>. We’d
                    love to hear from you.
                </p>
                <p>— The team</p>
            </div>

            <div class="mt-uui-8">
                <Button hierarchy="primary" size="lg">Get started</Button>
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
