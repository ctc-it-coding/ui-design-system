<script setup lang="ts">
import { computed } from 'vue';
import WysiwygEditorIcon from './WysiwygEditorIcon.vue';

type ArrowDirection = 'top' | 'bottom';
type ArrowPosition = 'left' | 'center' | 'right';
type WysiwygIconType =
    | 'bold' | 'italic' | 'h1' | 'h2' | 'quote'
    | 'link' | 'photo' | 'list-bullet' | 'list-numbers';

const props = withDefaults(
    defineProps<{
        arrowDirection?: ArrowDirection;
        arrowPosition?: ArrowPosition;
        active?: WysiwygIconType[];
    }>(),
    { arrowDirection: 'bottom', arrowPosition: 'center', active: () => [] },
);

const emit = defineEmits<{ (e: 'action', type: WysiwygIconType): void }>();

// Untitled UI WYSIWYG tooltip — Figma:
// dark popover Gray/900, rounded-[8px], shadow-uui-lg
// inner row of WysiwygEditorIcon (dark theme) with gap-[4px], padding [6px 8px]
// arrow: 12px triangle Gray/900 positioned left/center/right of bottom or top
const types: WysiwygIconType[] = [
    'bold', 'italic', 'h1', 'h2', 'quote',
    'link', 'photo', 'list-bullet', 'list-numbers',
];

const arrowSideClass = computed(() =>
    props.arrowDirection === 'bottom'
        ? '-bottom-[6px]'
        : '-top-[6px] rotate-180',
);

const arrowPosClass = computed(() => {
    if (props.arrowPosition === 'left') return 'left-[16px]';
    if (props.arrowPosition === 'right') return 'right-[16px]';
    return 'left-1/2 -translate-x-1/2';
});
</script>

<template>
    <div class="relative inline-flex items-center gap-[4px] rounded-[8px] bg-gray-900 px-[8px] py-[6px] shadow-uui-lg">
        <WysiwygEditorIcon
            v-for="t in types"
            :key="t"
            :type="t"
            theme="dark"
            :active="active.includes(t)"
            @click="emit('action', t)"
        />

        <!-- arrow -->
        <svg
            :class="['absolute size-[12px] text-gray-900', arrowSideClass, arrowPosClass]"
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M6 12L0 0H12L6 12Z" />
        </svg>
    </div>
</template>
