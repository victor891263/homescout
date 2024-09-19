<template>
    <PropertyForm :id="Number(id)" :onSubmit="submit"  />
    <PopUp v-if="error" :msg="error" />
</template>

<script setup lang="ts">
import PropertyForm from "@/components/PropertyForm"
import {useRoute, useRouter} from "vue-router"
import {TPropertyType, TTenure} from "@/types"
import axios from "axios"
import {ref} from "vue"
import PopUp from "@/components/PopUp.vue"

const router = useRouter()
const route = useRoute()
const id = route.params.id

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
        await axios.put(`${process.env.VUE_APP_API_URL}/properties/${id}`, {
            price,
            tenure,
            description
        }, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        })
        await router.push(`/properties/${id}`)
    } catch (err: any) {
        event.target.disabled = false
        if (err.response && err.response.data) error.value = err.response.data
        else error.value = err.message
    }
}
</script>

<style scoped>

</style>