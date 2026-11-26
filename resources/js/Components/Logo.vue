<script setup lang="ts">
import Logomark from './Logomark.vue';

withDefaults(
    defineProps<{
        darkMode?: boolean;
        class?: string;
    }>(),
    { darkMode: false },
);
</script>

<template>
    <div :class="['inline-flex items-start', $props.class]">
        <div class="relative h-8 w-[142px]">
            <Logomark class="absolute left-0 top-0" />
            <p
                class="absolute left-10 top-[3px] whitespace-nowrap font-sans text-[15px] font-bold leading-7"
                :class="darkMode ? 'text-white' : 'text-black'"
            >
                KRUNAM-CTC
            </p>
        </div>
    </div>
</template>
