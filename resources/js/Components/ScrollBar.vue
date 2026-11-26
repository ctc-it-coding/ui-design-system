<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        /** Thumb length as fraction of track (0–1) */
        length?: number;
        /** Thumb position as fraction of track (0–1) */
        position?: number;
    }>(),
    { length: 0.25, position: 0 },
);

// Untitled UI Scroll bar — Figma:
// track: w-[16px], p-[4px] → 8px thumb area
// thumb: bg-Gray/200, rounded-[8px]
const clampedLength = computed(() => Math.max(0, Math.min(1, props.length)));
const clampedPosition = computed(() =>
    Math.max(0, Math.min(1 - clampedLength.value, props.position)),
);

const thumbStyle = computed(() => ({
    top: `${clampedPosition.value * 100}%`,
    height: `${clampedLength.value * 100}%`,
}));
</script>

<template>
    <div class="relative flex h-full w-[16px] items-start p-[4px]">
        <div class="relative h-full min-w-px flex-1">
            <div
                class="absolute left-0 right-0 rounded-[8px] bg-gray-200"
                :style="thumbStyle"
            />
        </div>
    </div>
</template>
