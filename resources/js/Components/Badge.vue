<script setup lang="ts">
import { computed } from 'vue';
import BadgeCloseX from './BadgeCloseX.vue';

type BadgeColor =
    | 'gray' | 'primary' | 'error' | 'warning' | 'success'
    | 'gray-blue' | 'blue-light' | 'blue' | 'indigo'
    | 'purple' | 'pink' | 'orange';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeType = 'pill-color' | 'badge-color' | 'badge-modern';

const props = withDefaults(
    defineProps<{
        color?: BadgeColor;
        size?: BadgeSize;
        type?: BadgeType;
        dot?: boolean;
        closable?: boolean;
    }>(),
    { color: 'gray', size: 'sm', type: 'pill-color', dot: false, closable: false },
);

const emit = defineEmits<{ (e: 'close'): void }>();

// Untitled UI Badge — Figma colors
// Color variant: bg-{c}/50, border-{c}/200, text-{c}/700
// Modern variant: bg-white, border-gray/300, text-gray/700, shadow-xs
const colorClass = computed(() => {
    if (props.type === 'badge-modern') {
        return 'bg-white border-gray-300 text-gray-700 shadow-uui-xs';
    }
    const map: Record<BadgeColor, string> = {
        gray:         'bg-gray-50 border-gray-200 text-gray-700',
        primary:      'bg-brand-50 border-brand-200 text-brand-700',
        error:        'bg-error-50 border-error-200 text-error-700',
        warning:      'bg-warning-50 border-warning-200 text-warning-700',
        success:      'bg-success-50 border-success-200 text-success-700',
        'gray-blue':  'bg-gray-blue-50 border-gray-blue-200 text-gray-blue-700',
        'blue-light': 'bg-blue-light-50 border-blue-light-200 text-blue-light-700',
        blue:         'bg-blue-50 border-blue-200 text-blue-700',
        indigo:       'bg-indigo-50 border-indigo-200 text-indigo-700',
        purple:       'bg-purple-50 border-purple-200 text-purple-700',
        pink:         'bg-pink-50 border-pink-200 text-pink-700',
        orange:       'bg-orange-50 border-orange-200 text-orange-700',
    };
    return map[props.color];
});

const sizeClass = computed(() => {
    // px / py / text scale per Untitled UI
    const map: Record<BadgeSize, string> = {
        sm: 'px-[8px] py-[2px] gap-[4px] text-xs-medium',
        md: 'px-[10px] py-[2px] gap-[4px] text-sm-medium',
        lg: 'px-[12px] py-[4px] gap-[6px] text-sm-medium',
    };
    return map[props.size];
});

const radiusClass = computed(() =>
    props.type === 'pill-color' ? 'rounded-uui-full' : 'rounded-uui-sm',
);

// Dot color matches text color for Color variants; gray-500 for Modern
const dotColorClass = computed(() => {
    if (props.type === 'badge-modern') return 'bg-gray-500';
    const map: Record<BadgeColor, string> = {
        gray: 'bg-gray-500',
        primary: 'bg-brand-500',
        error: 'bg-error-500',
        warning: 'bg-warning-500',
        success: 'bg-success-500',
        'gray-blue': 'bg-gray-blue-500',
        'blue-light': 'bg-blue-light-500',
        blue: 'bg-blue-500',
        indigo: 'bg-indigo-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        orange: 'bg-orange-500',
    };
    return map[props.color];
});

const closeColor = computed<BadgeColor>(() =>
    props.type === 'badge-modern' ? 'gray' : props.color,
);
</script>

<template>
    <span
        :class="[
            'inline-flex items-center border',
            radiusClass,
            sizeClass,
            colorClass,
        ]"
    >
        <slot name="leading">
            <span
                v-if="dot"
                :class="['size-[6px] rounded-full shrink-0', dotColorClass]"
            />
        </slot>
        <slot />
        <slot name="trailing">
            <BadgeCloseX
                v-if="closable"
                :color="closeColor"
                :type="type === 'pill-color' ? 'rounded' : 'square'"
                @click="emit('close')"
            />
        </slot>
    </span>
</template>
