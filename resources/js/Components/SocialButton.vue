<script setup lang="ts">
import { computed } from 'vue';

type Social = 'google' | 'facebook' | 'apple' | 'twitter' | 'figma' | 'dribbble';
type Theme = 'brand' | 'color' | 'gray';

const props = withDefaults(
    defineProps<{
        social?: Social;
        theme?: Theme;
        supportingText?: boolean;
        disabled?: boolean;
        type?: 'button' | 'submit';
    }>(),
    { social: 'google', theme: 'brand', supportingText: true, disabled: false, type: 'button' },
);

// Label — from Figma
const labels: Record<Social, string> = {
    google: 'Sign in with Google',
    facebook: 'Sign in with Facebook',
    apple: 'Sign in with Apple',
    twitter: 'Sign in with X',
    figma: 'Sign in with Figma',
    dribbble: 'Sign in with Dribbble',
};

// Button background + text (Brand theme — from Figma)
// For Google, all 3 themes share white bg; only icon differs
const containers: Record<Social, string> = {
    google:   'bg-white border border-gray-300 text-gray-700',
    facebook: 'bg-[#1877F2] text-white',
    apple:    'bg-black text-white',
    twitter:  'bg-black text-white',
    figma:    'bg-black text-white',
    dribbble: 'bg-[#EA4C89] text-white',
};
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="[
            'inline-flex items-center justify-center gap-[12px] rounded-uui-md',
            'px-[16px] py-[10px] shadow-uui-xs font-sans text-[16px] font-semibold leading-[24px]',
            'whitespace-nowrap outline-none transition disabled:cursor-not-allowed disabled:opacity-50',
            containers[social],
        ]"
    >
        <!-- Icon slot -->
        <span class="relative block size-[24px] shrink-0 overflow-hidden">
            <!-- Google: 4-color composite (Brand theme) or Gray monochrome -->
            <template v-if="social === 'google' && theme === 'gray'">
                <img src="/logos/social/google-gray.svg" alt="" class="absolute block" style="inset: 0 0.98% 0 1%" />
            </template>
            <template v-else-if="social === 'google'">
                <img src="/logos/social/google-brand-blue.svg"   alt="" class="absolute block" style="top: 40.99%; right: 0.97%;  bottom: 12.07%; left: 51%" />
                <img src="/logos/social/google-brand-green.svg"  alt="" class="absolute block" style="top: 59.58%; right: 15.86%; bottom: 0;       left: 6.32%" />
                <img src="/logos/social/google-brand-yellow.svg" alt="" class="absolute block" style="top: 27.56%; right: 77.07%; bottom: 27.54%; left: 1%" />
                <img src="/logos/social/google-brand-red.svg"    alt="" class="absolute block" style="top: 0;      right: 15.54%; bottom: 59.56%; left: 6.32%" />
            </template>

            <template v-else-if="social === 'facebook'">
                <img src="/logos/social/facebook-white.svg" alt="" class="absolute block" style="inset: 0 0 0.61% 0" />
            </template>

            <template v-else-if="social === 'apple'">
                <img src="/logos/social/apple-white.svg" alt="" class="absolute block" style="top: 0; right: 11.54%; bottom: 8.33%; left: 11.25%" />
            </template>

            <template v-else-if="social === 'twitter'">
                <img src="/logos/social/x-white.svg" alt="" class="absolute block" style="inset: 4.17% 2.12%" />
            </template>

            <template v-else-if="social === 'figma'">
                <img src="/logos/social/figma-1.svg" alt="" class="absolute block" style="bottom: 0;        left: 16.67%; right: 50%;     top: 66.67%" />
                <img src="/logos/social/figma-2.svg" alt="" class="absolute block" style="bottom: 33.33%;   left: 16.67%; right: 50%;     top: 33.33%" />
                <img src="/logos/social/figma-3.svg" alt="" class="absolute block" style="bottom: 66.67%;   left: 16.67%; right: 50%;     top: 0" />
                <img src="/logos/social/figma-4.svg" alt="" class="absolute block" style="bottom: 66.67%;   left: 50%;    right: 16.67%;  top: 0" />
                <img src="/logos/social/figma-5.svg" alt="" class="absolute block" style="bottom: 33.33%;   left: 50%;    right: 16.67%;  top: 33.33%" />
            </template>

            <template v-else-if="social === 'dribbble'">
                <img src="/logos/social/dribbble-white.svg" alt="" class="absolute inset-0 block size-full" />
            </template>
        </span>

        <span v-if="supportingText">{{ labels[social] }}</span>
    </button>
</template>
