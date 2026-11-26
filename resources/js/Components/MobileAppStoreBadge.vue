<script setup lang="ts">
import { computed } from 'vue';

type Store = 'google-play' | 'app-store';
type Size = 'md' | 'lg';
type Style = 'brand' | 'black-outline' | 'white-outline';

const props = withDefaults(
    defineProps<{
        store?: Store;
        size?: Size;
        styleVariant?: Style;
    }>(),
    { store: 'google-play', size: 'md', styleVariant: 'brand' },
);

// Container dimensions per store × size — from Figma
const dimensions: Record<Store, Record<Size, { w: number; h: number; r: number }>> = {
    'google-play': { md: { w: 135, h: 40, r: 5 }, lg: { w: 148.5, h: 44, r: 5 } },
    'app-store':   { md: { w: 120, h: 40, r: 7 }, lg: { w: 132,   h: 44, r: 7 } },
};

const dim = computed(() => dimensions[props.store][props.size]);

const containerClass = computed(() => {
    switch (props.styleVariant) {
        case 'brand':
            return 'border border-[#a6a6a6] bg-black';
        case 'black-outline':
            return 'border border-black bg-white';
        case 'white-outline':
            return 'border border-white bg-transparent';
    }
});

const containerStyle = computed(() => ({
    width: `${dim.value.w}px`,
    height: `${dim.value.h}px`,
    borderRadius: `${dim.value.r}px`,
}));

// Brand + white-outline use light text/icon (white). Black-outline uses dark text/icon.
const tone = computed(() => (props.styleVariant === 'black-outline' ? 'dark' : 'light'));

// Logo style suffix: brand has its own colored logo, bo and wo each have own
const logoStyle = computed(() => {
    if (props.styleVariant === 'brand') return 'brand';
    if (props.styleVariant === 'black-outline') return 'bo';
    return 'wo';
});

const sz = computed(() => props.size);
</script>

<template>
    <div class="relative overflow-hidden" :class="containerClass" :style="containerStyle">
        <!-- Google Play -->
        <template v-if="store === 'google-play'">
            <img :src="`/logos/store/gp-${sz}-text-${tone}.svg`"    alt="Google Play" class="absolute" style="top: 42.62%; right: 6.8%;   bottom: 14.81%; left: 30.4%" />
            <img :src="`/logos/store/gp-${sz}-getiton-${tone}.svg`" alt="GET IT ON"   class="absolute" style="top: 17.16%; right: 40.59%; bottom: 67.17%; left: 30.63%" />
            <img :src="`/logos/store/gp-${sz}-logo-${logoStyle}.svg`" alt=""          class="absolute" style="top: 17.85%; right: 75.51%; bottom: 17.85%; left: 7.39%" />
        </template>

        <!-- App Store -->
        <template v-else-if="store === 'app-store'">
            <img :src="`/logos/store/as-${sz}-text-${tone}.svg`"     alt="App Store"       class="absolute" style="top: 44.43%; right: 8.73%;  bottom: 16.26%; left: 28.71%" />
            <img :src="`/logos/store/as-${sz}-download-${tone}.svg`" alt="Download on the" class="absolute" style="top: 21.04%; right: 12.66%; bottom: 63.03%; left: 29.71%" />
            <img :src="`/logos/store/as-${sz}-apple-${tone}.svg`"    alt=""                class="absolute" style="top: 21.8%;  right: 76.93%; bottom: 23.76%; left: 8.31%" />
        </template>
    </div>
</template>
