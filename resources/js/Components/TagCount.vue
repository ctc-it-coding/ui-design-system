<script setup lang="ts">
import { computed } from 'vue';

type TagCountSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{ size?: TagCountSize; count?: number | string }>(),
    { size: 'sm', count: 0 },
);

// Untitled UI Tag count — Figma:
// bg Gray/100, text Gray/700, rounded 3px
// sm: px-4 text-xs/medium  | md: px-5 text-xs/medium  | lg: px-6 text-sm/medium
const sizeClass = computed(() => {
    const map: Record<TagCountSize, string> = {
        sm: 'px-[4px] text-xs-medium',
        md: 'px-[5px] text-xs-medium',
        lg: 'px-[6px] text-sm-medium',
    };
    return map[props.size];
});
</script>

<template>
    <span
        :class="[
            'inline-flex items-center justify-center rounded-[3px] bg-gray-100 text-gray-700',
            sizeClass,
        ]"
    >
        {{ count }}
    </span>
</template>
