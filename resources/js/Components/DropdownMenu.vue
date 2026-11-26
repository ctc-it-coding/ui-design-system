<script setup lang="ts">
withDefaults(
    defineProps<{
        width?: number | string;
    }>(),
    { width: 240 },
);
</script>

<template>
    <!--
        Untitled UI Dropdown — Figma:
        panel: bg-white, border Gray/200, rounded-[8px], shadow-uui-lg
        header section (border-b Gray/200) + menu items section py-[4px]
        default width 240px
    -->
    <div
        :style="{ width: typeof width === 'number' ? `${width}px` : width }"
        class="flex flex-col items-start overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-uui-lg"
    >
        <slot name="header" />
        <div class="flex w-full flex-col items-start bg-white py-[4px]">
            <slot />
        </div>
        <slot name="footer" />
    </div>
</template>
