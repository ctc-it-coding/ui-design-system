<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import Button from '@/Components/Button.vue';
import InputField from '@/Components/InputField.vue';
import FictionalCompanyLogo from '@/Components/FictionalCompanyLogo.vue';

const newsletterEmail = ref('');

const trustLogos = ['Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank'] as const;

const features = [
    { title: 'Unlimited cards', body: 'Give your team the autonomy they need with access to as many cards as they need. Authorise purchases with a click. Simple.' },
    { title: 'Easy expense policies', body: 'Every card comes with configurable spending limits, purchase restrictions, and cancellations for each employee and team.' },
    { title: 'Advanced analytics', body: 'An all-in-one platform that helps you balance everything your team need to be happy and your finances in order.' },
];

const basicFeatures = ['Access to all basic features', 'Basic reporting and analytics', 'Up to 10 individual users', '20GB individual data each user', 'Basic chat and email support'];
const businessFeatures = ['200+ integrations', 'Advanced reporting and analytics', 'Up to 20 individual users', '40GB individual data each user', 'Priority chat and email support'];
const enterpriseFeatures = ['Advanced custom fields', 'Audit log and data history', 'Unlimited individual users', 'Unlimited individual data', 'Personalised+priority service'];

const finance3 = [
    { title: 'Share team inboxes', body: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
    { title: 'Deliver instant answers', body: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.' },
    { title: 'Manage your team with reports', body: 'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.' },
];

const integrations = [
    { name: 'Notion', color: 'bg-gray-900', letter: 'N' },
    { name: 'Slack', color: 'bg-purple-500', letter: 'S' },
    { name: 'Google Drive', color: 'bg-blue-500', letter: 'G' },
    { name: 'Intercom', color: 'bg-blue-400', letter: 'I' },
    { name: 'Jira', color: 'bg-blue-600', letter: 'J' },
    { name: 'Dropbox', color: 'bg-blue-500', letter: 'D' },
];

const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const footerNav = ['Overview', 'Features', 'Pricing', 'Careers', 'Help', 'Privacy'];
</script>

<template>
    <Head title="Simple banking that works like magic" />

    <div class="min-h-screen bg-white">
        <!-- ========== Dark hero (with nav) ========== -->
        <div class="relative overflow-hidden bg-gray-900">
            <!-- Decorative gradient -->
            <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-60" style="background: radial-gradient(ellipse at 70% 80%, rgba(124,58,237,0.5), transparent 60%), radial-gradient(ellipse at 90% 50%, rgba(244,114,182,0.3), transparent 50%)" />

            <header class="relative">
                <div class="mx-auto flex max-w-uui-container-desktop items-center justify-between px-uui-8 py-uui-5">
                    <div class="flex items-center gap-uui-10">
                        <Logo dark-mode />
                        <nav class="hidden items-center gap-uui-8 text-md-semibold text-gray-300 md:flex">
                            <a href="#" class="hover:text-white">Home</a>
                            <a href="#" class="inline-flex items-center gap-1 hover:text-white">Products
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                            </a>
                            <a href="#" class="inline-flex items-center gap-1 hover:text-white">Resources
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                            </a>
                            <a href="#" class="hover:text-white">Pricing</a>
                        </nav>
                    </div>
                    <div class="flex items-center gap-uui-3">
                        <button type="button" class="text-md-semibold text-gray-300 hover:text-white">Log in</button>
                        <Button hierarchy="primary" size="md">Sign up</Button>
                    </div>
                </div>
            </header>

            <section class="relative mx-auto max-w-uui-container-desktop px-uui-8 pb-uui-24 pt-uui-12 text-center">
                <p class="text-md-semibold text-brand-300">Super. Simple. Banking.</p>
                <h1 class="mt-uui-3 text-display-2xl-semibold text-white">
                    Simple banking that<br />works like magic.
                </h1>
                <p class="mt-uui-5 text-xl-regular text-gray-300">
                    Simple, transparent banking. No hidden fees and free overdrafts.
                </p>
                <div class="mt-uui-8 flex items-center justify-center gap-uui-3">
                    <button type="button" class="rounded-uui-md border border-white/30 bg-transparent px-uui-4 py-uui-2 text-md-semibold text-white hover:bg-white/10">Demo</button>
                    <Button hierarchy="primary" size="md">Sign up</Button>
                </div>

                <!-- Floating cards -->
                <div class="relative mt-uui-12 mx-auto h-[300px] max-w-[640px]">
                    <div class="absolute left-[10%] top-0 h-[200px] w-[320px] -rotate-6 overflow-hidden rounded-uui-2xl bg-gradient-to-br from-gray-100 to-gray-300 shadow-uui-xl">
                        <div class="p-uui-5 text-gray-900">
                            <p class="text-md-semibold">Untitled</p>
                            <p class="mt-uui-12 text-sm-regular text-gray-700">PHOENIX BAKER</p>
                            <p class="text-md-semibold tracking-widest">1234 1234 1234 1234</p>
                        </div>
                    </div>
                    <div class="absolute left-[40%] top-[40px] h-[200px] w-[320px] rotate-3 overflow-hidden rounded-uui-2xl bg-gradient-to-br from-gray-200 to-gray-400 shadow-uui-xl">
                        <div class="p-uui-5 text-gray-900">
                            <p class="text-md-semibold">Untitled</p>
                            <p class="mt-uui-12 text-sm-regular text-gray-700">OLIVIA RHYE</p>
                            <p class="text-md-semibold tracking-widest">1234 1234 1234 1234</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- ========== Features ========== -->
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
                    <div v-for="f in features" :key="f.title" class="flex gap-uui-4">
                        <div class="flex size-10 shrink-0 items-center justify-center rounded-uui-lg bg-brand-50 text-brand-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        </div>
                        <div>
                            <h3 class="text-lg-semibold text-gray-900">{{ f.title }}</h3>
                            <p class="mt-uui-2 text-md-regular text-gray-600">{{ f.body }}</p>
                            <a href="#" class="mt-uui-3 inline-flex items-center gap-2 text-md-semibold text-brand-700 hover:text-brand-800">Learn more
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

        <!-- ========== Pricing 3 plans ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Pricing</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Simple, transparent pricing
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                We believe Untitled should be accessible to all companies, no
                matter the size.
            </p>

            <div class="mt-uui-16 grid items-start gap-uui-8 md:grid-cols-3">
                <!-- Basic -->
                <div class="flex flex-col rounded-uui-2xl border border-gray-200 bg-white p-uui-8 text-center shadow-uui-sm">
                    <p class="text-display-xl-semibold text-gray-900">$10<span class="text-md-medium text-gray-600">/mth</span></p>
                    <p class="mt-uui-3 text-lg-semibold text-gray-900">Basic plan</p>
                    <p class="mt-uui-1 text-sm-regular text-gray-600">Billed annually.</p>
                    <ul class="mt-uui-8 flex flex-col gap-uui-4 text-left">
                        <li v-for="i in basicFeatures" :key="i" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                            <span class="text-success-600" v-html="checkIcon" />{{ i }}
                        </li>
                    </ul>
                    <Button hierarchy="primary" size="lg" class="mt-uui-8 w-full justify-center">Get started</Button>
                </div>
                <!-- Business (most popular) -->
                <div class="relative flex flex-col rounded-uui-2xl border-2 border-brand-600 bg-white p-uui-8 text-center shadow-uui-lg">
                    <span class="absolute -top-uui-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-50 px-uui-3 py-uui-1 text-sm-medium text-brand-700">↳ Most popular!</span>
                    <p class="text-display-xl-semibold text-gray-900">$20<span class="text-md-medium text-gray-600">/mth</span></p>
                    <p class="mt-uui-3 text-lg-semibold text-gray-900">Business plan</p>
                    <p class="mt-uui-1 text-sm-regular text-gray-600">Billed annually.</p>
                    <ul class="mt-uui-8 flex flex-col gap-uui-4 text-left">
                        <li v-for="i in businessFeatures" :key="i" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                            <span class="text-success-600" v-html="checkIcon" />{{ i }}
                        </li>
                    </ul>
                    <Button hierarchy="primary" size="lg" class="mt-uui-8 w-full justify-center">Get started</Button>
                </div>
                <!-- Enterprise -->
                <div class="flex flex-col rounded-uui-2xl border border-gray-200 bg-white p-uui-8 text-center shadow-uui-sm">
                    <p class="text-display-xl-semibold text-gray-900">$40<span class="text-md-medium text-gray-600">/mth</span></p>
                    <p class="mt-uui-3 text-lg-semibold text-gray-900">Enterprise plan</p>
                    <p class="mt-uui-1 text-sm-regular text-gray-600">Billed annually.</p>
                    <ul class="mt-uui-8 flex flex-col gap-uui-4 text-left">
                        <li v-for="i in enterpriseFeatures" :key="i" class="flex items-start gap-uui-3 text-md-regular text-gray-600">
                            <span class="text-success-600" v-html="checkIcon" />{{ i }}
                        </li>
                    </ul>
                    <Button hierarchy="primary" size="lg" class="mt-uui-8 w-full justify-center">Get started</Button>
                </div>
            </div>
        </section>

        <!-- ========== 3-col features (gray) ========== -->
        <section class="bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
                <div class="grid gap-uui-10 md:grid-cols-3">
                    <div v-for="f in finance3" :key="f.title" class="flex flex-col items-center text-center">
                        <div class="flex size-12 items-center justify-center rounded-uui-lg bg-white text-brand-600 shadow-uui-xs">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <h3 class="mt-uui-5 text-lg-semibold text-gray-900">{{ f.title }}</h3>
                        <p class="mt-uui-2 text-md-regular text-gray-600">{{ f.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== All-in-one finance ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24">
            <p class="text-md-semibold text-brand-700">Features</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                All-in-one finance for any business
            </h2>
            <p class="mt-uui-5 max-w-[768px] text-xl-regular text-gray-600">
                Get a deposit account, credit card, and spend management software—in one refreshingly easy solution. No fees or minimums.
            </p>

            <div class="mt-uui-16 grid items-center gap-uui-16 md:grid-cols-2">
                <div class="flex flex-col gap-uui-8">
                    <div v-for="f in finance3" :key="f.title">
                        <h3 class="text-lg-semibold text-gray-900">{{ f.title }}</h3>
                        <p class="mt-uui-2 text-md-regular text-gray-600">{{ f.body }}</p>
                        <a href="#" class="mt-uui-3 inline-flex items-center gap-2 text-md-semibold text-brand-700">Learn more
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
                <div class="aspect-square w-full overflow-hidden rounded-uui-2xl bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1024" alt="Mobile preview" class="size-full object-cover" />
                </div>
            </div>
        </section>

        <!-- ========== Get more value (integrations 6) ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-24 text-center">
            <p class="text-md-semibold text-brand-700">Integrations</p>
            <h2 class="mt-uui-3 text-display-lg-semibold text-gray-900">
                Get more value from your tools
            </h2>
            <p class="mt-uui-5 mx-auto max-w-[768px] text-xl-regular text-gray-600">
                Connect your tools, connect your teams. With over 100 apps already
                available in our directory, your teams' favourite tools are just a
                click away.
            </p>

            <div class="mt-uui-16 grid gap-uui-8 text-left md:grid-cols-3">
                <div v-for="ig in integrations" :key="ig.name" class="rounded-uui-2xl border border-gray-200 bg-white p-uui-6 shadow-uui-sm">
                    <div :class="['flex size-12 items-center justify-center rounded-uui-lg text-lg-semibold text-white', ig.color]">{{ ig.letter }}</div>
                    <h3 class="mt-uui-5 text-lg-semibold text-gray-900">{{ ig.name }} integration</h3>
                    <p class="mt-uui-2 text-md-regular text-gray-600">
                        Work faster and smarter by integrating directly with {{ ig.name }}, right in the app.
                    </p>
                    <a href="#" class="mt-uui-5 inline-flex items-center gap-2 text-md-semibold text-brand-700">View integration
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- ========== Trust ========== -->
        <section class="bg-gray-50">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-12">
                <p class="text-center text-md-medium text-gray-600">Trusted by 4,000+ companies</p>
                <div class="mt-uui-6 grid grid-cols-2 items-center gap-uui-8 sm:grid-cols-3 md:grid-cols-5">
                    <div v-for="l in trustLogos" :key="l" class="flex items-center justify-center text-gray-700">
                        <FictionalCompanyLogo :company="l" logotype />
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== Banner CTA ========== -->
        <section class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-12">
            <div class="flex flex-col items-start gap-uui-6 rounded-uui-2xl bg-brand-600 p-uui-12 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-display-sm-semibold text-white">Start your 30-day free trial</h2>
                    <p class="mt-uui-2 text-md-regular text-brand-200">Join over 4,000+ startups already growing with Untitled.</p>
                </div>
                <div class="flex gap-uui-3">
                    <button type="button" class="rounded-uui-md border border-white/30 bg-transparent px-uui-4 py-uui-2 text-md-semibold text-white hover:bg-white/10">Learn more</button>
                    <button type="button" class="rounded-uui-md bg-white px-uui-4 py-uui-2 text-md-semibold text-brand-700 hover:bg-gray-50">Get started</button>
                </div>
            </div>
        </section>

        <!-- ========== Footer ========== -->
        <footer class="border-t border-gray-200 bg-white">
            <div class="mx-auto max-w-uui-container-desktop px-uui-8 py-uui-12">
                <div class="flex flex-col gap-uui-8 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Logo />
                        <nav class="mt-uui-8 flex flex-wrap items-center gap-uui-6 text-md-semibold text-gray-600">
                            <a v-for="l in footerNav" :key="l" href="#" class="hover:text-gray-900">{{ l }}</a>
                        </nav>
                    </div>
                    <div>
                        <p class="text-sm-semibold text-gray-900">Stay up to date</p>
                        <form class="mt-uui-3 flex gap-uui-3" @submit.prevent>
                            <div class="w-[280px]">
                                <InputField v-model="newsletterEmail" type="email" placeholder="Enter your email" />
                            </div>
                            <Button hierarchy="primary" size="md">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div class="mt-uui-12 flex items-center justify-between border-t border-gray-200 pt-uui-6">
                    <p class="text-md-regular text-gray-500">© 2077 Untitled UI. All rights reserved.</p>
                    <nav class="flex items-center gap-uui-6 text-md-regular text-gray-500">
                        <a href="#" class="hover:text-gray-700">Terms</a>
                        <a href="#" class="hover:text-gray-700">Privacy</a>
                        <a href="#" class="hover:text-gray-700">Cookies</a>
                    </nav>
                </div>
            </div>
        </footer>
    </div>
</template>
