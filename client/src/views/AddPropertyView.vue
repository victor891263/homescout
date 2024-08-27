<template>
    <PropertyForm :onSubmit="submit" />
    <PopUp v-if="error" :msg="error" />
</template>

<script setup lang="ts">
import PropertyForm from "@/components/PropertyForm.vue"
import {TPropertyType, TTenure} from "@/types"
import axios from "axios"
import {ref} from "vue"
import {useRouter} from "vue-router"
import PopUp from "@/components/PopUp.vue"

const router = useRouter()
const error = ref('')

async function submit(
    price: number,
    address: string,
    bathrooms: number,
    bedrooms: number,
    floors: number,
    type: TPropertyType,
    tenure: TTenure,
    description: string,
    size: string,
    event: any
) {
    event.target.disabled = true
    try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/properties`, {
            price,
            address,
            bathrooms,
            bedrooms,
            floors,
            type,
            tenure,
            description,
            size,
        }, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        })
        await router.push(`/properties/${response.data}`)
    } catch (err: any) {
        event.target.disabled = false
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}
</script>

<style scoped>

</style>