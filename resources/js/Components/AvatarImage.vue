<script setup lang="ts">
import { computed } from 'vue';

type AvatarImageType = 'square' | 'portrait';

const props = withDefaults(
    defineProps<{
        src: string;
        alt?: string;
        type?: AvatarImageType;
        name?: string;
        sourceUrl?: string;
        sourceLabel?: string;
    }>(),
    {
        alt: '',
        type: 'square',
        name: '',
        sourceUrl: '',
        sourceLabel: 'Source',
    },
);

// Untitled UI Avatar image — Figma:
// square: 320x320
// portrait: 320x440
// caption: gap-[8px] under image
//   name text-lg/medium Gray/900
//   source text-md/regular underlined Gray/600
const imageSizeClass = computed(() =>
    props.type === 'portrait' ? 'h-[440px] w-[320px]' : 'size-[320px]',
);
</script>

<template>
    <div class="flex flex-col items-start gap-[8px]">
        <div :class="['relative shrink-0', imageSizeClass]">
            <img
                :src="src"
                :alt="alt || name"
                class="absolute inset-0 size-full object-cover"
            />
        </div>
        <div
            v-if="name || sourceUrl || $slots.default"
            class="flex w-full flex-col items-start"
        >
            <p class="w-full text-lg-medium text-gray-900">
                <slot>{{ name }}</slot>
            </p>
            <a
                v-if="sourceUrl"
                :href="sourceUrl"
                class="w-full text-md-regular text-gray-600 underline"
            >
                {{ sourceLabel }}
            </a>
        </div>
    </div>
</template>
