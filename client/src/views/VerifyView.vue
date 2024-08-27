<template>
    <div class="main">
        <p v-if="error">{{ error }}</p>
        <div v-else>Working...</div>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {ref} from "vue"
import axios from "axios"
import PopUp from "@/components/PopUp.vue"

const error = ref('')
const route = useRoute()
const id = route.params.id

async function verify() {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/verify/${id}`, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        })
        localStorage.setItem('jwt', response.data)
        window.location.href = `${window.location.origin}`
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

verify()
</script>

<style scoped>

</style>