<script setup lang="ts">
import { computed } from 'vue';
import AvatarOnlineIndicator from './AvatarOnlineIndicator.vue';
import AvatarCompanyIcon from './AvatarCompanyIcon.vue';
import VerifiedTick from './VerifiedTick.vue';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatusIcon = 'none' | 'online' | 'company' | 'verified';

const props = withDefaults(
    defineProps<{
        size?: AvatarSize;
        src?: string;
        alt?: string;
        initials?: string;
        statusIcon?: AvatarStatusIcon;
        online?: boolean;
        companySrc?: string;
        contrastBorder?: boolean;
    }>(),
    {
        size: 'md',
        src: '',
        alt: '',
        initials: '',
        statusIcon: 'none',
        online: true,
        companySrc: '',
        contrastBorder: true,
    },
);

// Untitled UI Avatar — Figma:
// xs 24 | sm 32 | md 40 | lg 48 | xl 56 | 2xl 64, fully rounded
// initials text size: xs text-xs, sm text-sm, md text-md, lg text-lg, xl text-xl, 2xl text-display-xs
// placeholder bg Gray/100 with user icon Gray/600
// contrast border: 0.5px-0.75px black 8% inside
// online: Success/500 dot, bottom-right, sized to scale
// company: 14-20px square logo bottom-right
// verified: 16-32px badge top-right
const sizeClass = computed(() => {
    const map: Record<AvatarSize, string> = {
        xs: 'size-[24px]',
        sm: 'size-[32px]',
        md: 'size-[40px]',
        lg: 'size-[48px]',
        xl: 'size-[56px]',
        '2xl': 'size-[64px]',
    };
    return map[props.size];
});

const initialsClass = computed(() => {
    const map: Record<AvatarSize, string> = {
        xs: 'text-xs-medium',
        sm: 'text-sm-medium',
        md: 'text-md-medium',
        lg: 'text-lg-medium',
        xl: 'text-xl-medium',
        '2xl': 'text-display-xs-medium',
    };
    return map[props.size];
});

const placeholderIconClass = computed(() => {
    const map: Record<AvatarSize, string> = {
        xs: 'size-[14px]',
        sm: 'size-[18px]',
        md: 'size-[22px]',
        lg: 'size-[26px]',
        xl: 'size-[30px]',
        '2xl': 'size-[34px]',
    };
    return map[props.size];
});

// Map main avatar size → child status icon size
const onlineSize = computed(() => props.size);
const companySize = computed(() => props.size);
const verifiedSize = computed(() => {
    const map: Record<AvatarSize, 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'> = {
        xs: 'sm',
        sm: 'md',
        md: 'lg',
        lg: 'xl',
        xl: '2xl',
        '2xl': '3xl',
    };
    return map[props.size];
});
</script>

<template>
    <span :class="['relative inline-block shrink-0 rounded-full', sizeClass]">
        <!-- Image -->
        <img
            v-if="src"
            :src="src"
            :alt="alt || initials"
            class="size-full rounded-full object-cover"
        />
        <!-- Initials -->
        <span
            v-else-if="initials"
            :class="[
                'flex size-full items-center justify-center rounded-full bg-gray-100 text-gray-600',
                initialsClass,
            ]"
        >
            {{ initials }}
        </span>
        <!-- Placeholder user icon -->
        <span
            v-else
            class="flex size-full items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
            <svg
                :class="placeholderIconClass"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                    stroke="currentColor"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>

        <!-- Contrast border -->
        <span
            v-if="contrastBorder"
            class="pointer-events-none absolute inset-0 rounded-full border-[0.75px] border-black/[0.08]"
        />

        <!-- Status icon -->
        <AvatarOnlineIndicator
            v-if="statusIcon === 'online'"
            :size="onlineSize"
            :online="online"
            class="absolute bottom-0 right-0"
        />
        <AvatarCompanyIcon
            v-else-if="statusIcon === 'company' && companySrc"
            :src="companySrc"
            :size="companySize"
            class="absolute bottom-0 right-0"
        />
        <VerifiedTick
            v-else-if="statusIcon === 'verified'"
            :size="verifiedSize"
            class="absolute -right-[2px] -top-[2px]"
        />
    </span>
</template>
