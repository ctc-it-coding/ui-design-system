<script setup lang="ts">
import { computed } from 'vue';

type CheckboxBaseSize = 'sm' | 'md';
type CheckboxBaseType = 'checkbox' | 'radio';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        indeterminate?: boolean;
        size?: CheckboxBaseSize;
        type?: CheckboxBaseType;
        disabled?: boolean;
    }>(),
    {
        modelValue: false,
        indeterminate: false,
        size: 'sm',
        type: 'checkbox',
        disabled: false,
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

// Untitled UI Checkbox base — Figma:
// sm: 16px, checkbox rounded-[4px], radio rounded-[8px]
// md: 20px, checkbox rounded-[6px], radio rounded-[10px]
// off: bg-white border Gray/300 (disabled bg Gray/50)
// on:  bg Brand/600 border Brand/600, text-white check/minus icon
//      disabled: bg Gray/50 border Gray/300, icon Gray/300
// focus rings: off uui-ring-gray, on uui-ring-brand
const isOn = computed(() => props.modelValue || props.indeterminate);

const boxSizeClass = computed(() =>
    props.size === 'md' ? 'size-[20px]' : 'size-[16px]',
);

const radiusClass = computed(() => {
    if (props.type === 'radio') {
        return props.size === 'md' ? 'rounded-[10px]' : 'rounded-[8px]';
    }
    return props.size === 'md' ? 'rounded-[6px]' : 'rounded-[4px]';
});

const iconSizeClass = computed(() =>
    props.size === 'md' ? 'size-[14px]' : 'size-[10px]',
);

const stateClass = computed(() => {
    if (props.disabled) {
        return isOn.value
            ? 'bg-gray-50 border-gray-300 text-gray-300 cursor-not-allowed'
            : 'bg-gray-50 border-gray-300 cursor-not-allowed';
    }
    if (isOn.value) {
        return 'bg-brand-600 border-brand-600 text-white hover:bg-brand-700 hover:border-brand-700 focus-visible:shadow-uui-ring-brand';
    }
    return 'bg-white border-gray-300 hover:border-brand-600 focus-visible:shadow-uui-ring-gray';
});

const radioDotColor = computed(() =>
    props.disabled ? 'bg-gray-300' : 'bg-white',
);
</script>

<template>
    <label
        :class="[
            'relative inline-flex shrink-0 items-center justify-center border outline-none transition',
            boxSizeClass,
            radiusClass,
            stateClass,
        ]"
    >
        <input
            :checked="modelValue"
            :type="type"
            :disabled="disabled"
            class="absolute inset-0 size-full cursor-inherit appearance-none opacity-0 focus:outline-none"
            @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />

        <!-- Checkbox check / minus -->
        <template v-if="type === 'checkbox' && isOn">
            <svg
                v-if="indeterminate"
                :class="[iconSizeClass, 'shrink-0']"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M2.5 6h7"
                    stroke="currentColor"
                    stroke-width="1.6666"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <svg
                v-else
                :class="[iconSizeClass, 'shrink-0']"
                viewBox="0 0 12 12"
                fill="none"
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
        </template>

        <!-- Radio dot -->
        <span
            v-if="type === 'radio' && isOn"
            :class="[
                'rounded-full',
                size === 'md' ? 'size-[8px]' : 'size-[6px]',
                radioDotColor,
            ]"
        />
    </label>
</template>
