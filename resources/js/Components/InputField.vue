<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue';

type InputFieldSize = 'sm' | 'md';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        size?: InputFieldSize;
        type?: string;
        label?: string;
        hint?: string;
        placeholder?: string;
        destructive?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        helpIcon?: boolean;
    }>(),
    {
        modelValue: '',
        size: 'sm',
        type: 'text',
        label: '',
        hint: '',
        placeholder: '',
        destructive: false,
        disabled: false,
        readonly: false,
        helpIcon: false,
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

const slots = useSlots();
const focused = ref(false);

// ผูกป้ายชื่อกับ <input> และ hint ผ่าน aria-describedby ให้โปรแกรมอ่านหน้าจอรู้ชื่อและคำอธิบายของช่อง
const inputId = useId();
const hintId = `${inputId}-hint`;

// Untitled UI Input field — Figma:
// label text-sm/medium Gray/700, hint text-sm/regular Gray/600 (error: Error/500)
// box: bg-white border rounded-[8px] shadow-uui-xs
//   sm: px-[12px] py-[8px]   md: px-[14px] py-[10px]
// border:
//   default     -> Gray/300
//   focused     -> Brand/300 + uui-ring-brand-shadow-xs
//   destructive -> Error/300, focused + uui-ring-error-shadow-xs
//   disabled    -> Gray/300, bg Gray/50
// placeholder text-md/regular Gray/500, value text-md/regular Gray/900
const sizeClass = computed(() =>
    props.size === 'md' ? 'px-[14px] py-[10px]' : 'px-[12px] py-[8px]',
);

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
</script>

<template>
    <div class="flex w-full flex-col items-start gap-[6px]">
        <label
            v-if="label"
            :for="inputId"
            class="text-left text-sm-medium text-gray-700"
        >
            {{ label }}
        </label>

        <div
            :class="[
                'flex w-full items-center gap-[8px] overflow-hidden rounded-[8px] border',
                sizeClass,
                borderClass,
                bgClass,
                disabled && 'cursor-not-allowed',
            ]"
        >
            <slot name="leading" />

            <input
                :id="inputId"
                :value="modelValue"
                :type="type"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :aria-describedby="hint ? hintId : undefined"
                :aria-invalid="destructive ? 'true' : undefined"
                class="min-w-0 flex-1 bg-transparent text-md-regular text-gray-900 placeholder:text-gray-500 outline-none disabled:cursor-not-allowed"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                @focus="focused = true"
                @blur="focused = false"
            />

            <slot name="trailing">
                <!-- destructive: alert-circle -->
                <svg
                    v-if="destructive"
                    class="size-[16px] shrink-0 text-error-500"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M8 5.333V8m0 2.667h.007M14.667 8A6.667 6.667 0 111.334 8a6.667 6.667 0 0113.333 0z"
                        stroke="currentColor"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <!-- help icon -->
                <svg
                    v-else-if="helpIcon"
                    class="size-[16px] shrink-0 text-gray-400"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M6.06 6a2 2 0 013.886.667c0 1.333-2 2-2 2M8 11.333h.007M14.667 8A6.667 6.667 0 111.334 8a6.667 6.667 0 0113.333 0z"
                        stroke="currentColor"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </slot>
        </div>

        <p
            v-if="hint"
            :id="hintId"
            :class="['w-full text-left text-sm-regular', hintClass]"
        >
            {{ hint }}
        </p>
    </div>
</template>
