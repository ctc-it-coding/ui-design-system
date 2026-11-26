<script setup lang="ts">
import { computed } from 'vue';

type IconMode = 'none' | 'leading' | 'only' | 'dot';

const props = withDefaults(
    defineProps<{
        current?: boolean;
        icon?: IconMode;
        disabled?: boolean;
        type?: 'button' | 'submit';
    }>(),
    { current: false, icon: 'none', disabled: false, type: 'button' },
);

// Padding per icon mode — from Figma
const paddingClass = computed(() => {
    switch (props.icon) {
        case 'leading': return 'gap-[8px] pl-[14px] pr-[16px]';
        case 'only':    return 'px-[12px]';
        case 'dot':     return 'gap-[8px] px-[16px]';
        default:        return 'px-[16px]';
    }
});

// bg (current/active gets gray-50), border-right gray-300 (default) or gray-400 (disabled)
const stateClass = computed(() => {
    if (props.disabled) {
        return [
            props.current ? 'bg-gray-50' : 'bg-white',
            'border-gray-400 text-gray-400',
        ].join(' ');
    }
    return [
        props.current ? 'bg-gray-50 text-gray-800' : 'bg-white text-gray-700',
        'border-gray-300 hover:bg-gray-50 hover:text-gray-800',
        'focus:shadow-uui-ring-gray-shadow-xs focus:outline-none',
    ].join(' ');
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="[
            'relative flex min-h-[40px] items-center justify-center border-r border-solid py-[8px]',
            'font-sans text-[14px] font-semibold leading-[20px] whitespace-nowrap',
            'transition disabled:cursor-not-allowed',
            paddingClass,
            stateClass,
        ]"
    >
        <!-- Dot (10px wrapper, 8px success-500 circle) -->
        <span v-if="icon === 'dot'" class="relative block size-[10px] shrink-0">
            <span
                class="absolute left-px top-px size-[8px] rounded-full"
                :class="disabled ? 'bg-gray-400' : 'bg-success-500'"
            />
        </span>

        <!-- Leading / only icon slot -->
        <span v-if="icon === 'leading' || icon === 'only'" class="size-[20px] shrink-0">
            <slot name="icon" />
        </span>

        <!-- Label (hide when icon-only) -->
        <span v-if="icon !== 'only'"><slot>Text</slot></span>
    </button>
</template>
