<script setup lang="ts">
import { computed, ref } from 'vue';

type MegaInputSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        size?: MegaInputSize;
        disabled?: boolean;
        autofocus?: boolean;
    }>(),
    { modelValue: '', size: 'sm', disabled: false, autofocus: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const focused = ref(false);

// Untitled UI Mega input field base — Figma:
// sm: w/min-h 64, rounded-[8px], px-[8px] py-[2px], font 48/60 -0.96 (display-lg medium)
// md: 80, rounded-[10px], p-[8px], font 48/60
// lg: 96, rounded-[12px], px-[8px] py-[12px], font 60/72 -1.2 (display-xl medium)
// placeholder/disabled text Gray/300, focused/filled text Brand/600
// default border Gray/300 + shadow-uui-xs
// focused border-2 Brand/600 + shadow-uui-ring-brand-shadow-xs
// filled border-2 Brand/600 + shadow-uui-xs
// disabled bg-Gray/50
const isFilled = computed(() => props.modelValue.length > 0);

const sizeClass = computed(() => {
    const map: Record<MegaInputSize, string> = {
        sm: 'w-[64px] min-h-[64px] rounded-[8px] px-[8px] py-[2px]',
        md: 'w-[80px] min-h-[80px] rounded-[10px] p-[8px]',
        lg: 'w-[96px] min-h-[96px] rounded-[12px] px-[8px] py-[12px]',
    };
    return map[props.size];
});

const fontClass = computed(() =>
    props.size === 'lg'
        ? 'text-[60px] leading-[72px] tracking-[-1.2px]'
        : 'text-[48px] leading-[60px] tracking-[-0.96px]',
);

const stateClass = computed(() => {
    if (props.disabled) {
        return 'bg-gray-50 border border-gray-300 shadow-uui-xs';
    }
    if (focused.value) {
        return 'bg-white border-2 border-brand-600 shadow-uui-ring-brand-shadow-xs';
    }
    if (isFilled.value) {
        return 'bg-white border-2 border-brand-600 shadow-uui-xs';
    }
    return 'bg-white border border-gray-300 shadow-uui-xs';
});

const textColorClass = computed(() =>
    props.disabled || !isFilled.value && !focused.value
        ? 'text-gray-300'
        : 'text-brand-600',
);
</script>

<template>
    <label
        :class="[
            'relative flex flex-col items-center justify-center overflow-hidden text-center font-medium',
            sizeClass,
            stateClass,
            disabled ? 'cursor-not-allowed' : 'cursor-text',
        ]"
    >
        <input
            :value="modelValue"
            :disabled="disabled"
            :autofocus="autofocus"
            inputmode="numeric"
            maxlength="1"
            :class="[
                'w-full bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                fontClass,
                textColorClass,
            ]"
            :placeholder="'0'"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @focus="focused = true"
            @blur="focused = false"
        />
    </label>
</template>
