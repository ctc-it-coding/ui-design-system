<script setup lang="ts">
import { computed } from 'vue';

type ItemType = 'default' | 'icon-leading' | 'avatar-leading' | 'dot-leading';
type ItemState = 'default' | 'hover' | 'focus' | 'disabled';

const props = withDefaults(
    defineProps<{
        type?: ItemType;
        state?: ItemState;
        selected?: boolean;
        disabled?: boolean;
        label?: string;
        supportingText?: string;
        avatarSrc?: string;
        dotColor?: string;
    }>(),
    {
        type: 'default',
        state: 'default',
        selected: false,
        disabled: false,
        label: 'Olivia Rhye',
        supportingText: '@olivia',
        avatarSrc: '',
        dotColor: '#17B26A',
    },
);

// Untitled UI Input dropdown menu item — Figma:
// outer: w-full px-[6px] py-px
// inner: flex-1 pl-[8px] pr-[10px] py-[10px] rounded-[6px], gap-[8px]
// hover/selected bg Gray/50 (selected disabled Gray/25)
// label text-md/medium Gray/900 (Gray/500 disabled)
// supporting text-md/regular Gray/600 (Gray/500 disabled)
// avatar 24px, dot 8px, icon 20px
// trailing check icon 20px Brand/600 (Gray/400 disabled) when selected
const effectiveState = computed<ItemState>(() =>
    props.disabled ? 'disabled' : props.state,
);

const innerBgClass = computed(() => {
    if (props.selected && effectiveState.value === 'disabled') return 'bg-gray-25';
    if (props.selected) return 'bg-gray-50';
    if (effectiveState.value === 'hover') return 'bg-gray-50';
    if (effectiveState.value === 'focus') return 'bg-white shadow-uui-ring-gray';
    return '';
});

const labelColorClass = computed(() =>
    effectiveState.value === 'disabled' ? 'text-gray-500' : 'text-gray-900',
);

const supportingColorClass = computed(() =>
    effectiveState.value === 'disabled' ? 'text-gray-500' : 'text-gray-600',
);

const checkColorClass = computed(() =>
    effectiveState.value === 'disabled' ? 'text-gray-400' : 'text-brand-600',
);
</script>

<template>
    <div class="flex w-full items-center px-[6px] py-px">
        <div
            :class="[
                'flex flex-1 items-center gap-[8px] rounded-[6px] pl-[8px] pr-[10px] py-[10px]',
                innerBgClass,
            ]"
        >
            <div class="flex min-w-0 flex-1 items-center gap-[8px]">
                <slot name="leading">
                    <!-- avatar -->
                    <div
                        v-if="type === 'avatar-leading'"
                        class="relative size-[24px] shrink-0"
                    >
                        <img
                            v-if="avatarSrc"
                            :src="avatarSrc"
                            :alt="label"
                            class="size-full rounded-full object-cover"
                        />
                        <div v-else class="size-full rounded-full bg-gray-100" />
                        <div class="absolute inset-0 rounded-full border-[0.5px] border-black/[0.08]" />
                    </div>

                    <!-- dot -->
                    <span
                        v-else-if="type === 'dot-leading'"
                        class="relative inline-flex size-[10px] shrink-0 items-center justify-center"
                    >
                        <span
                            class="size-[8px] rounded-full"
                            :style="{
                                backgroundColor:
                                    effectiveState === 'disabled' ? '#D0D5DD' : dotColor,
                            }"
                        />
                    </span>

                    <!-- icon -->
                    <svg
                        v-else-if="type === 'icon-leading'"
                        class="size-[20px] shrink-0"
                        :class="effectiveState === 'disabled' ? 'text-gray-400' : 'text-gray-500'"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M16.6667 17.5C16.6667 16.337 16.6667 15.7555 16.5232 15.2824C16.2002 14.217 15.3664 13.3831 14.3009 13.0602C13.8278 12.9167 13.2463 12.9167 12.0834 12.9167H7.91671C6.75376 12.9167 6.17228 12.9167 5.69915 13.0602C4.63371 13.3831 3.79984 14.217 3.4769 15.2824C3.33337 15.7555 3.33337 16.337 3.33337 17.5M13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92897 10 6.25004 8.32107 6.25004 6.25C6.25004 4.17893 7.92897 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25Z"
                            stroke="currentColor"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </slot>

                <p :class="['shrink-0 text-md-medium', labelColorClass]">
                    <slot>{{ label }}</slot>
                </p>
                <p
                    v-if="supportingText"
                    :class="['shrink-0 text-md-regular', supportingColorClass]"
                >
                    <slot name="supporting">{{ supportingText }}</slot>
                </p>
            </div>

            <svg
                v-if="selected"
                :class="['size-[20px] shrink-0', checkColorClass]"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="currentColor"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>
