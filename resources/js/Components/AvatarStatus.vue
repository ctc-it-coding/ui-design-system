<script setup lang="ts">
import Avatar from './Avatar.vue';

withDefaults(
    defineProps<{
        src?: string;
        alt?: string;
        initials?: string;
        online?: boolean;
    }>(),
    {
        src: '',
        alt: '',
        initials: '',
        online: false,
    },
);
</script>

<template>
    <Avatar
        size="2xl"
        :src="src"
        :alt="alt"
        :initials="initials"
        status-icon="online"
        :online="online"
    />
</template>
