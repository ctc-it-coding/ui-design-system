<script setup lang="ts">
import { computed } from 'vue';

type InputDropdownType =
    | 'default'
    | 'icon-leading'
    | 'avatar-leading'
    | 'dot-leading'
    | 'search'
    | 'tags';

const props = withDefaults(
    defineProps<{
        type?: InputDropdownType;
        label?: string;
        hint?: string;
        placeholder?: string;
        value?: string;
        supportingText?: string;
        avatarSrc?: string;
        dotColor?: string;
        focused?: boolean;
        open?: boolean;
    }>(),
    {
        type: 'default',
        label: '',
        hint: '',
        placeholder: 'Select team member',
        value: '',
        supportingText: '',
        avatarSrc: '',
        dotColor: '#17B26A',
        focused: false,
        open: false,
    },
);

const emit = defineEmits<{ (e: 'click'): void }>();

// Untitled UI Input dropdown — Figma:
// label text-sm/medium Gray/700, hint text-sm/regular Gray/600
// input box: bg-white border Gray/300 rounded-[8px] px-[14px] py-[10px] shadow-uui-xs
// focused: border Brand/300 + shadow uui-ring-brand-shadow-xs
// placeholder text-md/regular Gray/500
// value text-md/medium Gray/900, supporting text-md/regular Gray/600
// chevron 20px Gray/500
const isFocusedOrOpen = computed(() => props.focused || props.open);

const inputBoxClass = computed(() =>
    isFocusedOrOpen.value
        ? 'border-brand-300 shadow-uui-ring-brand-shadow-xs'
        : 'border-gray-300 shadow-uui-xs',
);

const hasValue = computed(() => props.value.length > 0 || props.type === 'tags');
</script>

<template>
    <div class="flex w-full flex-col items-start gap-[8px]">
        <div class="flex w-full flex-col items-start gap-[6px]">
            <p
                v-if="label"
                class="text-sm-medium text-gray-700"
            >
                {{ label }}
            </p>

            <button
                type="button"
                :class="[
                    'flex w-full items-center gap-[8px] overflow-hidden rounded-[8px] border bg-white px-[14px] py-[10px] outline-none',
                    inputBoxClass,
                ]"
                @click="emit('click')"
            >
                <div class="flex min-w-0 flex-1 items-center gap-[8px]">
                    <slot name="leading">
                        <!-- search icon -->
                        <svg
                            v-if="type === 'search'"
                            class="size-[20px] shrink-0 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                                stroke="currentColor"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <!-- avatar -->
                        <div
                            v-else-if="type === 'avatar-leading' && hasValue"
                            class="relative size-[24px] shrink-0"
                        >
                            <img
                                v-if="avatarSrc"
                                :src="avatarSrc"
                                :alt="value"
                                class="size-full rounded-full object-cover"
                            />
                            <div v-else class="size-full rounded-full bg-gray-100" />
                            <div class="absolute inset-0 rounded-full border-[0.5px] border-black/[0.08]" />
                        </div>

                        <!-- dot -->
                        <span
                            v-else-if="type === 'dot-leading' && hasValue"
                            class="inline-flex size-[10px] shrink-0 items-center justify-center"
                        >
                            <span
                                class="size-[8px] rounded-full"
                                :style="{ backgroundColor: dotColor }"
                            />
                        </span>

                        <!-- generic icon -->
                        <svg
                            v-else-if="type === 'icon-leading'"
                            class="size-[20px] shrink-0 text-gray-500"
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

                    <!-- tags slot -->
                    <div
                        v-if="type === 'tags'"
                        class="flex min-w-0 flex-1 items-center gap-[6px]"
                    >
                        <slot name="tags" />
                    </div>

                    <!-- value / placeholder -->
                    <template v-else>
                        <p
                            v-if="hasValue"
                            class="shrink-0 text-md-medium text-gray-900"
                        >
                            {{ value }}
                        </p>
                        <p
                            v-else
                            class="flex-1 truncate text-left text-md-regular text-gray-500"
                        >
                            {{ placeholder }}
                        </p>
                        <p
                            v-if="hasValue && supportingText"
                            class="shrink-0 text-md-regular text-gray-600"
                        >
                            {{ supportingText }}
                        </p>
                    </template>
                </div>

                <svg
                    :class="[
                        'size-[20px] shrink-0 text-gray-500 transition-transform',
                        open && 'rotate-180',
                    ]"
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
            </button>
        </div>

        <p
            v-if="hint"
            class="w-full text-left text-sm-regular text-gray-600"
        >
            {{ hint }}
        </p>
    </div>
</template>
