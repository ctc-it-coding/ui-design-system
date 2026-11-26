<script setup lang="ts">
import { computed } from 'vue';

type BadgeGroupColor = 'gray' | 'primary' | 'error' | 'warning' | 'success';
type BadgeGroupSize = 'sm' | 'md';
type BadgeGroupTheme = 'pill-color' | 'pill-modern';
type BadgeGroupAlign = 'leading' | 'trailing';

const props = withDefaults(
    defineProps<{
        color?: BadgeGroupColor;
        size?: BadgeGroupSize;
        theme?: BadgeGroupTheme;
        align?: BadgeGroupAlign;
        badgeText?: string;
        icon?: boolean;
    }>(),
    {
        color: 'primary',
        size: 'sm',
        theme: 'pill-color',
        align: 'leading',
        badgeText: 'New',
        icon: true,
    },
);

// Untitled UI BadgeGroup — Figma colors
// pill-color: outer bg-{c}/50 border-{c}/200, inner badge bg-white border-{c}/200 text-{c}/700, label text-{c}/700
// pill-modern: outer bg-white border-gray/300 shadow-xs, inner badge bg-{c}/50 border-{c}/200 text-{c}/700, label text-gray/700
const outerClass = computed(() => {
    if (props.theme === 'pill-modern') {
        return 'bg-white border-gray-300 shadow-uui-xs';
    }
    const map: Record<BadgeGroupColor, string> = {
        gray:    'bg-gray-50 border-gray-200',
        primary: 'bg-brand-50 border-brand-200',
        error:   'bg-error-50 border-error-200',
        warning: 'bg-warning-50 border-warning-200',
        success: 'bg-success-50 border-success-200',
    };
    return map[props.color];
});

const labelClass = computed(() => {
    if (props.theme === 'pill-modern') return 'text-gray-700';
    const map: Record<BadgeGroupColor, string> = {
        gray:    'text-gray-700',
        primary: 'text-brand-700',
        error:   'text-error-700',
        warning: 'text-warning-700',
        success: 'text-success-700',
    };
    return map[props.color];
});

const innerBadgeClass = computed(() => {
    const text: Record<BadgeGroupColor, string> = {
        gray:    'text-gray-700 border-gray-200',
        primary: 'text-brand-700 border-brand-200',
        error:   'text-error-700 border-error-200',
        warning: 'text-warning-700 border-warning-200',
        success: 'text-success-700 border-success-200',
    };
    if (props.theme === 'pill-modern') {
        const bg: Record<BadgeGroupColor, string> = {
            gray:    'bg-gray-50',
            primary: 'bg-brand-50',
            error:   'bg-error-50',
            warning: 'bg-warning-50',
            success: 'bg-success-50',
        };
        return `${bg[props.color]} ${text[props.color]}`;
    }
    return `bg-white ${text[props.color]}`;
});

const sizeOuterClass = computed(() => {
    // padding: small side = 4/5px around inner badge, large side = 10/12px around label
    const base = 'gap-[8px]';
    if (props.size === 'md') {
        return props.align === 'leading'
            ? `${base} py-[5px] pl-[5px] pr-[12px] text-sm-medium`
            : `${base} py-[5px] pr-[5px] pl-[12px] text-sm-medium`;
    }
    return props.align === 'leading'
        ? `${base} py-[4px] pl-[4px] pr-[10px] text-xs-medium`
        : `${base} py-[4px] pr-[4px] pl-[10px] text-xs-medium`;
});

const innerSizeClass = computed(() =>
    props.size === 'md'
        ? 'px-[10px] py-[2px] text-sm-medium'
        : 'px-[8px] py-[2px] text-xs-medium',
);

const iconSize = computed(() => (props.size === 'md' ? 'size-[16px]' : 'size-[12px]'));
</script>

<template>
    <span
        :class="[
            'inline-flex items-center border rounded-uui-full',
            outerClass,
            sizeOuterClass,
            labelClass,
        ]"
    >
        <span
            v-if="align === 'leading'"
            :class="[
                'inline-flex items-center border rounded-uui-full shrink-0',
                innerBadgeClass,
                innerSizeClass,
            ]"
        >
            <slot name="badge">{{ badgeText }}</slot>
        </span>

        <span class="inline-flex items-center gap-[4px]">
            <slot />
            <svg
                v-if="icon"
                :class="[iconSize, 'shrink-0']"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>

        <span
            v-if="align === 'trailing'"
            :class="[
                'inline-flex items-center border rounded-uui-full shrink-0',
                innerBadgeClass,
                innerSizeClass,
            ]"
        >
            <slot name="badge">{{ badgeText }}</slot>
        </span>
    </span>
</template>
