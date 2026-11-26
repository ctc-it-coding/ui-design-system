<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import MegaInputFieldBase from './MegaInputFieldBase.vue';

type VerificationSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        digits?: 4 | 6;
        size?: VerificationSize;
        label?: string;
        hint?: string;
        disabled?: boolean;
    }>(),
    {
        modelValue: '',
        digits: 4,
        size: 'sm',
        label: 'Secure code',
        hint: '',
        disabled: false,
    },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

// Untitled UI Verification code input field — Figma:
// label text-sm/medium Gray/700, hint text-sm/regular Gray/600
// gap between cells: sm 8px, md/lg 12px
// 6-digit variant: dash separator after the 3rd cell using same large display digit color (Gray/300)
const cellRefs = ref<(HTMLInputElement | null)[]>([]);

const cells = computed<string[]>(() => {
    const arr = props.modelValue.split('').slice(0, props.digits);
    while (arr.length < props.digits) arr.push('');
    return arr;
});

const gapClass = computed(() => (props.size === 'sm' ? 'gap-[8px]' : 'gap-[12px]'));

const dashFontClass = computed(() =>
    props.size === 'lg'
        ? 'text-[60px] leading-[72px] tracking-[-1.2px]'
        : 'text-[48px] leading-[60px] tracking-[-0.96px]',
);

function updateAt(index: number, raw: string) {
    const ch = raw.replace(/\D/g, '').slice(-1);
    const next = cells.value.slice();
    next[index] = ch;
    emit('update:modelValue', next.join(''));
    if (ch && index < props.digits - 1) {
        nextTick(() => cellRefs.value[index + 1]?.focus());
    }
}

function onKeydown(index: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !cells.value[index] && index > 0) {
        cellRefs.value[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
        cellRefs.value[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < props.digits - 1) {
        cellRefs.value[index + 1]?.focus();
    }
}

function onPaste(e: ClipboardEvent) {
    const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, props.digits);
    if (!text) return;
    e.preventDefault();
    emit('update:modelValue', text.padEnd(props.digits, '').slice(0, props.digits).replace(/\s/g, ''));
    nextTick(() => {
        const next = Math.min(text.length, props.digits - 1);
        cellRefs.value[next]?.focus();
    });
}
</script>

<template>
    <div class="flex flex-col items-start gap-[6px]">
        <p
            v-if="label"
            class="text-sm-medium text-gray-700"
        >
            {{ label }}
        </p>

        <div :class="['flex items-center', gapClass]">
            <template v-for="(_, i) in digits" :key="i">
                <span
                    v-if="digits === 6 && i === 3"
                    :class="['select-none font-medium text-gray-300 text-center', dashFontClass]"
                >
                    -
                </span>
                <MegaInputFieldBase
                    :ref="(el: any) => (cellRefs[i] = el?.$el?.querySelector?.('input') || null)"
                    :model-value="cells[i]"
                    :size="size"
                    :disabled="disabled"
                    @update:model-value="updateAt(i, $event)"
                    @keydown="onKeydown(i, $event)"
                    @paste="onPaste"
                />
            </template>
        </div>

        <p
            v-if="hint"
            class="w-full text-sm-regular text-gray-600"
        >
            {{ hint }}
        </p>
    </div>
</template>
