<script setup lang="ts">
import { computed } from 'vue';

type AvatarOnlineIndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const props = withDefaults(
    defineProps<{
        online?: boolean;
        size?: AvatarOnlineIndicatorSize;
    }>(),
    { online: false, size: 'xs' },
);

// Untitled UI Avatar online indicator — Figma:
// 1.5px white border, online bg Success/500, offline bg Gray/300
// xs 6px (r3) | sm 8px (r4) | md 10px (r5) | lg 12px (r6) | xl 14px (r7) | 2xl 16px (r8)
const sizeClass = computed(() => {
    const map: Record<AvatarOnlineIndicatorSize, string> = {
        xs: 'size-[6px]',
        sm: 'size-[8px]',
        md: 'size-[10px]',
        lg: 'size-[12px]',
        xl: 'size-[14px]',
        '2xl': 'size-[16px]',
    };
    return map[props.size];
});

const colorClass = computed(() =>
    props.online ? 'bg-success-500' : 'bg-gray-300',
);
</script>

<template>
    <span
        :class="[
            'inline-block rounded-full border-[1.5px] border-white',
            sizeClass,
            colorClass,
        ]"
    />
</template>
