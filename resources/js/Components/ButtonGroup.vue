<script setup lang="ts">
// Wrapper that groups <ButtonGroupBase> children into a connected pill.
// Outer: border gray-300, rounded-uui-md, shadow-uui-xs, overflow-clip.
// The last child's right border is hidden via overflow-clip.
</script>

<template>
    <div
        class="relative inline-flex items-start overflow-clip rounded-uui-md border border-gray-300 shadow-uui-xs"
    >
        <slot />
    </div>
</template>
