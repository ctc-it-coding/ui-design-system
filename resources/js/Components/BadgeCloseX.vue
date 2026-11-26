<script setup lang="ts">
import { computed } from 'vue';

type BadgeColor =
    | 'gray' | 'primary' | 'error' | 'warning' | 'success'
    | 'gray-blue' | 'blue-light' | 'blue' | 'indigo'
    | 'purple' | 'pink' | 'orange';

type BadgeType = 'square' | 'rounded';

const props = withDefaults(
    defineProps<{
        color?: BadgeColor;
        type?: BadgeType;
    }>(),
    { color: 'gray', type: 'square' },
);

// Icon uses color/400 at default and color/500 on hover.
// Background tints to color/100 on hover. Brand→100/400/500.
// Figma colors verified per variant.
const colorClass = computed(() => {
    const map: Record<BadgeColor, string> = {
        gray:         'text-gray-400       hover:bg-gray-100       hover:text-gray-500',
        primary:      'text-brand-400      hover:bg-brand-100      hover:text-brand-500',
        error:        'text-error-400      hover:bg-error-100      hover:text-error-500',
        warning:      'text-warning-400    hover:bg-warning-100    hover:text-warning-500',
        success:      'text-success-400    hover:bg-success-100    hover:text-success-500',
        'gray-blue':  'text-gray-blue-400  hover:bg-gray-blue-100  hover:text-gray-blue-500',
        'blue-light': 'text-blue-light-400 hover:bg-blue-light-100 hover:text-blue-light-500',
        blue:         'text-blue-400       hover:bg-blue-100       hover:text-blue-500',
        indigo:       'text-indigo-400     hover:bg-indigo-100     hover:text-indigo-500',
        purple:       'text-purple-400     hover:bg-purple-100     hover:text-purple-500',
        pink:         'text-pink-400       hover:bg-pink-100       hover:text-pink-500',
        orange:       'text-orange-400     hover:bg-orange-100     hover:text-orange-500',
    };
    return map[props.color];
});

const radiusClass = computed(() =>
    props.type === 'rounded' ? 'rounded-[8px]' : 'rounded-[3px]',
);
</script>

<template>
    <button
        type="button"
        aria-label="Remove"
        :class="[
            'relative inline-flex items-center p-[2px] mix-blend-darken transition',
            radiusClass,
            colorClass,
        ]"
    >
        <!-- 12×12 x-close icon from Untitled UI (currentColor) -->
        <svg
            class="size-[12px] shrink-0"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>
</template>
