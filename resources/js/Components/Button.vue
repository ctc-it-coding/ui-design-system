<script setup lang="ts">
import { computed } from 'vue';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Hierarchy =
    | 'primary'
    | 'secondary-gray'
    | 'secondary-color'
    | 'tertiary-gray'
    | 'tertiary-color'
    | 'link-gray'
    | 'link-color'
    | 'destructive-primary'
    | 'destructive-secondary'
    | 'destructive-tertiary'
    | 'destructive-link';

const props = withDefaults(
    defineProps<{
        size?: Size;
        hierarchy?: Hierarchy;
        disabled?: boolean;
        type?: 'button' | 'submit' | 'reset';
    }>(),
    { size: 'md', hierarchy: 'primary', disabled: false, type: 'button' },
);

// Size classes — values from Figma (Size=X, Hierarchy=Primary/Secondary, State=Default)
// px / py / gap / text / icon
const sizeClasses: Record<Size, { wrapper: string; text: string; icon: string }> = {
    sm:   { wrapper: 'px-[12px] py-[8px]  gap-[4px]',  text: 'text-[14px] leading-[20px]', icon: 'size-[20px]' },
    md:   { wrapper: 'px-[14px] py-[10px] gap-[4px]',  text: 'text-[14px] leading-[20px]', icon: 'size-[20px]' },
    lg:   { wrapper: 'px-[16px] py-[10px] gap-[6px]',  text: 'text-[16px] leading-[24px]', icon: 'size-[20px]' },
    xl:   { wrapper: 'px-[18px] py-[12px] gap-[6px]',  text: 'text-[16px] leading-[24px]', icon: 'size-[20px]' },
    '2xl':{ wrapper: 'px-[22px] py-[16px] gap-[10px]', text: 'text-[18px] leading-[28px]', icon: 'size-[24px]' },
};

// Link variants have no padding — only gap + text colors
const linkSizeClasses: Record<Size, { wrapper: string; text: string; icon: string }> = {
    sm:   { wrapper: 'gap-[6px]', text: 'text-[14px] leading-[20px]', icon: 'size-[20px]' },
    md:   { wrapper: 'gap-[6px]', text: 'text-[14px] leading-[20px]', icon: 'size-[20px]' },
    lg:   { wrapper: 'gap-[6px]', text: 'text-[16px] leading-[24px]', icon: 'size-[20px]' },
    xl:   { wrapper: 'gap-[6px]', text: 'text-[16px] leading-[24px]', icon: 'size-[20px]' },
    '2xl':{ wrapper: 'gap-[6px]', text: 'text-[18px] leading-[28px]', icon: 'size-[24px]' },
};

// Hierarchy classes — values from Figma (Hierarchy=X, State=Default)
const hierarchyClasses: Record<Hierarchy, string> = {
    primary:
        'bg-brand-600 border border-brand-600 text-white shadow-uui-xs ' +
        'hover:bg-brand-700 hover:border-brand-700 ' +
        'focus:shadow-uui-ring-brand-shadow-xs ' +
        'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
    'secondary-gray':
        'bg-white border border-gray-300 text-gray-700 shadow-uui-xs ' +
        'hover:bg-gray-50 hover:text-gray-800 ' +
        'focus:shadow-uui-ring-gray-shadow-xs ' +
        'disabled:bg-white disabled:border-gray-200 disabled:text-gray-300 disabled:shadow-none',
    'secondary-color':
        'bg-white border border-brand-300 text-brand-700 shadow-uui-xs ' +
        'hover:bg-brand-50 hover:text-brand-800 ' +
        'focus:shadow-uui-ring-brand-shadow-xs ' +
        'disabled:bg-white disabled:border-gray-200 disabled:text-gray-300 disabled:shadow-none',
    'tertiary-gray':
        'text-gray-600 ' +
        'hover:bg-gray-50 hover:text-gray-700 ' +
        'disabled:text-gray-300',
    'tertiary-color':
        'text-brand-700 ' +
        'hover:bg-brand-50 hover:text-brand-800 ' +
        'disabled:text-gray-300',
    'link-gray':
        'text-gray-600 ' +
        'hover:text-gray-700 ' +
        'disabled:text-gray-300',
    'link-color':
        'text-brand-700 ' +
        'hover:text-brand-800 ' +
        'disabled:text-gray-300',
    'destructive-primary':
        'bg-error-600 border border-error-600 text-white shadow-uui-xs ' +
        'hover:bg-error-700 hover:border-error-700 ' +
        'focus:shadow-uui-ring-error-shadow-xs ' +
        'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:shadow-none',
    'destructive-secondary':
        'bg-white border border-error-300 text-error-700 shadow-uui-xs ' +
        'hover:bg-error-50 hover:text-error-800 ' +
        'focus:shadow-uui-ring-error-shadow-xs ' +
        'disabled:bg-white disabled:border-gray-200 disabled:text-gray-300 disabled:shadow-none',
    'destructive-tertiary':
        'text-error-700 ' +
        'hover:bg-error-50 hover:text-error-800 ' +
        'disabled:text-gray-300',
    'destructive-link':
        'text-error-700 ' +
        'hover:text-error-800 ' +
        'disabled:text-gray-300',
};

const isLink = computed(
    () =>
        props.hierarchy === 'link-gray' ||
        props.hierarchy === 'link-color' ||
        props.hierarchy === 'destructive-link',
);

const sizing = computed(() => (isLink.value ? linkSizeClasses[props.size] : sizeClasses[props.size]));

const wrapperClass = computed(() =>
    [
        'inline-flex items-center justify-center font-semibold whitespace-nowrap outline-none transition',
        'font-sans disabled:cursor-not-allowed',
        isLink.value ? '' : 'rounded-uui-md',
        sizing.value.wrapper,
        sizing.value.text,
        hierarchyClasses[props.hierarchy],
    ].join(' '),
);
</script>

<template>
    <button :type="type" :disabled="disabled" :class="wrapperClass">
        <span v-if="$slots.leading" :class="sizing.icon">
            <slot name="leading" />
        </span>
        <span><slot>Button CTA</slot></span>
        <span v-if="$slots.trailing" :class="sizing.icon">
            <slot name="trailing" />
        </span>
    </button>
</template>
