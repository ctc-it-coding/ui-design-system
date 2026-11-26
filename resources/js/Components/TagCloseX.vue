<script setup lang="ts">
import { computed } from 'vue';

type TagCloseXSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{ size?: TagCloseXSize }>(),
    { size: 'sm' },
);

// Untitled UI Tag close X — Figma:
// icon size 10/12/14, padding 2/2/3, rounded 3px
// default icon Gray/400, hover bg Gray/50 + icon Gray/500
const sizeClass = computed(() => {
    const map: Record<TagCloseXSize, string> = {
        sm: 'p-[2px]',
        md: 'p-[2px]',
        lg: 'p-[3px]',
    };
    return map[props.size];
});

const iconSizeClass = computed(() => {
    const map: Record<TagCloseXSize, string> = {
        sm: 'size-[10px]',
        md: 'size-[12px]',
        lg: 'size-[14px]',
    };
    return map[props.size];
});
</script>

<template>
    <button
        type="button"
        aria-label="Remove"
        :class="[
            'relative inline-flex items-center rounded-[3px] text-gray-400 transition',
            'hover:bg-gray-50 hover:text-gray-500',
            sizeClass,
        ]"
    >
        <svg
            :class="[iconSizeClass, 'shrink-0']"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
