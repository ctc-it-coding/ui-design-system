<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';
import ToggleBase from './ToggleBase.vue';

type ToggleSize = 'sm' | 'md';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        size?: ToggleSize;
        disabled?: boolean;
        label?: string;
        supportingText?: string;
    }>(),
    {
        modelValue: false,
        size: 'sm',
        disabled: false,
        label: '',
        supportingText: '',
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

// Untitled UI Toggle — Figma:
// row: gap-[8px] (sm) / gap-[12px] (md), w-[344px]
// label: text-sm/medium (sm) / text-md/medium (md), Gray/700
// supporting: text-sm/regular (sm) / text-md/regular (md), Gray/600
// gap label/support: 0 (sm) / 2px (md)
const gapClass = computed(() => (props.size === 'md' ? 'gap-[12px]' : 'gap-[8px]'));
const labelClass = computed(() =>
    props.size === 'md' ? 'text-md-medium' : 'text-sm-medium',
);
const supportingClass = computed(() =>
    props.size === 'md' ? 'text-md-regular' : 'text-sm-regular',
);
const textGapClass = computed(() => (props.size === 'md' ? 'gap-[2px]' : ''));

// สวิตช์ได้ชื่อจากข้อความ label เท่านั้น และได้คำอธิบายจาก supporting text
// (ถ้าพึ่ง <label> ที่ห่อทั้งแถว ชื่อจะรวม supporting text และบาง browser ไม่ให้ชื่อกับ role="switch")
const slots = useSlots();
const labelId = useId();
const supportingId = `${labelId}-supporting`;
const hasText = computed(() => !!props.label || !!props.supportingText || !!slots.default);
const hasLabel = computed(() => !!props.label || !!slots.default);
const hasSupporting = computed(() => hasText.value && (!!props.supportingText || !!slots.supporting));
</script>

<template>
    <label :class="['flex w-full items-start', gapClass, disabled && 'cursor-not-allowed']">
        <ToggleBase
            :model-value="modelValue"
            :size="size"
            :disabled="disabled"
            :aria-labelledby="hasLabel ? labelId : undefined"
            :aria-describedby="hasSupporting ? supportingId : undefined"
            class="shrink-0"
            @update:model-value="emit('update:modelValue', $event)"
        />
        <div
            v-if="label || supportingText || $slots.default"
            :class="['flex min-w-0 flex-1 flex-col items-start', textGapClass]"
        >
            <p :id="labelId" :class="['w-full text-gray-700', labelClass]">
                <slot>{{ label }}</slot>
            </p>
            <p
                v-if="supportingText || $slots.supporting"
                :id="supportingId"
                :class="['w-full text-gray-600', supportingClass]"
            >
                <slot name="supporting">{{ supportingText }}</slot>
            </p>
        </div>
    </label>
</template>
