<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        label?: string;
        hint?: string;
        placeholder?: string;
        rows?: number;
        destructive?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        tags?: boolean;
    }>(),
    {
        modelValue: '',
        label: '',
        hint: '',
        placeholder: 'Enter a description...',
        rows: 5,
        destructive: false,
        disabled: false,
        readonly: false,
        tags: false,
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const slots = useSlots();
const focused = ref(false);

// Untitled UI Textarea input field — Figma:
// label text-sm/medium Gray/700, hint text-sm/regular Gray/600 (error: Error/500)
// box: bg-white border rounded-[8px] shadow-uui-xs
//   default: px-[14px] py-[12px]
//   tags variant: p-[12px] (flex-col, wrap tags + input)
// border:
//   default     -> Gray/300
//   focused     -> Brand/300 + uui-ring-brand-shadow-xs
//   destructive -> Error/300, focused + uui-ring-error-shadow-xs
//   disabled    -> bg Gray/50
// placeholder text-md/regular Gray/500, value text-md/regular Gray/900
const borderClass = computed(() => {
    if (props.destructive) {
        return focused.value
            ? 'border-error-300 shadow-uui-ring-error-shadow-xs'
            : 'border-error-300 shadow-uui-xs';
    }
    if (focused.value) {
        return 'border-brand-300 shadow-uui-ring-brand-shadow-xs';
    }
    return 'border-gray-300 shadow-uui-xs';
});

const bgClass = computed(() => (props.disabled ? 'bg-gray-50' : 'bg-white'));

const hintClass = computed(() =>
    props.destructive ? 'text-error-500' : 'text-gray-600',
);

const paddingClass = computed(() =>
    props.tags ? 'p-[12px]' : 'px-[14px] py-[12px]',
);
</script>

<template>
    <div class="flex w-full flex-col items-start gap-[6px]">
        <p
            v-if="label"
            class="text-left text-sm-medium text-gray-700"
        >
            {{ label }}
        </p>

        <div
            :class="[
                'flex w-full overflow-hidden rounded-[8px] border',
                tags ? 'flex-col items-start' : 'items-start',
                paddingClass,
                borderClass,
                bgClass,
            ]"
        >
            <!-- Tags variant: chips wrap with inline input -->
            <div
                v-if="tags"
                class="flex w-full flex-wrap items-start gap-[8px]"
            >
                <slot name="tags" />
                <input
                    :value="modelValue"
                    type="text"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    class="min-w-[80px] flex-1 bg-transparent text-md-regular text-gray-900 placeholder:text-gray-500 outline-none disabled:cursor-not-allowed"
                    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                    @focus="focused = true"
                    @blur="focused = false"
                />
            </div>

            <!-- Default variant: textarea -->
            <textarea
                v-else
                :value="modelValue"
                :placeholder="placeholder"
                :rows="rows"
                :disabled="disabled"
                :readonly="readonly"
                class="block w-full resize-none bg-transparent text-md-regular text-gray-900 placeholder:text-gray-500 outline-none disabled:cursor-not-allowed"
                @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
                @focus="focused = true"
                @blur="focused = false"
            />
        </div>

        <p
            v-if="hint"
            :class="['w-full text-left text-sm-regular', hintClass]"
        >
            {{ hint }}
        </p>
    </div>
</template>
