<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import MobileAppStoreBadge from '@/Components/MobileAppStoreBadge.vue';
</script>

<template>
    <Head title="Welcome to Untitled" />

    <div class="min-h-screen bg-gray-100 py-uui-12">
        <div class="mx-auto max-w-[600px] bg-white px-uui-12 py-uui-12 shadow-uui-sm">
            <!-- Header centered -->
            <header class="flex justify-center">
                <Logo />
            </header>

            <!-- Hero image -->
            <div class="mt-uui-12 aspect-[504/420] w-full overflow-hidden rounded-uui-md bg-gray-100">
                <img
                    src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1024"
                    alt="Mobile app preview"
                    class="size-full object-cover"
                />
            </div>

            <!-- Heading centered -->
            <h1 class="mt-uui-12 text-center text-display-sm-semibold text-gray-900">
                Welcome to Untitled!
            </h1>
            <p class="mt-uui-6 text-center text-md-regular text-gray-700">
                Hi Olivia, thanks for checking out Untitled. Get the most of
                Untitled by installing our new mobile app.
            </p>

            <!-- Store badges centered -->
            <div class="mt-uui-8 flex items-center justify-center gap-uui-3">
                <MobileAppStoreBadge store="app-store" size="md" style-variant="brand" />
                <MobileAppStoreBadge store="google-play" size="md" style-variant="brand" />
            </div>

            <p class="mt-uui-8 text-center text-md-regular text-gray-700">
                If you have any questions, just reply to this email — we’ll be
                happy to hear from you!
            </p>

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
