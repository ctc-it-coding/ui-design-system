<script setup lang="ts">
import { computed } from 'vue';

type ToggleSize = 'sm' | 'md';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        size?: ToggleSize;
        disabled?: boolean;
    }>(),
    { modelValue: false, size: 'sm', disabled: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

// Untitled UI Toggle base — Figma:
// track: rounded-[12px], p-[2px]
//   sm: w-[36px] h-[20px], button 16px
//   md: w-[44px] h-[24px], button 20px
// off: bg Gray/100, hover same, focused + uui-ring-gray-secondary
// on:  bg Brand/600, hover Brand/700, focused + uui-ring-brand
// disabled track Gray/100, button Gray/50
// button: white rounded-full shadow-uui-sm
const sizeClass = computed(() => {
    const map: Record<ToggleSize, string> = {
        sm: 'w-[36px] h-[20px]',
        md: 'w-[44px] h-[24px]',
    };
    return map[props.size];
});

const knobSizeClass = computed(() =>
    props.size === 'md' ? 'size-[20px]' : 'size-[16px]',
);

const trackBgClass = computed(() => {
    if (props.disabled) return 'bg-gray-100';
    if (props.modelValue) return 'bg-brand-600 hover:bg-brand-700';
    return 'bg-gray-100';
});

const focusRingClass = computed(() =>
    props.modelValue
        ? 'focus-visible:shadow-uui-ring-brand'
        : 'focus-visible:shadow-uui-ring-gray-secondary',
);

const knobBgClass = computed(() => (props.disabled ? 'bg-gray-50' : 'bg-white'));
</script>

<template>
    <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :disabled="disabled"
        :class="[
            'relative inline-flex items-center overflow-hidden rounded-[12px] p-[2px] outline-none transition-colors',
            sizeClass,
            trackBgClass,
            focusRingClass,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            modelValue ? 'justify-end' : 'justify-start',
        ]"
        @click="emit('update:modelValue', !modelValue)"
    >
        <span
            :class="[
                'shrink-0 rounded-full shadow-uui-sm transition-transform',
                knobSizeClass,
                knobBgClass,
            ]"
        />
    </button>
</template>
