<script setup lang="ts">
import { computed } from 'vue';

type AvatarAddButtonSize = 'xs' | 'sm' | 'md';

const props = withDefaults(
    defineProps<{
        size?: AvatarAddButtonSize;
        disabled?: boolean;
    }>(),
    { size: 'xs', disabled: false },
);

// Untitled UI Avatar add button — Figma:
// dashed rounded-full button with plus icon
// xs 24 (rounded-12, icon 16, plus stroke Gray/500)
// sm 32 (rounded-16, icon 16)
// md 40 (rounded-20, icon 20)
// default: bg-white border Gray/300, plus Gray/500
// hover: bg Gray/50, plus Gray/600
// focus: + uui-ring-gray
// disabled: bg Gray/50, border Gray/200, plus Gray/400
const sizeClass = computed(() => {
    const map: Record<AvatarAddButtonSize, string> = {
        xs: 'size-[24px] rounded-[12px]',
        sm: 'size-[32px] rounded-[16px]',
        md: 'size-[40px] rounded-[20px]',
    };
    return map[props.size];
});

const iconSizeClass = computed(() =>
    props.size === 'md' ? 'size-[20px]' : 'size-[16px]',
);

const stateClass = computed(() => {
    if (props.disabled) {
        return 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed';
    }
    return 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-600 focus-visible:shadow-uui-ring-gray';
});
</script>

<template>
    <button
        type="button"
        :disabled="disabled"
        :class="[
            'relative inline-flex items-center justify-center border border-dashed outline-none transition',
            sizeClass,
            stateClass,
        ]"
        aria-label="Add user"
    >
        <svg
            :class="[iconSizeClass, 'shrink-0']"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M8 3.333V12.667M3.333 8H12.667"
                stroke="currentColor"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>
</template>
