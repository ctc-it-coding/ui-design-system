<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
</script>

<template>
    <Head title="Welcome email" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header: logo + nav -->
            <header class="flex flex-col gap-uui-8">
                <Logo />
                <nav class="flex items-center gap-uui-6 text-md-semibold text-gray-900">
                    <a href="#" class="hover:text-brand-700">Home</a>
                    <a href="#" class="hover:text-brand-700">Blog</a>
                    <a href="#" class="hover:text-brand-700">Tutorials</a>
                    <a href="#" class="hover:text-brand-700">Support</a>
                </nav>
            </header>

            <!-- Body -->
            <section class="mt-uui-12 flex flex-col gap-uui-6 text-md-regular text-gray-700">
                <p>Hi Olivia,</p>
                <p>
                    We’re glad to have you onboard! You’re already on your way to
                    creating beautiful visual products.
                </p>
                <p>
                    Whether you’re here for your brand, for a cause, or just for
                    fun — welcome! If there’s anything you need, we’ll be here
                    every step of the way.
                </p>
                <p>
                    Thanks,<br />
                    The team
                </p>
            </section>

            <div class="mt-uui-8">
                <Button hierarchy="primary" size="lg">Log in</Button>
            </div>

            <!-- Footer text -->
            <footer class="mt-uui-16 flex flex-col gap-uui-6">
                <p class="text-sm-regular text-gray-600">
                    This email was sent to
                    <a
                        href="mailto:olivia@untitledui.com"
                        class="text-brand-700 underline"
                        >olivia@untitledui.com</a
                    >. If you'd rather not receive this kind of email, you can
                    <a href="#" class="text-brand-700 underline">unsubscribe</a>
                    or
                    <a href="#" class="text-brand-700 underline"
                        >manage your email preferences</a
                    >.
                </p>
                <p class="text-sm-regular text-gray-600">
                    © 2077 Untitled UI, 100 Smith Street, Melbourne VIC 3000
                </p>

                <div class="mt-uui-6 flex items-center justify-between">
                    <Logo />
                    <div class="flex items-center gap-uui-4 text-gray-400">
                        <a href="#" aria-label="X (Twitter)" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook" class="hover:text-gray-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
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
