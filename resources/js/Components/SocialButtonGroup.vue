<script setup lang="ts">
import SocialButton from './SocialButton.vue';

type Style = 'buttons' | 'icons';
type Theme = 'brand' | 'color' | 'gray';

withDefaults(
    defineProps<{
        style?: Style;
        theme?: Theme;
    }>(),
    { style: 'buttons', theme: 'brand' },
);

const socials = ['google', 'facebook', 'apple'] as const;
</script>

<template>
    <div
        class="relative flex w-[360px] items-center justify-center gap-[12px]"
        :class="style === 'icons' ? 'flex-row' : 'flex-col'"
    >
        <SocialButton
            v-for="s in socials"
            :key="s"
            :social="s"
            :theme="theme"
            :supporting-text="style !== 'icons'"
            :class="style === 'icons' ? 'flex-1 min-w-0' : 'w-full'"
        />
    </div>
</template>
