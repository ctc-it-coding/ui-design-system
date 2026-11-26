<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import Logo from '@/Components/Logo.vue';
import InputField from '@/Components/InputField.vue';
import Button from '@/Components/Button.vue';
import ButtonGroup from '@/Components/ButtonGroup.vue';
import ButtonGroupBase from '@/Components/ButtonGroupBase.vue';
import Avatar from '@/Components/Avatar.vue';
import Badge from '@/Components/Badge.vue';

const search = ref('');
const range = ref('12 months');
const ranges = ['12 months', '30 days', '7 days', '24 hours'];

const navItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Dashboard', icon: 'chart', active: true },
    { label: 'Projects', icon: 'layers' },
    { label: 'Tasks', icon: 'check' },
    { label: 'Reporting', icon: 'pie' },
    { label: 'Users', icon: 'users' },
];

const navIcons: Record<string, string> = {
    home: '<path d="M3 12 12 3l9 9M5 10v10h14V10"/>',
    chart: '<path d="M3 3v18h18M7 16V8m5 8V5m5 11v-3"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    check: '<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="9 12 11 14 15 10"/>',
    pie: '<path d="M21 15.5A10 10 0 1 1 8.5 3"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    support: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
};

const stats = [
    { label: 'Total members', value: '4,862', change: '9.2%' },
    { label: 'Paid members', value: '2,671', change: '6.6%' },
    { label: 'Email open rate', value: '82%', change: '8.1%' },
];

const topMembers = [
    { name: 'Phoenix Baker', since: 'Feb 2022', online: true },
    { name: 'Lana Steiner', since: 'Jan 2022', online: true },
    { name: 'Demi Wikinson', since: 'Mar 2022', online: true },
    { name: 'Candice Wu', since: 'Feb 2022', online: true },
    { name: 'Natali Craig', since: 'Mar 2022', online: true },
    { name: 'Orlando Diggs', since: 'Apr 2022', online: true },
    { name: 'Drew Cano', since: 'Apr 2022', online: true },
    { name: 'Kate Morrison', since: 'Jan 2022', online: true },
    { name: 'Koray Okumus', since: 'Feb 2022', online: true },
    { name: 'Ava Wright', since: 'Mar 2022', online: true },
];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
</script>

<template>
    <Head title="Dashboard" />

    <div class="flex min-h-screen bg-white">
        <!-- ========== Sidebar ========== -->
        <aside class="flex w-[280px] shrink-0 flex-col border-r border-gray-200">
            <div class="px-uui-6 pt-uui-8">
                <Logo />
            </div>

            <div class="px-uui-4 pt-uui-6">
                <InputField v-model="search" placeholder="Search">
                    <template #leading>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </template>
                </InputField>
            </div>

            <nav class="mt-uui-4 flex flex-col gap-uui-1 px-uui-4">
                <a v-for="n in navItems" :key="n.label" href="#"
                   :class="['flex items-center gap-uui-3 rounded-uui-md px-uui-3 py-uui-2 text-md-semibold', n.active ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50']">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="navIcons[n.icon]" />
                    {{ n.label }}
                </a>
            </nav>

            <div class="mt-auto flex flex-col gap-uui-1 px-uui-4">
                <a href="#" class="flex items-center gap-uui-3 rounded-uui-md px-uui-3 py-uui-2 text-md-semibold text-gray-700 hover:bg-gray-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                    Support
                </a>
                <a href="#" class="flex items-center gap-uui-3 rounded-uui-md px-uui-3 py-uui-2 text-md-semibold text-gray-700 hover:bg-gray-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg>
                    Settings
                </a>
            </div>

            <!-- New features card -->
            <div class="mx-uui-4 mt-uui-6 rounded-uui-2xl bg-gray-50 p-uui-4">
                <div class="flex items-start justify-between">
                    <p class="text-sm-semibold text-gray-700">New features available!</p>
                    <button type="button" class="text-gray-400 hover:text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
                <p class="mt-uui-1 text-sm-regular text-gray-600">
                    Check out the new dashboard view. Pages now load faster.
                </p>
                <div class="mt-uui-3 aspect-[2/1] overflow-hidden rounded-uui-lg bg-gray-200">
                    <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400" alt="" class="size-full object-cover" />
                </div>
                <div class="mt-uui-3 flex items-center gap-uui-3 text-sm-semibold">
                    <button type="button" class="text-gray-600 hover:text-gray-900">Dismiss</button>
                    <a href="#" class="text-brand-700 hover:text-brand-800">What's new?</a>
                </div>
            </div>

            <!-- User -->
            <div class="mt-uui-6 border-t border-gray-200 px-uui-4 py-uui-5">
                <div class="flex items-center gap-uui-3">
                    <Avatar size="md" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="Olivia" />
                    <div class="flex-1">
                        <p class="text-sm-semibold text-gray-700">Olivia Rhye</p>
                        <p class="text-sm-regular text-gray-600">olivia@untitledui.com</p>
                    </div>
                    <button type="button" class="text-gray-400 hover:text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </aside>

        <!-- ========== Main ========== -->
        <main class="flex-1 px-uui-8 py-uui-8">
            <div class="flex items-start justify-between gap-uui-6">
                <div class="flex-1">
                    <h1 class="text-display-sm-semibold text-gray-900">Dashboard</h1>

                    <!-- Time filter -->
                    <div class="mt-uui-6">
                        <div class="inline-flex rounded-uui-md border border-gray-300 bg-white shadow-uui-xs">
                            <button v-for="(r, i) in ranges" :key="r" type="button"
                                @click="range = r"
                                :class="['px-uui-4 py-uui-2 text-sm-semibold', i > 0 ? 'border-l border-gray-300' : '', range === r ? 'bg-gray-50 text-gray-800' : 'text-gray-700 hover:bg-gray-50']">
                                {{ r }}
                            </button>
                        </div>
                    </div>

                    <!-- MRR + chart -->
                    <div class="mt-uui-8 flex items-start gap-uui-8">
                        <div>
                            <p class="text-sm-medium text-gray-600">MRR</p>
                            <div class="mt-uui-2 flex items-center gap-uui-3">
                                <p class="text-display-lg-semibold text-gray-900"><span class="text-display-sm-semibold align-top">$</span>18,880</p>
                                <span class="inline-flex items-center gap-1 text-sm-medium text-success-600">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                                    7.4%
                                </span>
                            </div>
                        </div>
                        <!-- Chart -->
                        <div class="relative h-[200px] flex-1 overflow-hidden">
                            <svg viewBox="0 0 600 200" preserveAspectRatio="none" class="size-full">
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stop-color="#7F56D9" stop-opacity="0.2"/>
                                        <stop offset="100%" stop-color="#7F56D9" stop-opacity="0"/>
                                    </linearGradient>
                                </defs>
                                <path d="M0,140 C50,135 100,130 150,125 C200,120 250,110 300,105 C350,100 400,95 450,80 C500,65 550,50 600,40 L600,200 L0,200 Z" fill="url(#g1)"/>
                                <path d="M0,140 C50,135 100,130 150,125 C200,120 250,110 300,105 C350,100 400,95 450,80 C500,65 550,50 600,40" fill="none" stroke="#7F56D9" stroke-width="2"/>
                            </svg>
                            <div class="absolute inset-x-0 bottom-0 flex justify-between text-xs-medium text-gray-500">
                                <span v-for="m in months" :key="m">{{ m }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Start creating content -->
                    <div class="mt-uui-12">
                        <h2 class="text-lg-semibold text-gray-900">Start creating content</h2>
                        <div class="mt-uui-4 border-t border-gray-200 pt-uui-6">
                            <div class="grid gap-uui-4 md:grid-cols-2">
                                <div class="flex items-center gap-uui-4 rounded-uui-2xl border border-gray-200 p-uui-5 hover:border-gray-300">
                                    <div class="flex size-12 items-center justify-center rounded-uui-md border border-gray-200 text-gray-600">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="20" cy="8" r="3"/></svg>
                                    </div>
                                    <div>
                                        <p class="text-md-semibold text-gray-900">Create your first member</p>
                                        <p class="mt-uui-1 text-sm-regular text-gray-600">Add yourself or import from CSV</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-uui-4 rounded-uui-2xl border border-gray-200 p-uui-5 hover:border-gray-300">
                                    <div class="flex size-12 items-center justify-center rounded-uui-md border border-gray-200 text-gray-600">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                                    </div>
                                    <div>
                                        <p class="text-md-semibold text-gray-900">Create a new post</p>
                                        <p class="mt-uui-1 text-sm-regular text-gray-600">Dive into the editor and start creating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent posts -->
                    <div class="mt-uui-12">
                        <h2 class="text-lg-semibold text-gray-900">Recent posts</h2>
                        <div class="mt-uui-4 border-t border-gray-200 pt-uui-6">
                            <div class="grid gap-uui-6 md:grid-cols-2">
                                <article>
                                    <div class="aspect-[5/3] overflow-hidden rounded-uui-2xl bg-gray-100">
                                        <img src="https://images.unsplash.com/photo-1633354931133-79e0d49d63a3?w=800" alt="" class="size-full object-cover" />
                                    </div>
                                    <p class="mt-uui-5 text-sm-semibold text-brand-700">Olivia Rhye • 20 Jan 2024</p>
                                    <h3 class="mt-uui-2 inline-flex items-center gap-2 text-lg-semibold text-gray-900">
                                        UX review presentations
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                                    </h3>
                                    <p class="mt-uui-2 text-md-regular text-gray-600">
                                        How do you create compelling presentations that wow your colleagues and impress your managers?
                                    </p>
                                    <div class="mt-uui-5 flex items-center gap-uui-2">
                                        <Badge color="brand" type="badge-color" size="sm" dot>Design</Badge>
                                        <Badge color="indigo" type="badge-color" size="sm" dot>Research</Badge>
                                        <Badge color="pink" type="badge-color" size="sm" dot>Presentation</Badge>
                                    </div>
                                </article>
                                <article>
                                    <div class="aspect-[5/3] overflow-hidden rounded-uui-2xl bg-gray-100">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800" alt="" class="size-full object-cover" />
                                    </div>
                                    <p class="mt-uui-5 text-sm-semibold text-brand-700">Phoenix Baker • 19 Jan 2022</p>
                                    <h3 class="mt-uui-2 inline-flex items-center gap-2 text-lg-semibold text-gray-900">
                                        Migrating to Linear 101
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                                    </h3>
                                    <p class="mt-uui-2 text-md-regular text-gray-600">
                                        Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get…
                                    </p>
                                    <div class="mt-uui-5 flex items-center gap-uui-2">
                                        <Badge color="brand" type="badge-color" size="sm" dot>Design</Badge>
                                        <Badge color="indigo" type="badge-color" size="sm" dot>Research</Badge>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ========== Right rail ========== -->
                <aside class="w-[240px] shrink-0">
                    <div class="flex flex-col gap-uui-3">
                        <Button hierarchy="secondary-gray" size="md" class="w-full justify-center">
                            <template #leading>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </template>
                            Select dates
                        </Button>
                        <Button hierarchy="secondary-gray" size="md" class="w-full justify-center">
                            <template #leading>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            </template>
                            Filters
                        </Button>
                    </div>

                    <div class="mt-uui-8 flex flex-col gap-uui-6">
                        <div v-for="s in stats" :key="s.label">
                            <p class="text-sm-medium text-gray-600">{{ s.label }}</p>
                            <div class="mt-uui-2 flex items-center gap-uui-3">
                                <p class="text-display-sm-semibold text-gray-900">{{ s.value }}</p>
                                <span class="inline-flex items-center gap-1 text-sm-medium text-success-600">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                                    {{ s.change }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-uui-12">
                        <p class="text-sm-medium text-gray-600">Top members</p>
                        <ul class="mt-uui-4 flex flex-col gap-uui-4">
                            <li v-for="m in topMembers" :key="m.name" class="flex items-center gap-uui-3">
                                <Avatar size="sm" status-icon="online" :online="m.online" :alt="m.name" :src="`https://i.pravatar.cc/80?u=${m.name}`" />
                                <div class="flex-1">
                                    <p class="text-sm-semibold text-gray-700">{{ m.name }}</p>
                                    <p class="text-sm-regular text-gray-600">Member since {{ m.since }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    </div>
</template>
