<template>
    <AuthForm :isLogin="false" :onSubmit="register" />
    <PopUp v-if="error" :msg="error" />
</template>

<script setup lang="ts">
import AuthForm from "@/components/AuthForm.vue"
import {ref} from "vue"
import axios from "axios"
import PopUp from "@/components/PopUp.vue"

const error = ref('')

async function register(email: string, password: string, event: any) {
    event.target.disabled = true
    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/users`, {
            email,
            password
        })
        localStorage.setItem('jwt', response.data)
        window.location.href = `${window.location.origin}`
    } catch (err: any) {
        event.target.disabled = false
        if (err.response && err.response.data) error.value = err.response.data
        else error.value = err.message
    }
}
</script>

<style scoped>

</style>