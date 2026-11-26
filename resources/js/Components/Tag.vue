<script setup lang="ts">
import { computed } from 'vue';
import TagCheckbox from './TagCheckbox.vue';
import TagCloseX from './TagCloseX.vue';
import TagCount from './TagCount.vue';

type TagSize = 'sm' | 'md' | 'lg';
type TagAction = 'none' | 'x-close' | 'count';

const props = withDefaults(
    defineProps<{
        size?: TagSize;
        action?: TagAction;
        checkbox?: boolean;
        checked?: boolean;
        count?: number | string;
        disabled?: boolean;
    }>(),
    {
        size: 'sm',
        action: 'none',
        checkbox: false,
        checked: false,
        count: 0,
        disabled: false,
    },
);

const emit = defineEmits<{
    (e: 'update:checked', v: boolean): void;
    (e: 'close'): void;
}>();

// Untitled UI Tag — Figma:
// outer: bg-white border-gray/300 rounded-[6px]
// sm/md: px-[8px] py-[3px] text-xs/medium  | lg: px-[10px] py-[4px] text-sm/medium
// text Gray/700, content gap 4px (sm/md) / 6px (lg)
const outerSizeClass = computed(() => {
    const map: Record<TagSize, string> = {
        sm: 'px-[8px] py-[3px] text-xs-medium',
        md: 'px-[8px] py-[3px] text-xs-medium',
        lg: 'px-[10px] py-[4px] text-sm-medium',
    };
    return map[props.size];
});

const contentGapClass = computed(() =>
    props.size === 'lg' ? 'gap-[6px]' : 'gap-[4px]',
);
</script>

<template>
    <span
        :class="[
            'inline-flex items-center justify-center rounded-[6px] border border-gray-300 bg-white text-gray-700',
            outerSizeClass,
        ]"
    >
        <span :class="['inline-flex items-center', contentGapClass]">
            <TagCheckbox
                v-if="checkbox"
                :model-value="checked"
                :size="size"
                :disabled="disabled"
                @update:model-value="emit('update:checked', $event)"
            />
            <slot name="leading" />
            <slot>Label</slot>
            <slot name="trailing">
                <TagCloseX
                    v-if="action === 'x-close'"
                    :size="size"
                    @click="emit('close')"
                />
                <TagCount
                    v-else-if="action === 'count'"
                    :size="size"
                    :count="count"
                />
            </slot>
        </span>
    </span>
</template>
