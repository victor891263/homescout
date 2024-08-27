<template>
    <nav>
        <div>
            <RouterLink to="/">👋 Homescout</RouterLink>
            <div v-if="currentUser">
                <RouterLink to="/profile">Profile</RouterLink>
                <button @click="logout()">Logout</button>
            </div>
            <div v-else>
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </div>
        </div>
    </nav>
    <router-view/>
</template>

<script setup lang="ts">
import getCurrentUser from "@/util/getCurrentUser"

const currentUser = getCurrentUser()

function logout() {
    localStorage.removeItem('jwt')
    window.location.href = `${window.location.origin}`
}
</script>

<style lang="scss">
#app {
    h1,
    h2 {
        font-family: 'DM Serif Text', serif;
        font-weight: normal;
        letter-spacing: 0;
    }

    p {
        line-height: 1.5;
    }

    a {
        color: initial;
        cursor: pointer;
    }

    input,
    select,
    textarea,
    button {
        font-size: 1rem;
        outline: none;
    }

    textarea {
        resize: vertical;
    }

    input:disabled,
    select:disabled,
    textarea:disabled {
        background-color: whitesmoke;
        cursor: not-allowed;
    }

    button {
        align-items: center;
        cursor: pointer;
        font-weight: bold;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &.black {
            background-color: black;
            border: none;
            color: white;

            &:hover:not(:disabled) {
                background-color: rgb(50, 50, 50);
            }
        }

        &.outline {
            background: none;
            border: 1px solid lightgray;

            &:hover:not(:disabled) {
                background-color: whitesmoke;
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
            background-color: black;
            border-radius: 0.5rem;
            box-shadow: 0 2px 10px 0 gray;
            color: white !important;
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

    nav {
        align-items: center;
        left: 0;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        position: fixed;
        right: 0;
        top: 1.5rem;

        a {
            color: initial;
            text-decoration: none;
        }

        > div {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 2px 10px 0 lightgray;
            flex-direction: row;
            justify-content: space-between;
            max-width: 768px;
            padding: 1.25rem;
            width: 100%;

            > div {
                flex-direction: row;
                gap: 1.25rem;
            }
        }

        button {
            background: none;
            border: none;
            font-weight: normal;
        }
    }
}

.app,
.app * {
    display: flex;
    flex-direction: column;
}
</style>
