<script setup lang="ts">
import { computed } from 'vue';
import Avatar from './Avatar.vue';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type State = 'default' | 'hover' | 'focus';
type StatusIcon = 'none' | 'online' | 'company' | 'verified';

const props = withDefaults(
    defineProps<{
        size?: Size;
        state?: State;
        statusIcon?: StatusIcon;
        name?: string;
        supportingText?: string;
        src?: string;
        initials?: string;
        companySrc?: string;
        online?: boolean;
    }>(),
    {
        size: 'md',
        state: 'default',
        statusIcon: 'none',
        name: 'Olivia Rhye',
        supportingText: 'olivia@untitledui.com',
        src: '',
        initials: '',
        companySrc: '',
        online: true,
    },
);

const gap = computed(
    () => ({ sm: 'gap-[10px]', md: 'gap-[12px]', lg: 'gap-[12px]', xl: 'gap-[16px]' })[props.size],
);

const nameClass = computed(
    () =>
        ({
            sm: 'text-sm-semibold',
            md: 'text-sm-semibold',
            lg: 'text-md-semibold',
            xl: 'text-lg-semibold',
        })[props.size],
);

const supportingClass = computed(
    () =>
        ({
            sm: 'text-xs-regular',
            md: 'text-sm-regular',
            lg: 'text-md-regular',
            xl: 'text-md-regular',
        })[props.size],
);

const focusRing = computed(() => (props.state === 'focus' ? 'ring-4 ring-[rgba(152,162,179,0.14)]' : ''));
</script>

<template>
    <div :class="['flex items-center', gap]">
        <div :class="['shrink-0 rounded-full', focusRing]">
            <Avatar
                :size="size"
                :src="src"
                :alt="name"
                :initials="initials"
                :status-icon="statusIcon"
                :online="online"
                :company-src="companySrc"
            />
        </div>
        <div class="flex flex-col items-start whitespace-nowrap">
            <p :class="[nameClass, 'text-gray-700']">{{ name }}</p>
            <p :class="[supportingClass, 'text-gray-600']">{{ supportingText }}</p>
        </div>
    </div>
</template>
