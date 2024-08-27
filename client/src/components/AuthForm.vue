<template>
    <div class="auth-form main">
        <div v-if="isLogin" >
            <h1>Login</h1>
            <div class="alternate-option">Don't have an account? <RouterLink to="/register">Register</RouterLink></div>
        </div>
        <div v-else >
            <h1>Register</h1>
            <div class="alternate-option">Already have an account? <RouterLink to="/login">Login</RouterLink></div>
        </div>
        <div>
            <label for="email" >Email</label>
            <input v-model="email" type="email" name="email" id="email" />
        </div>
        <div>
            <label for="password" >Password</label>
            <input v-model="password" type="password" name="password" id="password" />
        </div>
        <RouterLink v-if="isLogin" class="forgot-password" to="/reset">Forgot password?</RouterLink>
        <button @click="onSubmit(email, password, $event)" class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"
import {ref} from "vue"

defineProps<{
    isLogin: boolean
    onSubmit: (email: string, password: string, event: any) => void
}>()

const email = ref('')
const password = ref('')
</script>

<style lang="scss" scoped>
.auth-form {
    gap: 1.25rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    input {
        border: 1px solid lightgray;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
    }

    button {
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.625rem;
    }

    label {
        font-weight: 600;
        margin-bottom: 0.375rem;
    }

    .forgot-password {
        margin-bottom: -0.25rem;
        width: fit-content;
    }

    .alternate-option {
        display: block;

        a {
            display: inline;
        }
    }

    > div:first-of-type {
        margin-bottom: 1rem;
    }
}
</style>