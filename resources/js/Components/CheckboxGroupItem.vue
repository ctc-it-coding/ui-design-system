<script setup lang="ts">
import { computed } from 'vue';
import CheckboxBase from './CheckboxBase.vue';

type CheckboxGroupItemSize = 'sm' | 'md';
type CheckboxGroupItemType = 'checkbox' | 'radio';
type InputPosition = 'leading' | 'trailing';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        size?: CheckboxGroupItemSize;
        type?: CheckboxGroupItemType;
        inputPosition?: InputPosition;
        disabled?: boolean;
        title?: string;
        subtitle?: string;
        supportingText?: string;
    }>(),
    {
        modelValue: false,
        size: 'md',
        type: 'checkbox',
        inputPosition: 'leading',
        disabled: false,
        title: '',
        subtitle: '',
        supportingText: '',
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();

// Untitled UI Checkbox group item — Figma:
// card: bg-white border Gray/200, rounded-[12px], p-[16px], w-full
// selected: border-2 Brand/600 (compensate inner padding shift via box-sizing)
// inner row: gap-[12px] (md) / gap-[16px] (sm)
// input wrapper: pt-[2px] align with first text line
// title text-md/medium Gray/700, subtitle text-md/regular Gray/600 (md)
//   sm: text-sm
// supporting text-md/regular Gray/600 (md), text-sm/regular (sm)
const cardClass = computed(() =>
    props.modelValue
        ? 'border-2 border-brand-600'
        : 'border border-gray-200',
);

const innerGapClass = computed(() =>
    props.size === 'md' ? 'gap-[12px]' : 'gap-[16px]',
);

const titleClass = computed(() =>
    props.size === 'md' ? 'text-md-medium' : 'text-sm-medium',
);
const subtitleClass = computed(() =>
    props.size === 'md' ? 'text-md-regular' : 'text-sm-regular',
);

function toggle() {
    if (props.disabled) return;
    emit('update:modelValue', !props.modelValue);
}
</script>

<template>
    <div
        :class="[
            'flex w-full items-start rounded-[12px] bg-white p-[16px]',
            cardClass,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="toggle"
    >
        <div :class="['flex min-w-0 flex-1 items-start', innerGapClass]">
            <!-- Leading input -->
            <div
                v-if="inputPosition === 'leading'"
                class="flex shrink-0 items-center justify-center pt-[2px]"
                @click.stop
            >
                <CheckboxBase
                    :model-value="modelValue"
                    :size="size"
                    :type="type"
                    :disabled="disabled"
                    @update:model-value="emit('update:modelValue', $event)"
                />
            </div>

            <!-- Optional leading content slot (icon / avatar / payment logo) -->
            <slot name="leading" />

            <div class="flex min-w-0 flex-1 flex-col items-start gap-[2px]">
                <div class="flex items-start gap-[6px]">
                    <p :class="['text-gray-700', titleClass]">
                        <slot name="title">{{ title }}</slot>
                    </p>
                    <p
                        v-if="subtitle || $slots.subtitle"
                        :class="['text-gray-600', subtitleClass]"
                    >
                        <slot name="subtitle">{{ subtitle }}</slot>
                    </p>
                </div>
                <p
                    v-if="supportingText || $slots.supporting"
                    :class="['min-w-full text-gray-600', subtitleClass]"
                >
                    <slot name="supporting">{{ supportingText }}</slot>
                </p>
            </div>
        </div>

        <!-- Trailing input -->
        <div
            v-if="inputPosition === 'trailing'"
            class="ml-[16px] flex shrink-0 items-center justify-center pt-[2px]"
            @click.stop
        >
            <CheckboxBase
                :model-value="modelValue"
                :size="size"
                :type="type"
                :disabled="disabled"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
    </div>
</template>
