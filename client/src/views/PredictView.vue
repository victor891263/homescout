<template>
    <PopUp v-if="error" :msg="error" />
    <div class="main predict-view">
        <h1>Predict price</h1>
        <div>
            <label for="address">Address</label>
            <input v-model="address" type="text" name="address" id="address" />
        </div>
        <div>
            <label for="bathrooms">Bathrooms</label>
            <input v-model="bathrooms" type="number" name="bathrooms" id="bathrooms" />
        </div>
        <div>
            <label for="bedrooms">Bedrooms</label>
            <input v-model="bedrooms" type="number" name="bedrooms" id="bedrooms" />
        </div>
        <div>
            <label for="floors">Floors</label>
            <input v-model="floors" type="number" name="floors" id="floors" />
        </div>
        <div>
            <label for="tenure">Tenure</label>
            <select v-model="tenure" name="tenure" id="tenure">
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="share_of_freehold">Share of freehold</option>
            </select>
        </div>
        <div>
            <label for="type">Property type</label>
            <select v-model="type" name="type" id="type" >
                <option value="terraced house">Terraced house</option>
                <option value="flat">Flat</option>
                <option value="land">Land</option>
                <option value="semi-detached house">Semi-detached house</option>
                <option value="detached house">Detached house</option>
                <option value="end terrace house">End terrace house</option>
                <option value="parking/garage">Parking/garage</option>
                <option value="town house">Town house</option>
                <option value="cottage">Cottage</option>
                <option value="studio">Studio</option>
                <option value="link-detached house">Link-detached house</option>
                <option value="detached bungalow">Detached bungalow</option>
                <option value="bungalow">Bungalow</option>
                <option value="semi-detached bungalow">Semi-detached bungalow</option>
                <option value="block of flats">Block of flats</option>
                <option value="villa">Villa</option>
                <option value="maisonette">Maisonette</option>
                <option value="barn conversion">Barn conversion</option>
                <option value="mews house">Mews house</option>
            </select  >
        </div>
        <button @click="submit($event)" class="black">Submit</button>
        <div v-if="predPrice" class="pred-container">
            <h2>£{{ predPrice }}</h2>
            <p>This is the highest possible price you can expect your property to be sold for.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {TPropertyType, TTenure} from "@/types"
import axios from "axios"
import PopUp from "@/components/PopUp.vue"

const address = ref('')
const bathrooms = ref(0)
const bedrooms = ref(0)
const floors = ref(0)
const tenure = ref<TTenure>('freehold')
const type = ref<TPropertyType>('terraced house')

const error = ref('')
const predPrice = ref()

async function submit(event: any) {
    event.target.disabled = true
    try {
        const responseWithCords = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
                q: address.value,
                key: process.env.VUE_APP_OPENCAGEDATA_URL,
                countrycode: 'gb',
                limit: 1
            }
        })

        const result = responseWithCords.data.results[0]
        const latitude = result.geometry.lat
        const longitude = result.geometry.lng

        const response = await axios.post(process.env.VUE_APP_MODEL_URL, {
            latitude,
            longitude,
            num_bathrooms: bathrooms.value,
            num_bedrooms: bedrooms.value,
            num_floors: floors.value,
            property_type: type.value,
            tenure: tenure.value
        })
        predPrice.value = response.data
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    } finally {
        event.target.disabled = false
    }
}
</script>

<style lang="scss" scoped>
.predict-view {
    gap: 1.25rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    label {
        font-weight: 600;
        margin-bottom: 0.375rem;
    }

    input,
    select {
        border: 1px solid lightgray;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
    }

    button {
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.625rem;
    }

    .pred-container {
        background-color: whitesmoke;
        border-radius: 0.75rem;
        margin-top: 2rem;
        padding: 1rem 1.5rem 1.5rem 1.5rem;

        h2 {
            font-size: 2rem;
            margin-bottom: 0.75rem;
        }
    }
}
</style>