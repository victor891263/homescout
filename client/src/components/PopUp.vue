<template>
    <p v-if="visible" class="popup">{{ msg }}</p>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue"

defineProps<{
    msg: string
}>()

const visible = ref(true)

setTimeout(() => visible.value = false, 5000)
</script>

<style lang="scss" scoped>
.popup {
    align-items: center;
    background-color: red;
    bottom: 0;
    color: var(--color-1);
    left: 0;
    padding: 0.625rem 0.875rem;
    position: fixed;
    right: 0;
}
</style>