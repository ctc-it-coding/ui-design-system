<script setup lang="ts">
import { computed } from 'vue';

type AvatarCompanyIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const props = withDefaults(
    defineProps<{
        src: string;
        alt?: string;
        size?: AvatarCompanyIconSize;
    }>(),
    { alt: '', size: 'xs' },
);

// Untitled UI Avatar company icon — Figma:
// xs 10px | sm 12px | md 14px | lg 16px | xl 18px | 2xl 20px
// border 1.5px white (2xl uses 1.667px), rounded square ~12px (2xl 13.333px)
const sizeClass = computed(() => {
    const map: Record<AvatarCompanyIconSize, string> = {
        xs: 'size-[10px] rounded-[12px] border-[1.5px]',
        sm: 'size-[12px] rounded-[12px] border-[1.5px]',
        md: 'size-[14px] rounded-[12px] border-[1.5px]',
        lg: 'size-[16px] rounded-[12px] border-[1.5px]',
        xl: 'size-[18px] rounded-[12px] border-[1.5px]',
        '2xl': 'size-[20px] rounded-[13.333px] border-[1.667px]',
    };
    return map[props.size];
});
</script>

<template>
    <span
        :class="[
            'relative inline-block overflow-hidden border-solid border-white',
            sizeClass,
        ]"
    >
        <img
            :src="src"
            :alt="alt"
            class="absolute inset-0 size-full object-cover"
        />
    </span>
</template>
