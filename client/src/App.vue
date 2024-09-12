<template>
    <NavBar />
    <router-view/>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
</script>

<style lang="scss">
#app {
    color: var(--color-5);

    h1,
    h2 {
        font-family: 'DM Serif Text', serif;
        font-weight: normal;
        letter-spacing: 0;
    }

    p {
        line-height: 1.5;
    }

    textarea {
        resize: vertical;
    }

    input:disabled,
    select:disabled,
    textarea:disabled {
        background-color: var(--color-2);
        cursor: not-allowed;
    }

    button {
        align-items: center;
        font-weight: bold;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &.black {
            background-color: var(--color-5);
            color: var(--color-1);

            &:hover:not(:disabled) {
                background-color: rgb(50, 50, 50);
            }
        }

        &.outline {
            border: 1px solid var(--color-3);

            &:hover:not(:disabled) {
                background-color: var(--color-2);
            }
        }
    }

    .floating-button {
        align-items: center;
        bottom: 1.5rem;
        left: 0;
        position: fixed;
        right: 0;

        a {
            background-color: var(--color-5);
            border-radius: 0.5rem;
            color: var(--color-1) !important;
            font-weight: bold;
            padding: 0.625rem 0.875rem;
            text-decoration: none;
        }
    }

    .truncated-text {
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .main {
        max-width: 768px;
        margin-left: auto;
        margin-right: auto;
        padding: 10rem 0;
        width: 100%;
    }
}

.app,
.app * {
    display: flex;
    flex-direction: column;
}
</style>
