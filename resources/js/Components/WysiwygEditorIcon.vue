<script setup lang="ts">
import { computed } from 'vue';

type WysiwygIconType =
    | 'bold'
    | 'italic'
    | 'h1'
    | 'h2'
    | 'quote'
    | 'link'
    | 'photo'
    | 'list-bullet'
    | 'list-numbers';

type WysiwygIconTheme = 'light' | 'dark';

const props = withDefaults(
    defineProps<{
        type?: WysiwygIconType;
        theme?: WysiwygIconTheme;
        active?: boolean;
    }>(),
    { type: 'bold', theme: 'light', active: false },
);

// Untitled UI WYSIWYG editor icon — Figma:
// button 32x32, rounded-[6px]
// light inactive: text-gray-400
// light active:   bg-gray-50,  text-gray-500
// dark  inactive: text-gray-400
// dark  active:   bg-gray-600, text-white
const buttonClass = computed(() => {
    if (props.theme === 'dark') {
        return props.active ? 'bg-gray-600 text-white' : 'text-gray-400';
    }
    return props.active ? 'bg-gray-50 text-gray-500' : 'text-gray-400';
});
</script>

<template>
    <button
        type="button"
        :class="[
            'inline-flex size-[32px] items-center justify-center rounded-[6px]',
            buttonClass,
        ]"
    >
        <svg
            class="size-[16px]"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <!-- Bold -->
            <path
                v-if="type === 'bold'"
                d="M5 4h4a2 2 0 010 4H5V4zm0 4h4.5a2 2 0 010 4H5V8z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <!-- Italic -->
            <path
                v-else-if="type === 'italic'"
                d="M10 4H6.5M9.5 12H6M9.5 4l-3 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <!-- H1 -->
            <g v-else-if="type === 'h1'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4v8M9 4v8M4 8h5" />
                <path d="M11 6l1.5-1v7" />
            </g>
            <!-- H2 -->
            <g v-else-if="type === 'h2'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4v8M9 4v8M4 8h5" />
                <path d="M10.5 6.5a1.5 1.5 0 113 0c0 1.5-3 2-3 4.5h3" />
            </g>
            <!-- Quote -->
            <path
                v-else-if="type === 'quote'"
                d="M5 6.5C5 5.7 5.7 5 6.5 5H7v1H6.5a.5.5 0 00-.5.5v.5h1V10H4V7.5C4 6.7 4.4 5.5 5 5m4.5 1.5C9.5 5.7 10.2 5 11 5h.5v1H11a.5.5 0 00-.5.5v.5h1V10h-3V7.5C8.5 6.7 8.9 5.5 9.5 5"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <!-- Link -->
            <path
                v-else-if="type === 'link'"
                d="M7 9.5L9 7.5M6.5 5.5L7.5 4.5a2.12 2.12 0 013 3l-1 1M9.5 10.5l-1 1a2.12 2.12 0 01-3-3l1-1"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <!-- Photo -->
            <g v-else-if="type === 'photo'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3.5" y="3.5" width="9" height="9" rx="1.5" />
                <circle cx="6" cy="6" r="0.75" />
                <path d="M12.5 10L10 7.5 4 12.5" />
            </g>
            <!-- List bullet -->
            <g v-else-if="type === 'list-bullet'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 4.5h7M6 8h7M6 11.5h7" />
                <circle cx="3.5" cy="4.5" r="0.5" fill="currentColor" />
                <circle cx="3.5" cy="8" r="0.5" fill="currentColor" />
                <circle cx="3.5" cy="11.5" r="0.5" fill="currentColor" />
            </g>
            <!-- List numbers -->
            <g v-else-if="type === 'list-numbers'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.5 4.5h6.5M6.5 8h6.5M6.5 11.5h6.5" />
                <path d="M2.8 3.5L3.5 3v2.5M2.5 5.5h2M2.5 8a.75.75 0 011.5 0c0 .75-1.5 1-1.5 2h1.5M2.5 10.5h1.5l-1 1H4" stroke-width="1" />
            </g>
        </svg>
    </button>
</template>
