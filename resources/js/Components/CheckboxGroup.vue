<script setup lang="ts">
withDefaults(
    defineProps<{
        label?: string;
        hint?: string;
    }>(),
    { label: '', hint: '' },
);
</script>

<template>
    <!--
        Untitled UI Checkbox group — Figma:
        wrapper: flex-col gap-[12px] w-full
        renders a stack of <CheckboxGroupItem> via slot
        optional label (text-sm/medium Gray/700) + hint (text-sm/regular Gray/600)
    -->
    <div class="flex w-full flex-col items-start gap-[6px]">
        <p
            v-if="label"
            class="text-sm-medium text-gray-700"
        >
            {{ label }}
        </p>

        <div class="flex w-full flex-col items-start gap-[12px]">
            <slot />
        </div>

        <p
            v-if="hint"
            class="text-sm-regular text-gray-600"
        >
            {{ hint }}
        </p>
    </div>
</template>
