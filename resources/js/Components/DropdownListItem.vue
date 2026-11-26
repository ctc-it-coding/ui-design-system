<script setup lang="ts">
import { computed } from 'vue';

type DropdownListItemState = 'default' | 'hover' | 'focus' | 'disabled';

const props = withDefaults(
    defineProps<{
        label?: string;
        shortcut?: string;
        state?: DropdownListItemState;
        divider?: boolean;
        disabled?: boolean;
    }>(),
    { label: 'Placeholder', shortcut: '', state: 'default', divider: false, disabled: false },
);

// Untitled UI Dropdown list item — Figma:
// outer: px-[6px] py-px (divider variant: py-[4px])
// inner content: flex-1 px-[10px] py-[9px] rounded-[6px] gap-[12px]
// label text-sm/medium: Gray/700 (default), Gray/800 (hover), Gray/500 (disabled)
// shortcut text-xs/regular Gray/500
// hover bg Gray/50, focus ring uui-ring-gray
// icon/checkbox slot: gap-[8px] with label
const effectiveState = computed<DropdownListItemState>(() =>
    props.disabled ? 'disabled' : props.state,
);

const innerStateClass = computed(() => {
    switch (effectiveState.value) {
        case 'hover':
            return 'bg-gray-50';
        case 'focus':
            return 'bg-white shadow-uui-ring-gray';
        default:
            return '';
    }
});

const labelColorClass = computed(() => {
    switch (effectiveState.value) {
        case 'hover':
            return 'text-gray-800';
        case 'disabled':
            return 'text-gray-500';
        default:
            return 'text-gray-700';
    }
});
</script>

<template>
    <div
        v-if="divider"
        class="flex w-full items-center px-[6px] py-[4px]"
    >
        <div class="h-px flex-1 bg-gray-200" />
    </div>
    <div
        v-else
        class="flex w-full items-center px-[6px] py-px"
    >
        <div
            :class="[
                'flex flex-1 items-center gap-[12px] rounded-[6px] px-[10px] py-[9px]',
                innerStateClass,
            ]"
        >
            <div class="flex flex-1 items-center gap-[8px] min-w-0">
                <slot name="leading" />
                <p
                    :class="[
                        'flex-1 truncate text-sm-medium',
                        labelColorClass,
                    ]"
                >
                    <slot>{{ label }}</slot>
                </p>
            </div>
            <slot name="trailing">
                <p
                    v-if="shortcut"
                    class="shrink-0 text-xs text-gray-500 whitespace-nowrap"
                    style="font-weight: 400; line-height: 18px;"
                >
                    {{ shortcut }}
                </p>
            </slot>
        </div>
    </div>
</template>
