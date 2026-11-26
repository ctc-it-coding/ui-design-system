<script setup lang="ts">
import { computed } from 'vue';

type Company =
    | 'Layers' | 'Sisyphus' | 'Capsule' | 'Catalog' | 'Quotient'
    | 'Hourglass' | 'Command+R' | 'GlobalBank' | 'Spherule' | 'Lightbox'
    | 'Luminous' | 'FocalPoint' | 'Alt+Shift' | 'Polymath' | 'Nietzsche'
    | 'Epicurious' | 'Boltshift' | 'Acme Corp' | 'Segment' | 'CloudWatch'
    | 'FeatherDev' | 'Biosynthesis' | 'Galileo' | 'Interlock';

type Inset = { t: number; r: number; b: number; l: number };

type Entry = {
    slug: string;
    w: number;
    mark: Inset;
    type: Inset;
};

// Positions captured from Figma (% insets, h=48)
const companies: Record<Company, Entry> = {
    'Layers':       { slug: 'layers',       w: 146, mark: { t: 4.17, r: 69.86, b: 4.17, l: 0 },    type: { t: 29.69, r: 0.08, b: 13.9,  l: 38.86 } },
    'Sisyphus':     { slug: 'sisyphus',     w: 169, mark: { t: 0,    r: 82.84, b: 0,    l: 0 },    type: { t: 25.8,  r: 0.51, b: 17.44, l: 24.84 } },
    'Capsule':      { slug: 'capsule',      w: 165, mark: { t: 4.17, r: 73.33, b: 4.17, l: 0 },    type: { t: 25.65, r: 0.34, b: 16.42, l: 34.56 } },
    'Catalog':      { slug: 'catalog',      w: 160, mark: { t: 4.17, r: 72.5,  b: 4.17, l: 0 },    type: { t: 27.83, r: 0.25, b: 16.57, l: 35.93 } },
    'Quotient':     { slug: 'quotient',     w: 187, mark: { t: 4.17, r: 76.47, b: 4.17, l: 0 },    type: { t: 24.92, r: 0.25, b: 19.78, l: 30.53 } },
    'Hourglass':    { slug: 'hourglass',    w: 194, mark: { t: 4.17, r: 79.9,  b: 4.17, l: 0 },    type: { t: 27.67, r: 0.14, b: 13.24, l: 27.28 } },
    'Command+R':    { slug: 'commandr',     w: 216, mark: { t: 4.17, r: 83.33, b: 4.17, l: 0 },    type: { t: 29.12, r: 0.35, b: 28.58, l: 22.92 } },
    'GlobalBank':   { slug: 'globalbank',   w: 197, mark: { t: 4.17, r: 77.66, b: 4.17, l: 0 },    type: { t: 25.65, r: 0.22, b: 28.67, l: 26.91 } },
    'Spherule':     { slug: 'spherule',     w: 166, mark: { t: 4.17, r: 73.49, b: 4.17, l: 0 },    type: { t: 25.65, r: 0.23, b: 16.42, l: 32.96 } },
    'Lightbox':     { slug: 'lightbox',     w: 167, mark: { t: 4.17, r: 77.25, b: 4.17, l: 0 },    type: { t: 25.59, r: 0.17, b: 13.89, l: 30.34 } },
    'Luminous':     { slug: 'luminous',     w: 175, mark: { t: 4.17, r: 74.86, b: 4.17, l: 0 },    type: { t: 25.65, r: 0.28, b: 28.67, l: 30.83 } },
    'FocalPoint':   { slug: 'focalpoint',   w: 199, mark: { t: 4.17, r: 77.89, b: 4.17, l: 0 },    type: { t: 28.35, r: 0.17, b: 28.6,  l: 29.07 } },
    'Alt+Shift':    { slug: 'altshift',     w: 179, mark: { t: 4.17, r: 75.42, b: 4.17, l: 0 },    type: { t: 25.8,  r: 0.35, b: 28.76, l: 31.66 } },
    'Polymath':     { slug: 'polymath',     w: 178, mark: { t: 4.17, r: 77.53, b: 4.17, l: 0 },    type: { t: 27.48, r: 0.18, b: 14.07, l: 29.18 } },
    'Nietzsche':    { slug: 'nietzsche',    w: 182, mark: { t: 4.17, r: 75.82, b: 4.17, l: 0 },    type: { t: 26.89, r: 0.43, b: 28.98, l: 30.15 } },
    'Epicurious':   { slug: 'epicurious',   w: 189, mark: { t: 4.17, r: 77.25, b: 4.17, l: 0.53 }, type: { t: 26.02, r: 0.26, b: 16.86, l: 28.03 } },
    'Boltshift':    { slug: 'boltshift',    w: 170, mark: { t: 4.17, r: 74.12, b: 4.17, l: 0 },    type: { t: 26.02, r: 0.43, b: 28.48, l: 32.58 } },
    'Acme Corp':    { slug: 'acme',         w: 202, mark: { t: 4.17, r: 78.22, b: 4.17, l: 0 },    type: { t: 26.14, r: 0.1,  b: 15.61, l: 26.08 } },
    'Segment':      { slug: 'segment',      w: 177, mark: { t: 4.17, r: 75.14, b: 4.17, l: 0 },    type: { t: 27.64, r: 0.23, b: 16.76, l: 31.14 } },
    'CloudWatch':   { slug: 'cloudwatch',   w: 202, mark: { t: 4.17, r: 78.22, b: 4.17, l: 0 },    type: { t: 29.65, r: 0.21, b: 28.82, l: 26.19 } },
    'FeatherDev':   { slug: 'featherdev',   w: 198, mark: { t: 4.17, r: 77.78, b: 4.17, l: 0 },    type: { t: 29.18, r: 0.08, b: 28.41, l: 27.24 } },
    'Biosynthesis': { slug: 'biosynthesis', w: 218, mark: { t: 4.17, r: 79.82, b: 4.17, l: 0 },    type: { t: 21.89, r: 0.36, b: 15.61, l: 26.71 } },
    'Galileo':      { slug: 'galileo',      w: 150, mark: { t: 4.17, r: 70.67, b: 4.17, l: 0 },    type: { t: 25.38, r: 0.61, b: 28.66, l: 36.62 } },
    'Interlock':    { slug: 'interlock',    w: 163, mark: { t: 4.17, r: 75.46, b: 4.17, l: 0 },    type: { t: 25.46, r: 0.31, b: 28.86, l: 31.87 } },
};

const props = withDefaults(
    defineProps<{
        company?: Company;
        logotype?: boolean;
        white?: boolean;
        class?: string;
    }>(),
    { company: 'Layers', logotype: true, white: false },
);

const entry = computed(() => companies[props.company]);
const suffix = computed(() => (props.white ? '-white' : ''));
const markSrc = computed(() => `/logos/${entry.value.slug}-mark${suffix.value}.svg`);
const typeSrc = computed(() => `/logos/${entry.value.slug}-type${suffix.value}.svg`);

const containerStyle = computed(() => ({
    width: props.logotype ? `${entry.value.w}px` : '44px',
    height: '48px',
}));

const markStyle = computed(() => {
    const m = entry.value.mark;
    return props.logotype
        ? { top: `${m.t}%`, right: `${m.r}%`, bottom: `${m.b}%`, left: `${m.l}%` }
        : { top: '0', right: '0', bottom: '0', left: '0' };
});

const typeStyle = computed(() => {
    const t = entry.value.type;
    return { top: `${t.t}%`, right: `${t.r}%`, bottom: `${t.b}%`, left: `${t.l}%` };
});
</script>

<template>
    <div class="relative inline-block" :class="$props.class" :style="containerStyle">
        <div class="absolute" :style="markStyle">
            <img :src="markSrc" :alt="`${company} logomark`" class="block h-full w-full" />
        </div>
        <div v-if="logotype" class="absolute" :style="typeStyle">
            <img :src="typeSrc" :alt="`${company} logotype`" class="block h-full w-full" />
        </div>
    </div>
</template>
