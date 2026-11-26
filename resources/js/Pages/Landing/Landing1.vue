<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
import InputField from '@/Components/InputField.vue';
import Badge from '@/Components/Badge.vue';
import FictionalCompanyLogo from '@/Components/FictionalCompanyLogo.vue';
import { ref } from 'vue';

const newsletterEmail = ref('');

const trustLogos = ['Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank'] as const;

const features = [
    { title: 'Share team inboxes', body: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop." },
    { title: 'Deliver instant answers', body: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.' },
    { title: 'Manage your team with reports', body: 'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.' },
];

const finance4 = [features[0], features[0], features[0], features[0]];

const basicFeatures = [
    'Access to basic features',
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

const footerColumns = [
    { title: 'Product', links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing', 'Releases'] },
    { title: 'Company', links: ['About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact'] },
    { title: 'Resources', links: ['Blog', 'Newsletter', 'Events', 'Help centre', 'Tutorials', 'Support'] },
    { title: 'Use cases', links: ['Startups', 'Enterprise', 'Government', 'SaaS', 'Marketplaces', 'Ecommerce'] },
    { title: 'Social', links: ['Twitter', 'LinkedIn', 'Facebook', 'GitHub', 'AngelList', 'Dribbble'] },
    { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings', 'Contact'] },
];

const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
</script>

<template>
    <Head title="Untitled" />

    <div class="min-h-screen bg-white">
        <!-- ===================== Top nav ===================== -->
        <header class="border-b border-gray-200">
            <div class="mx-auto flex max-w-uui-container-desktop items-center justify-between px-uui-8 py-uui-5">
                <div class="flex items-center gap-uui-10">
                    <Logo />
                    <nav class="hidden items-center gap-uui-8 text-md-semibold text-gray-700 md:flex">
                        <a href="#" class="hover:text-gray-900">Products</a>
                        <a href="#" class="hover:text-gray-900">Resources</a>
                        <a href="#" class="hover:text-gray-900">Pricing</a>
                    </nav>
                </div>
                <div class="flex items-center gap-uui-3">
                    <Button hierarchy="link-gray" size="md">Log in</Button>
                    <Button hierarchy="primary" size="md">Sign up</Button>
                </div>
            </div>
        </header>

        <!-- ===================== Hero ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <div class="grid items-center gap-uui-16 md:grid-cols-2">
                <div>
                    <h1 class="text-display-2xl-semibold text-gray-900">
                        Simple, transparent business credit cards
                    </h1>
                    <p class="mt-uui-6 text-xl-regular text-gray-600">
                        No money, no problems. Untitled is a next-generation
                        financial technology company in the process of
                        reinventing banking, 30-day free trial.
                    </p>
                    <div class="mt-uui-12 flex items-center gap-uui-3">
                        <Button hierarchy="secondary-gray" size="xl">Demo</Button>
                        <Button hierarchy="primary" size="xl">Sign up</Button>
                    </div>
                </div>
                <div class="aspect-square w-full overflow-hidden rounded-uui-2xl bg-brand-50">
                    <img
                        src="https://images.unsplash.com/photo-1580508174046-170816f65662?w=1024"
                        alt="Cards"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        </section>

        <!-- ===================== Trust ===================== -->
        <section class="border-y border-gray-200 bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-16">
                <p class="text-center text-md-medium text-gray-600">
                    Trusted by 4,000+ companies
                </p>
                <div class="mt-uui-8 grid grid-cols-2 items-center gap-uui-8 sm:grid-cols-3 md:grid-cols-5">
                    <div v-for="l in trustLogos" :key="l" class="flex items-center justify-center text-gray-700">
                        <FictionalCompanyLogo :company="l" logotype />
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================== Features 1 ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Features</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                The only card you’ll ever need. Simple.
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                Spend smarter, lower your bills, get cashback on everything you
                buy, and unlock credit to grow your business.
            </p>

            <div class="mt-uui-16 grid items-center gap-uui-16 md:grid-cols-2">
                <div class="flex flex-col gap-uui-10">
                    <div v-for="f in features" :key="f.title">
                        <h3 class="text-lg-semibold text-gray-900">{{ f.title }}</h3>
                        <p class="mt-uui-2 text-md-regular text-gray-600">{{ f.body }}</p>
                        <a href="#" class="mt-uui-4 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">
                            Learn more
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
                <div class="aspect-square w-full overflow-hidden rounded-uui-2xl bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1024" alt="Card" class="size-full object-cover" />
                </div>
            </div>
        </section>

        <!-- ===================== Pricing plans that scale ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Upgrade</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Pricing plans that scale
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                Simple, transparent pricing that grows with you. Try any plan
                free for 30 days.
            </p>

            <div class="mt-uui-16 grid gap-uui-8 md:grid-cols-2">
                <div v-for="(plan, i) in [{ name: 'Basic plan', price: 10, items: basicFeatures }, { name: 'Business plan', price: 20, items: businessFeatures }]" :key="i" class="flex flex-col rounded-uui-2xl border border-gray-200 p-uui-8 shadow-uui-sm">
                    <h3 class="text-lg-semibold text-gray-900">{{ plan.name }}</h3>
                    <p class="mt-uui-2 text-sm-regular text-gray-600">Billed annually.</p>
                    <p class="mt-uui-6 text-display-xl-semibold text-gray-900">${{ plan.price }}<span class="text-md-medium text-gray-600">/mth</span></p>
                    <ul class="mt-uui-8 flex flex-col gap-uui-4">
                        <li v-for="item in plan.items" :key="item" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                            <span class="text-success-600" v-html="checkIcon" />
                            {{ item }}
                        </li>
                    </ul>
                    <Button hierarchy="primary" size="lg" class="mt-uui-8 w-full justify-center">Get started</Button>
                </div>
            </div>
        </section>

        <!-- ===================== Get your finances right (4 col) ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Why us?</p>
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
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

        <!-- ===================== All-in-one finance (phones) ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24 text-center">
            <p class="text-md-semibold text-brand-700">Features</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                All-in-one finance for any business
            </h2>
            <p class="mt-uui-5 mx-auto max-w-[768px] text-xl-regular text-gray-600">
                Get a deposit account, credit card, and spend management software—in one refreshingly easy solution. No fees or minimums.
            </p>
            <div class="mt-uui-16 aspect-[1216/600] w-full overflow-hidden rounded-uui-2xl bg-gray-100">
                <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1600" alt="Mobile preview" class="size-full object-cover" />
            </div>

            <div class="mt-uui-16 grid gap-uui-8 text-left md:grid-cols-3">
                <div v-for="i in 3" :key="i">
                    <h3 class="text-lg-semibold text-gray-900">Share team inboxes</h3>
                    <p class="mt-uui-2 text-md-regular text-gray-600">
                        Whether you have a team of 2 or 200, our shared team
                        inboxes keep everyone on the same page and in the loop.
                    </p>
                </div>
            </div>
        </section>

        <!-- ===================== All-in-one finance (dashboard) ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24 text-center">
            <p class="text-md-semibold text-brand-700">Features</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                All-in-one finance for any business
            </h2>
            <p class="mt-uui-5 mx-auto max-w-[768px] text-xl-regular text-gray-600">
                Get a deposit account, credit card, and spend management software—in one refreshingly easy solution. No fees or minimums.
            </p>
            <div class="mt-uui-16 aspect-[1216/680] w-full overflow-hidden rounded-uui-2xl border border-gray-200 bg-white shadow-uui-lg">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600" alt="Dashboard preview" class="size-full object-cover" />
            </div>
        </section>

        <!-- ===================== CTA: free trial ===================== -->
        <section class="bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24 text-center">
                <h2 class="text-display-md-semibold text-gray-900">Start your free trial</h2>
                <p class="mt-uui-5 text-xl-regular text-gray-600">
                    Join over 4,000+ startups already growing with Untitled.
                </p>
                <div class="mt-uui-10 flex items-center justify-center gap-uui-3">
                    <Button hierarchy="secondary-gray" size="xl">Learn more</Button>
                    <Button hierarchy="primary" size="xl">Get started</Button>
                </div>
            </div>
        </section>

        <!-- ===================== Pricing as simple as our cards ===================== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Upgrade</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Pricing as simple as our cards
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                Simple, transparent pricing that grows with you. Try any plan
                free for 30 days.
            </p>

            <div class="mt-uui-16 grid gap-uui-8 rounded-uui-2xl border border-gray-200 p-uui-12 shadow-uui-sm md:grid-cols-2">
                <div class="flex flex-col gap-uui-8">
                    <div>
                        <h3 class="text-lg-semibold text-gray-900">Basic plan</h3>
                        <p class="mt-uui-2 text-md-regular text-gray-600">Our most popular plan for small teams.</p>
                    </div>
                    <div v-for="f in features" :key="f.title">
                        <h4 class="text-md-semibold text-gray-900">{{ f.title }}</h4>
                        <p class="mt-uui-1 text-md-regular text-gray-600">{{ f.body }}</p>
                    </div>
                </div>
                <div class="flex flex-col gap-uui-6 rounded-uui-xl bg-gray-50 p-uui-8">
                    <p class="text-display-xl-semibold text-gray-900 text-right">$10<span class="text-md-medium text-gray-600"> per month</span></p>
                    <p class="text-md-semibold text-gray-900">FEATURES</p>
                    <p class="text-md-regular text-gray-600">Everything in our free plan plus...</p>
                    <ul class="flex flex-col gap-uui-4">
                        <li v-for="item in basicFeatures" :key="item" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                            <span class="text-success-600" v-html="checkIcon" />
                            {{ item }}
                        </li>
                    </ul>
                    <Button hierarchy="primary" size="lg" class="w-full justify-center">Get started</Button>
                </div>
            </div>
        </section>

        <!-- ===================== Banner CTA: 30-day trial ===================== -->
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
                    <Button hierarchy="secondary-gray" size="lg">Learn more</Button>
                    <Button hierarchy="primary" size="lg">Get started</Button>
                </div>
            </div>
        </section>

        <!-- ===================== Footer ===================== -->
        <footer class="border-t border-gray-200 bg-white">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-16">
                <!-- Newsletter -->
                <div class="flex flex-col items-start justify-between gap-uui-8 border-b border-gray-200 pb-uui-12 md:flex-row md:items-center">
                    <div>
                        <h3 class="text-lg-semibold text-gray-900">Join our newsletter</h3>
                        <p class="mt-uui-2 text-md-regular text-gray-600">Stay up to date with the roadmap progress, announcements and exclusive discounts.</p>
                    </div>
                    <form class="flex w-full max-w-[400px] items-end gap-uui-4" @submit.prevent>
                        <div class="flex-1">
                            <InputField v-model="newsletterEmail" type="email" placeholder="Enter your email" />
                        </div>
                        <Button hierarchy="primary" size="md">Subscribe</Button>
                    </form>
                </div>

                <!-- Link columns -->
                <div class="mt-uui-12 grid gap-uui-8 md:grid-cols-[1.5fr_repeat(6,1fr)]">
                    <div>
                        <Logo />
                        <p class="mt-uui-8 text-md-regular text-gray-600">Design-amazing digital experiences that create more happy in the world.</p>
                    </div>
                    <div v-for="col in footerColumns" :key="col.title">
                        <p class="text-sm-semibold text-gray-500">{{ col.title }}</p>
                        <ul class="mt-uui-4 flex flex-col gap-uui-3">
                            <li v-for="link in col.links" :key="link">
                                <a href="#" class="text-md-semibold text-gray-700 hover:text-gray-900">{{ link }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-uui-12 flex items-center justify-between border-t border-gray-200 pt-uui-8">
                    <p class="text-md-regular text-gray-500">© 2077 Untitled UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
