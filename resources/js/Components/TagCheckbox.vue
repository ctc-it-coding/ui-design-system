<script setup lang="ts">
import { computed } from 'vue';

type TagCheckboxSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        size?: TagCheckboxSize;
        disabled?: boolean;
    }>(),
    { modelValue: false, size: 'sm', disabled: false },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

const checked = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v),
});

// Untitled UI Tag checkbox — Figma:
// box: 14/16/18, radius 4
// unchecked: bg-white border-gray/300 (disabled bg-gray/50)
// checked: bg-brand/600 border-brand/600, hover bg-brand/700
// focus rings via uui-ring-gray / uui-ring-brand (already in tailwind config)
const boxSizeClass = computed(() => {
    const map: Record<TagCheckboxSize, string> = {
        sm: 'size-[14px]',
        md: 'size-[16px]',
        lg: 'size-[18px]',
    };
    return map[props.size];
});

const iconSizeClass = computed(() => {
    const map: Record<TagCheckboxSize, string> = {
        sm: 'size-[10px]',
        md: 'size-[12px]',
        lg: 'size-[14px]',
    };
    return map[props.size];
});

const stateClass = computed(() => {
    if (props.disabled) {
        return props.modelValue
            ? 'bg-gray-50 border-gray-300 text-gray-300 cursor-not-allowed'
            : 'bg-gray-50 border-gray-300 cursor-not-allowed';
    }
    if (props.modelValue) {
        return 'bg-brand-600 border-brand-600 text-white hover:bg-brand-700 hover:border-brand-700 focus-visible:shadow-uui-ring-brand';
    }
    return 'bg-white border-gray-300 hover:border-brand-600 focus-visible:shadow-uui-ring-gray';
});
</script>

<template>
    <label
        :class="[
            'relative inline-flex items-center justify-center rounded-[4px] border outline-none transition',
            boxSizeClass,
            stateClass,
        ]"
    >
        <input
            v-model="checked"
            type="checkbox"
            :disabled="disabled"
            class="absolute inset-0 size-full cursor-inherit appearance-none opacity-0 focus:outline-none"
        />
        <svg
            v-if="modelValue"
            :class="[iconSizeClass, 'shrink-0']"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                stroke-width="1.6666"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </label>
</template>
