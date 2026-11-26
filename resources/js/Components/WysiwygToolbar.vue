<script setup lang="ts">
import { computed } from 'vue';
import WysiwygEditorIcon from './WysiwygEditorIcon.vue';

type WysiwygToolbarBreakpoint = 'desktop' | 'mobile';
type WysiwygIconType =
    | 'bold' | 'italic' | 'h1' | 'h2' | 'quote'
    | 'link' | 'photo' | 'list-bullet' | 'list-numbers';

const props = withDefaults(
    defineProps<{
        breakpoint?: WysiwygToolbarBreakpoint;
        font?: string;
        active?: WysiwygIconType[];
    }>(),
    { breakpoint: 'desktop', font: 'Inter', active: () => [] },
);

const emit = defineEmits<{
    (e: 'select-font'): void;
    (e: 'action', type: WysiwygIconType): void;
}>();

// Untitled UI WYSIWYG toolbar — Figma:
// desktop: row gap-[12px], font dropdown max-w-[240px], icons gap-[4px] size 32px
// mobile: column gap-[8px], font dropdown full width, icons row gap-[2px] size 28px
const containerClass = computed(() =>
    props.breakpoint === 'mobile'
        ? 'flex w-full flex-col items-start gap-[8px]'
        : 'flex w-[572px] items-center gap-[12px]',
);

const dropdownClass = computed(() =>
    props.breakpoint === 'mobile' ? 'w-full' : 'flex-1 max-w-[240px]',
);

const iconsRowClass = computed(() =>
    props.breakpoint === 'mobile'
        ? 'flex w-full items-start gap-[2px]'
        : 'flex items-start gap-[4px]',
);

const types: WysiwygIconType[] = [
    'bold', 'italic', 'h1', 'h2', 'quote',
    'link', 'photo', 'list-bullet', 'list-numbers',
];
</script>

<template>
    <div :class="containerClass">
        <button
            type="button"
            :class="[dropdownClass, 'flex flex-col items-start gap-[6px]']"
            @click="emit('select-font')"
        >
            <div class="flex w-full items-center gap-[8px] overflow-hidden rounded-[8px] border border-gray-300 bg-white px-[14px] py-[10px] shadow-uui-xs">
                <p class="flex-1 text-left text-md-medium text-gray-900">{{ font }}</p>
                <svg
                    class="size-[20px] shrink-0 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </button>

        <div :class="iconsRowClass">
            <WysiwygEditorIcon
                v-for="t in types"
                :key="t"
                :type="t"
                :active="active.includes(t)"
                :class="breakpoint === 'mobile' ? 'size-[28px]' : ''"
                @click="emit('action', t)"
            />
        </div>
    </div>
</template>
