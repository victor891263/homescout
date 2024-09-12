<template>
    <nav>
        <div :class="isActive ? 'active' : ''">
            <div>
                <RouterLink to="/">££</RouterLink>
                <button @click="isActive = !isActive">
                    <MenuIcon v-if="!isActive" />
                    <XIcon v-else />
                </button>
                <ThemeButton />
            </div>
            <div v-if="isActive">
                <RouterLink to="/predict">Predict</RouterLink>
                <template v-if="currentUser">
                    <RouterLink to="/profile">Profile</RouterLink>
                    <button @click="logout()">Logout</button>
                </template>
                <template v-else>
                    <RouterLink to="/login">Login</RouterLink>
                    <RouterLink to="/register">Register</RouterLink>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import getCurrentUser from "@/util/getCurrentUser"
import {ref} from "vue"
import XIcon from "@/components/icons/XIcon.vue"
import MenuIcon from "@/components/icons/MenuIcon.vue"
import ThemeButton from "@/components/ThemeButton.vue"

const currentUser = getCurrentUser()
const isActive = ref(false)

function logout() {
    localStorage.removeItem('jwt')
    window.location.href = `${window.location.origin}`
}
</script>

<style lang="scss" scoped>
nav {
    align-items: center;
    left: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    position: fixed;
    right: 0;
    top: 1.5rem;

    a {
        text-decoration: none;
    }

    > div {
        background-color: var(--color-1);
        border: 1px solid var(--color-3);
        border-radius: 0.875rem;
        height: 54px;
        overflow: hidden;
        padding: 1rem;
        transition: height 0.3s;

        > div:nth-of-type(1) {
            align-items: center;
            flex-direction: row;
            gap: 1rem;

            svg {
                fill: var(--color-5);
                height: 1.25rem;
                width: 1.25rem;
            }
        }

        > div:nth-of-type(2) {
            border-top: 1px solid var(--color-3);
            gap: 0.75rem;
            margin-top: 1rem;
            padding-top: 1rem;
        }

        &.active {
            height: 169px;
        }
    }

    button {
        font-weight: normal;
    }
}
</style>