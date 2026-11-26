<script setup lang="ts">
import { computed } from 'vue';
import AvatarAddButton from './AvatarAddButton.vue';

type AvatarGroupSize = 'xs' | 'sm' | 'md';

const props = withDefaults(
    defineProps<{
        avatars?: { src: string; alt?: string }[];
        size?: AvatarGroupSize;
        max?: number;
        addMoreButton?: boolean;
        moreCountOverride?: number;
    }>(),
    {
        avatars: () => [],
        size: 'xs',
        max: 5,
        addMoreButton: true,
        moreCountOverride: 0,
    },
);

const emit = defineEmits<{ (e: 'add'): void }>();

// Untitled UI Avatar group — Figma:
// row gap-[8px], avatars overlap with negative margin
// xs (24): -mr-4, contrast 0.5px, +N text-xs/semibold
// sm (32): -mr-8, contrast 0.5px, +N text-sm/semibold
// md (40): -mr-12, contrast 0.75px, +N text-md/semibold
// outer pr matches the trailing overlap so total width is correct
const sizing = computed(() => {
    const map: Record<
        AvatarGroupSize,
        {
            box: string;
            overlap: string;
            wrapperPad: string;
            border: string;
            badgeText: string;
            addSize: 'xs' | 'sm' | 'md';
        }
    > = {
        xs: {
            box: 'size-[24px]',
            overlap: '-mr-[4px]',
            wrapperPad: 'pr-[4px]',
            border: 'border-[0.5px]',
            badgeText: 'text-xs-semibold',
            addSize: 'xs',
        },
        sm: {
            box: 'size-[32px]',
            overlap: '-mr-[8px]',
            wrapperPad: 'pr-[8px]',
            border: 'border-[0.5px]',
            badgeText: 'text-sm-semibold',
            addSize: 'sm',
        },
        md: {
            box: 'size-[40px]',
            overlap: '-mr-[12px]',
            wrapperPad: 'pr-[12px]',
            border: 'border-[0.75px]',
            badgeText: 'text-md-semibold',
            addSize: 'md',
        },
    };
    return map[props.size];
});

const visible = computed(() => props.avatars.slice(0, props.max));
const moreCount = computed(() =>
    props.moreCountOverride > 0
        ? props.moreCountOverride
        : Math.max(0, props.avatars.length - props.max),
);
</script>

<template>
    <div class="flex items-start gap-[8px]">
        <div :class="['flex items-start', sizing.wrapperPad]">
            <span
                v-for="(a, i) in visible"
                :key="i"
                :class="[
                    'relative shrink-0 overflow-hidden rounded-full border-[1.5px] border-white',
                    sizing.box,
                    sizing.overlap,
                ]"
            >
                <img
                    :src="a.src"
                    :alt="a.alt || ''"
                    class="size-full rounded-full object-cover"
                />
                <span
                    :class="[
                        'pointer-events-none absolute inset-0 rounded-full border-black/[0.08]',
                        sizing.border,
                    ]"
                />
            </span>

            <span
                v-if="moreCount > 0"
                :class="[
                    'relative inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-600',
                    sizing.box,
                    sizing.overlap,
                    sizing.badgeText,
                ]"
            >
                +{{ moreCount }}
                <span
                    :class="[
                        'pointer-events-none absolute inset-0 rounded-full border-black/[0.08]',
                        sizing.border,
                    ]"
                />
            </span>
        </div>

        <AvatarAddButton
            v-if="addMoreButton"
            :size="sizing.addSize"
            @click="emit('add')"
        />
    </div>
</template>
