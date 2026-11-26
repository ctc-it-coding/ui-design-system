<script setup lang="ts">
import { computed } from 'vue';
import VerifiedTick from './VerifiedTick.vue';

type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
    defineProps<{
        size?: Size;
        src?: string;
        alt?: string;
        initials?: string;
        placeholder?: boolean;
        verified?: boolean;
        contrastBorder?: boolean;
    }>(),
    {
        size: 'md',
        src: '',
        alt: '',
        initials: '',
        placeholder: false,
        verified: false,
        contrastBorder: true,
    },
);

const sizePx = computed(() => ({ sm: 72, md: 96, lg: 160 })[props.size]);

const rootClass = computed(() =>
    ({
        sm: 'size-[72px]',
        md: 'size-[96px]',
        lg: 'size-[160px]',
    })[props.size],
);

const contentClass = computed(() =>
    props.size === 'sm'
        ? 'border-[3px] shadow-uui-md'
        : 'border-4 shadow-uui-lg',
);

const textClass = computed(() =>
    ({
        sm: 'text-display-xs-semibold text-[30px] leading-[38px]',
        md: 'text-display-md-semibold',
        lg: 'text-display-xl-semibold',
    })[props.size],
);

const tickSize = computed(() => ({ sm: 20, md: 24, lg: 32 })[props.size]);
const tickOffset = computed(() => ({ sm: 0, md: 2, lg: 4 })[props.size]);

const showImage = computed(() => !props.placeholder && props.src);
const showInitials = computed(() => props.placeholder || (!props.src && props.initials));
</script>

<template>
    <div :class="['relative rounded-full', rootClass]">
        <div
            :class="[
                'absolute inset-0 overflow-hidden rounded-full border-solid border-white',
                contentClass,
                placeholder ? 'bg-gray-100' : '',
            ]"
        >
            <img
                v-if="showImage"
                :src="src"
                :alt="alt"
                class="absolute inset-0 size-full rounded-full object-cover"
            />
            <span
                v-if="showInitials"
                :class="[
                    'absolute inset-0 flex items-center justify-center text-gray-600',
                    textClass,
                ]"
            >
                {{ initials || 'OR' }}
            </span>
            <div
                v-if="contrastBorder"
                class="pointer-events-none absolute inset-0 rounded-full border border-black opacity-[0.08]"
            />
        </div>
        <div
            v-if="verified"
            class="absolute"
            :style="{ right: tickOffset + 'px', bottom: tickOffset + 'px' }"
        >
            <VerifiedTick :size="tickSize" color="#2E90FA" />
        </div>
    </div>
</template>
