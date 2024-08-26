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
            <input type="email" name="email" id="email" />
        </div>
        <div>
            <label for="password" >Password</label>
            <input type="password" name="password" id="password" />
        </div>
        <RouterLink v-if="isLogin" class="forgot-password" to="/reset">Forgot password?</RouterLink>
        <button class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"

defineProps<{
    isLogin: boolean
}>()
</script>

<style lang="scss" scoped>
.auth-form {
    gap: 1.5rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    input {
        border: 1px solid lightgray;
        padding: 0.5rem 0.75rem;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.625rem;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .forgot-password {
        margin-bottom: -0.25rem;
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