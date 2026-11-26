<script setup lang="ts">
import { computed } from 'vue';

type VerifiedTickSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const props = withDefaults(
    defineProps<{
        size?: VerifiedTickSize;
        color?: string;
    }>(),
    { size: 'xs', color: '#1570EF' },
);

// Untitled UI Verified tick — Figma:
// xs 10 | sm 12 | md 14 | lg 16 | xl 18 | 2xl 20 | 3xl 24 | 4xl 32
// rotated 8-point star badge (Brand/Blue) with white check
const sizeClass = computed(() => {
    const map: Record<VerifiedTickSize, string> = {
        xs: 'size-[10px]',
        sm: 'size-[12px]',
        md: 'size-[14px]',
        lg: 'size-[16px]',
        xl: 'size-[18px]',
        '2xl': 'size-[20px]',
        '3xl': 'size-[24px]',
        '4xl': 'size-[32px]',
    };
    return map[props.size];
});
</script>

<template>
    <svg
        :class="['inline-block', sizeClass]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M9.59 1.71a3.4 3.4 0 014.82 0l.78.78c.27.27.63.43 1.02.45l1.1.05a3.4 3.4 0 013.2 3.2l.05 1.1c.02.39.18.75.45 1.02l.78.78a3.4 3.4 0 010 4.82l-.78.78c-.27.27-.43.63-.45 1.02l-.05 1.1a3.4 3.4 0 01-3.2 3.2l-1.1.05c-.39.02-.75.18-1.02.45l-.78.78a3.4 3.4 0 01-4.82 0l-.78-.78a1.4 1.4 0 00-1.02-.45l-1.1-.05a3.4 3.4 0 01-3.2-3.2l-.05-1.1a1.4 1.4 0 00-.45-1.02l-.78-.78a3.4 3.4 0 010-4.82l.78-.78c.27-.27.43-.63.45-1.02l.05-1.1a3.4 3.4 0 013.2-3.2l1.1-.05c.39-.02.75-.18 1.02-.45l.78-.78z"
            :fill="color"
        />
        <path
            d="M8 12.5L10.75 15L16 9.5"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
