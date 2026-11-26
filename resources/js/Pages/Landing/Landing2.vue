<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
import InputField from '@/Components/InputField.vue';
import Badge from '@/Components/Badge.vue';
import BadgeGroup from '@/Components/BadgeGroup.vue';
import FictionalCompanyLogo from '@/Components/FictionalCompanyLogo.vue';
import MobileAppStoreBadge from '@/Components/MobileAppStoreBadge.vue';

const heroEmail = ref('');
const newsletterEmail = ref('');

const trustLogos = ['Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank', 'Nietzsche'] as const;

const features = [
    { title: 'Unlimited cards', body: 'Give your team the autonomy they need with access to as many cards as they need. Authorise purchases with a click.' },
    { title: 'Easy expense policies', body: 'Every card comes with configurable spending limits, purchase restrictions, and cancellations for each employee and team.' },
    { title: 'Advanced analytics', body: 'An all-in-one platform that helps you balance everything your team need to be happy and your finances in order.' },
];

const finance4 = [
    { title: 'Share team inboxes', body: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
    { title: 'Share team inboxes', body: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
    { title: 'Share team inboxes', body: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
    { title: 'Share team inboxes', body: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
];

const basicFeatures = [
    'Access to all basic features',
    'Basic reporting and analytics',
    'Up to 10 individual users',
    '20GB individual data each user',
    'Basic chat and email support',
];
const businessFeatures = [
    '200+ integrations',
    'Advanced reporting',
    'Up to 20 individual users',
    '40GB individual data each user',
    'Priority chat and email support',
];

const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const footerLinks = ['Overview', 'Features', 'Pricing', 'Careers', 'Help', 'Privacy'];

const socials = [
    { name: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Facebook', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
    { name: 'GitHub', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
];
</script>

<template>
    <Head title="Smart business credit cards" />

    <div class="min-h-screen bg-white">
        <!-- ========== Top nav ========== -->
        <header class="border-b border-gray-100">
            <div class="mx-auto flex max-w-uui-container-desktop items-center justify-between px-uui-8 py-uui-5">
                <div class="flex items-center gap-uui-10">
                    <Logo />
                    <nav class="hidden items-center gap-uui-8 text-md-semibold text-gray-700 md:flex">
                        <a href="#">Home</a>
                        <a href="#" class="inline-flex items-center gap-1">Products
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </a>
                        <a href="#" class="inline-flex items-center gap-1">Resources
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </a>
                        <a href="#">Pricing</a>
                    </nav>
                </div>
                <div class="flex items-center gap-uui-3">
                    <Button hierarchy="link-gray" size="md">Log in</Button>
                    <Button hierarchy="primary" size="md">Sign up</Button>
                </div>
            </div>
        </header>

        <!-- ========== Hero ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <div class="grid items-center gap-uui-16 md:grid-cols-2">
                <div>
                    <BadgeGroup color="primary" badge-text="We’re hiring!">
                        Join our remote team →
                    </BadgeGroup>
                    <h1 class="mt-uui-4 text-display-2xl-semibold text-gray-900">
                        Smart business credit cards
                    </h1>
                    <p class="mt-uui-6 text-xl-regular text-gray-600">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>
                    <form class="mt-uui-12 flex max-w-[480px] items-end gap-uui-4" @submit.prevent>
                        <div class="flex-1">
                            <InputField v-model="heroEmail" type="email" placeholder="Enter your email" />
                        </div>
                        <Button hierarchy="primary" size="md">Get started</Button>
                    </form>
                    <p class="mt-uui-3 text-sm-regular text-gray-500">
                        We care about your data in our
                        <a href="#" class="underline">privacy policy</a>.
                    </p>
                </div>
                <div class="aspect-square w-full overflow-hidden rounded-uui-2xl bg-brand-50">
                    <img src="https://images.unsplash.com/photo-1580508174046-170816f65662?w=1024" alt="Cards" class="size-full object-cover" />
                </div>
            </div>
        </section>

        <!-- ========== Trust ========== -->
        <section class="border-y border-gray-100 bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-16">
                <p class="text-center text-md-medium text-gray-600">
                    Join 4,000+ companies already growing
                </p>
                <div class="mt-uui-8 grid grid-cols-2 items-center gap-uui-8 sm:grid-cols-3 md:grid-cols-6">
                    <div v-for="l in trustLogos" :key="l" class="flex items-center justify-center text-gray-700">
                        <FictionalCompanyLogo :company="l" logotype />
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== Features ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Features</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Stop leaving money on the table
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                Spend smarter, lower your bills, get cashback on everything you
                buy, and unlock credit to grow your business.
            </p>

            <div class="mt-uui-16 grid items-center gap-uui-16 md:grid-cols-2">
                <div class="flex flex-col gap-uui-10">
                    <div v-for="f in features" :key="f.title" class="flex gap-uui-4">
                        <div class="flex size-10 shrink-0 items-center justify-center rounded-uui-lg bg-brand-50 text-brand-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div>
                            <h3 class="text-lg-semibold text-gray-900">{{ f.title }}</h3>
                            <p class="mt-uui-2 text-md-regular text-gray-600">{{ f.body }}</p>
                            <a href="#" class="mt-uui-3 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                                Learn more
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="aspect-square w-full overflow-hidden rounded-uui-2xl bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1024" alt="Cards" class="size-full object-cover" />
                </div>
            </div>
        </section>

        <!-- ========== No long-term contracts ========== -->
        <section class="bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
                <div class="grid items-center gap-uui-16 md:grid-cols-2">
                    <div>
                        <h2 class="text-display-lg-semibold text-gray-900">
                            No long-term contracts.<br />No catches.
                        </h2>
                        <p class="mt-uui-5 text-xl-regular text-gray-600">
                            Start your 30-day free trial today.
                        </p>
                        <div class="mt-uui-8 flex items-center gap-uui-3">
                            <Button hierarchy="secondary-gray" size="lg">Learn more</Button>
                            <Button hierarchy="primary" size="lg">Get started</Button>
                        </div>
                    </div>
                    <div class="relative aspect-square w-full">
                        <!-- Organic photo collage -->
                        <div class="absolute overflow-hidden rounded-uui-2xl bg-gray-200" style="left:12%;top:0;width:26%;height:26%">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" alt="" class="absolute inset-0 size-full object-cover" />
                        </div>
                        <div class="absolute overflow-hidden rounded-uui-2xl bg-gray-200" style="left:44%;top:6%;width:38%;height:38%">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" alt="" class="absolute inset-0 size-full object-cover" />
                        </div>
                        <div class="absolute overflow-hidden rounded-uui-2xl bg-gray-200" style="left:0;top:34%;width:34%;height:34%">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" alt="" class="absolute inset-0 size-full object-cover" />
                        </div>
                        <div class="absolute overflow-hidden rounded-uui-2xl bg-gray-200" style="left:38%;top:52%;width:40%;height:40%">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" alt="" class="absolute inset-0 size-full object-cover" />
                        </div>
                        <div class="absolute overflow-hidden rounded-uui-2xl bg-gray-200" style="left:80%;top:60%;width:20%;height:20%">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" alt="" class="absolute inset-0 size-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== Get your finances right ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Why switch?</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Get your finances right
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                We offer the best accounting and expense tracking for ambitious
                businesses.
            </p>

            <div class="mt-uui-16 grid gap-uui-8 md:grid-cols-4">
                <div v-for="(f, i) in finance4" :key="i" class="flex flex-col gap-uui-5">
                    <div class="flex size-12 items-center justify-center rounded-uui-lg bg-brand-50 text-brand-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <h3 class="text-lg-semibold text-gray-900">{{ f.title }}</h3>
                    <p class="text-md-regular text-gray-600">{{ f.body }}</p>
                    <a href="#" class="inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                        View integration
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- ========== Pricing ========== -->
        <section class="bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
                <p class="text-md-semibold text-brand-700">Pricing</p>
                <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                    Pricing plans that scale
                </h2>
                <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                    Simple, transparent pricing that grows with you. Try any plan
                    free for 30 days.
                </p>

                <div class="mt-uui-16 grid gap-uui-8 md:grid-cols-2">
                    <div v-for="(plan, i) in [{ name: 'Basic plan', price: 10, items: basicFeatures }, { name: 'Business plan', price: 20, items: businessFeatures }]" :key="i" class="flex flex-col rounded-uui-2xl border border-gray-200 bg-white p-uui-8 shadow-uui-sm">
                        <div class="flex size-12 items-center justify-center self-center rounded-uui-lg bg-brand-50 text-brand-600">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <h3 class="mt-uui-4 text-center text-lg-semibold text-gray-900">{{ plan.name }}</h3>
                        <p class="mt-uui-4 text-center text-display-xl-semibold text-gray-900">${{ plan.price }}<span class="text-md-medium text-gray-600">/mth</span></p>
                        <p class="mt-uui-2 text-center text-sm-regular text-gray-600">Billed annually.</p>
                        <ul class="mt-uui-8 flex flex-col gap-uui-4">
                            <li v-for="item in plan.items" :key="item" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                                <span class="text-success-600" v-html="checkIcon" />
                                {{ item }}
                            </li>
                        </ul>
                        <Button hierarchy="primary" size="lg" class="mt-uui-8 w-full justify-center">Get started</Button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== Newsletter still thinking ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <div class="rounded-uui-2xl bg-gray-50 p-uui-12 text-center">
                <h2 class="text-display-md-semibold text-gray-900">
                    Still thinking about it?
                </h2>
                <p class="mt-uui-3 text-md-regular text-gray-600">
                    Sign up for our newsletter and get 10% off your next purchase.
                </p>
                <form class="mx-auto mt-uui-8 flex max-w-[480px] items-end gap-uui-3" @submit.prevent>
                    <div class="flex-1">
                        <InputField v-model="newsletterEmail" type="email" placeholder="Enter your email" />
                    </div>
                    <Button hierarchy="primary" size="md">Subscribe</Button>
                </form>
                <p class="mt-uui-3 text-sm-regular text-gray-500">
                    We care about your data in our
                    <a href="#" class="underline">privacy policy</a>.
                </p>
            </div>
        </section>

        <!-- ========== Banner CTA purple ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 pb-uui-24">
            <div class="flex flex-col items-start gap-uui-6 rounded-uui-2xl bg-brand-600 p-uui-12 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-display-sm-semibold text-white">
                        Start your 30-day free trial
                    </h2>
                    <p class="mt-uui-2 text-md-regular text-brand-200">
                        Join over 4,000+ startups already growing with Untitled.
                    </p>
                </div>
                <div class="flex gap-uui-3">
                    <button type="button" class="rounded-uui-md border border-white/30 bg-transparent px-uui-4 py-uui-2 text-md-semibold text-white hover:bg-white/10">Learn more</button>
                    <button type="button" class="rounded-uui-md bg-white px-uui-4 py-uui-2 text-md-semibold text-brand-700 hover:bg-gray-50">Get started</button>
                </div>
            </div>
        </section>

        <!-- ========== Footer dark ========== -->
        <footer class="bg-gray-900">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-16">
                <div class="flex flex-col gap-uui-8 md:flex-row md:items-start md:justify-between">
                    <div>
                        <Logo dark-mode />
                        <p class="mt-uui-4 text-md-regular text-gray-400">
                            Banking technology that has your back.
                        </p>
                        <nav class="mt-uui-8 flex flex-wrap items-center gap-uui-6 text-md-semibold text-gray-400">
                            <a v-for="l in footerLinks" :key="l" href="#" class="hover:text-white">{{ l }}</a>
                        </nav>
                    </div>
                    <div class="flex flex-col items-start gap-uui-3">
                        <p class="text-sm-semibold text-white">Get the app</p>
                        <div class="flex gap-uui-3">
                            <MobileAppStoreBadge store="app-store" size="md" style-variant="brand" />
                            <MobileAppStoreBadge store="google-play" size="md" style-variant="brand" />
                        </div>
                    </div>
                </div>

                <div class="mt-uui-12 flex items-center justify-between border-t border-gray-700 pt-uui-8">
                    <p class="text-md-regular text-gray-400">© 2077 Untitled UI. All rights reserved.</p>
                    <div class="flex items-center gap-uui-4 text-gray-400">
                        <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="hover:text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path :d="s.path" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
