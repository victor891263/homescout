<template>
    <div class="property-form main">
        <h1>{{ id ? `Edit property` : `Add property` }}</h1>
        <div>
            <label for="price">Price</label>
            <input v-model="price" type="number" name="price" id="price" />
        </div>
        <div>
            <label for="address">Address</label>
            <input v-model="address" type="text" name="address" id="address" :disabled="id" />
        </div>
        <div>
            <label for="bathrooms">Bathrooms</label>
            <input v-model="bathrooms" type="number" name="bathrooms" id="bathrooms" :disabled="id" />
        </div>
        <div>
            <label for="bedrooms">Bedrooms</label>
            <input v-model="bedrooms" type="number" name="bedrooms" id="bedrooms" :disabled="id" />
        </div>
        <div>
            <label for="floors">Floors</label>
            <input v-model="floors" type="number" name="floors" id="floors" :disabled="id" />
        </div>
        <div>
            <label for="size">Size</label>
            <input v-model="size" type="text" name="size" id="size" :disabled="id" />
        </div>
        <div>
            <label for="tenure">Tenure</label>
            <select v-model="tenure" name="tenure" id="tenure">
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="share of freehold">Share of freehold</option>
            </select>
        </div>
        <div>
            <label for="type">Property type</label>
            <select v-model="type" name="type" id="type" :disabled="id" >
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
        <div>
            <label for="description">Description</label>
            <textarea v-model="description" name="description" id="description" />
        </div>
        <button @click="onSubmit(
            price,
            address,
            bathrooms,
            bedrooms,
            floors,
            type,
            tenure,
            description,
            size,
            $event
        )" class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {defineProps} from "vue"
import {TPropertyType, TTenure} from "@/types"
import axios from "axios"

const price = ref(0)
const address = ref('')
const bathrooms = ref(0)
const bedrooms = ref(0)
const floors = ref(0)
const size = ref('')
const tenure = ref<TTenure>('freehold')
const type = ref<TPropertyType>('terraced house')
const description = ref('')

const error = ref('')

const props = defineProps<{
    id?: number
    onSubmit: (
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
    ) => void
}>()

async function fetchData(id: number) {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/properties/${id}`)
        price.value = response.data.price
        address.value = response.data.address
        bathrooms.value = response.data.bathrooms
        bedrooms.value = response.data.bedrooms
        floors.value = response.data.floors
        size.value = response.data.size
        type.value = response.data.type
        tenure.value = response.data.tenure
        description.value = response.data.description
    } catch (err: any) {
        if (err.response && err.response.data) error.value = err.response.data
        else error.value = err.message
    }
}

if (props.id) fetchData(props.id)
</script>

<style lang="scss" scoped>
.property-form {
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
    select,
    textarea {
        border: 1px solid var(--color-3);
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
    }

    textarea {
        border-radius: 0.75rem;
        height: 8rem;
        line-height: 1.5;
    }

    button {
        border-radius: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.625rem;
    }
}
</style>