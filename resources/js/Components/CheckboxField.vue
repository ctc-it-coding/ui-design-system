<script setup lang="ts">
import { computed } from 'vue';
import CheckboxBase from './CheckboxBase.vue';

type CheckboxFieldSize = 'sm' | 'md';
type CheckboxFieldType = 'checkbox' | 'radio';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        indeterminate?: boolean;
        size?: CheckboxFieldSize;
        type?: CheckboxFieldType;
        disabled?: boolean;
        label?: string;
        supportingText?: string;
    }>(),
    {
        modelValue: false,
        indeterminate: false,
        size: 'sm',
        type: 'checkbox',
        disabled: false,
        label: '',
        supportingText: '',
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

// Untitled UI Checkbox / Radio with text — Figma:
// row gap-[8px] (sm) / gap-[12px] (md)
// label: sm text-sm/medium, md text-md/medium, Gray/700
// supporting: sm text-sm/regular, md text-md/regular, Gray/600
// gap label/support: 0 (sm) / 2px (md)
// disabled label/support shifts to Gray/300/Gray/400 in some skins; here keep
// Gray/700/Gray/600 with reduced opacity via cursor-not-allowed
const gapClass = computed(() => (props.size === 'md' ? 'gap-[12px]' : 'gap-[8px]'));
const labelClass = computed(() =>
    props.size === 'md' ? 'text-md-medium' : 'text-sm-medium',
);
const supportingClass = computed(() =>
    props.size === 'md' ? 'text-md-regular' : 'text-sm-regular',
);
const textGapClass = computed(() => (props.size === 'md' ? 'gap-[2px]' : ''));
</script>

<template>
    <label
        :class="[
            'flex w-full items-start',
            gapClass,
            disabled && 'cursor-not-allowed',
        ]"
    >
        <CheckboxBase
            :model-value="modelValue"
            :indeterminate="indeterminate"
            :size="size"
            :type="type"
            :disabled="disabled"
            class="mt-[2px]"
            @update:model-value="emit('update:modelValue', $event)"
        />
        <div
            v-if="label || supportingText || $slots.default"
            :class="['flex min-w-0 flex-1 flex-col items-start', textGapClass]"
        >
            <p :class="['w-full text-gray-700', labelClass]">
                <slot>{{ label }}</slot>
            </p>
            <p
                v-if="supportingText || $slots.supporting"
                :class="['w-full text-gray-600', supportingClass]"
            >
                <slot name="supporting">{{ supportingText }}</slot>
            </p>
        </div>
    </label>
</template>
