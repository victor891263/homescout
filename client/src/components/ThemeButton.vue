<template>
    <button @click="toggleTheme()">
        <SunIcon v-if="theme === 'light'" class="sun" />
        <MoonIcon v-if="theme === 'dark'" class="moon" />
    </button>
</template>

<script setup lang="ts">
import SunIcon from "@/components/icons/SunIcon.vue"
import {ref, watch} from "vue"
import MoonIcon from "@/components/icons/MoonIcon.vue"

const theme = ref(document.body.dataset.theme)

function toggleTheme() {
    if (theme.value === "light") theme.value = "dark"
    else if (theme.value === "dark") theme.value = "light"
}

watch(theme, (value, oldValue, onCleanup) => {
    document.body.dataset.theme = value
})
</script>

<style lang="scss" scoped>
button {
    svg {
        fill: var(--color-5);

        &.sun {
            height: 1.25rem;
            width: 1.25rem;
        }

        &.moon {
            height: 1.125rem;
            width: 1.125rem;
        }
    }
}
</style>