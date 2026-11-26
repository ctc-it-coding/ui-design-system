<script setup lang="ts">
type DropdownListHeaderType = 'avatar-group' | 'header';

withDefaults(
    defineProps<{
        type?: DropdownListHeaderType;
        title?: string;
        name?: string;
        email?: string;
        avatarSrc?: string;
        online?: boolean;
    }>(),
    {
        type: 'avatar-group',
        title: 'Account menu',
        name: 'Olivia Rhye',
        email: 'olivia@untitledui.com',
        avatarSrc: '',
        online: true,
    },
);
</script>

<template>
    <!--
        Untitled UI Dropdown list header — Figma:
        outer: px-[16px] py-[12px] border-b Gray/200
        avatar-group: gap-[12px], 40px avatar w/ online indicator,
            name text-sm/semibold Gray/700, email text-sm/regular Gray/600
        header: text-sm/semibold Gray/700
    -->
    <div class="flex w-full flex-col items-start border-b border-gray-200 px-[16px] py-[12px]">
        <div
            v-if="type === 'avatar-group'"
            class="flex w-full items-center gap-[12px]"
        >
            <slot name="avatar">
                <div class="relative size-[40px] shrink-0">
                    <img
                        v-if="avatarSrc"
                        :src="avatarSrc"
                        :alt="name"
                        class="size-full rounded-full object-cover"
                    />
                    <div
                        v-else
                        class="size-full rounded-full bg-gray-100"
                    />
                    <div class="absolute inset-0 rounded-full border-[0.75px] border-black/[0.08]" />
                    <div
                        v-if="online"
                        class="absolute bottom-0 right-0 size-[10px] rounded-full border-[1.5px] border-white bg-success-500"
                    />
                </div>
            </slot>
            <div class="flex min-w-0 flex-1 flex-col items-start">
                <p class="w-full truncate text-sm-semibold text-gray-700">
                    <slot name="name">{{ name }}</slot>
                </p>
                <p class="w-full truncate text-sm-regular text-gray-600">
                    <slot name="email">{{ email }}</slot>
                </p>
            </div>
        </div>

        <p
            v-else
            class="w-full text-sm-semibold text-gray-700"
        >
            <slot>{{ title }}</slot>
        </p>
    </div>
</template>
