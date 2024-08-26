<template>
    <div class="property-form main">
        <h1>Add property</h1>
        <div>
            <label for="price">Price</label>
            <input type="number" name="price" id="price" />
        </div>
        <div>
            <label for="address">Address</label>
            <input type="text" name="address" id="address" />
        </div>
        <div>
            <label for="bathrooms">Bathrooms</label>
            <input type="number" name="bathrooms" id="bathrooms" />
        </div>
        <div>
            <label for="bedrooms">Bedrooms</label>
            <input type="number" name="bedrooms" id="bedrooms" />
        </div>
        <div>
            <label for="floors">Floors</label>
            <input type="number" name="floors" id="floors" />
        </div>
        <div>
            <label for="size">Size</label>
            <input type="text" name="size" id="size" />
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
            <select v-model="type" name="type" id="type">
                <option value="terraced-house">Terraced house</option>
                <option value="flat">Flat</option>
                <option value="land">Land</option>
                <option value="semi-detached-house">Semi-detached house</option>
                <option value="detached-house">Detached house</option>
                <option value="end-terrace-house">End terrace house</option>
                <option value="parking-garage">Parking/garage</option>
                <option value="town-house">Town house</option>
                <option value="cottage">Cottage</option>
                <option value="studio">Studio</option>
                <option value="link-detached-house">Link-detached house</option>
                <option value="detached-bungalow">Detached bungalow</option>
                <option value="bungalow">Bungalow</option>
                <option value="semi-detached-bungalow">Semi-detached bungalow</option>
                <option value="block-of-flats">Block of flats</option>
                <option value="villa">Villa</option>
                <option value="maisonette">Maisonette</option>
                <option value="barn-conversion">Barn conversion</option>
                <option value="mews-house">Mews house</option>
            </select>
        </div>
        <div>
            <label for="description">Description</label>
            <textarea name="description" id="description" />
        </div>
        <button class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const tenure = ref('freehold')
const type = ref('terraced-house')
</script>

<style lang="scss" scoped>
.property-form {
    gap: 1.5rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    input,
    select,
    textarea {
        border: 1px solid lightgray;
        padding: 0.5rem 0.75rem;
    }

    textarea {
        height: 10rem;
        line-height: 1.5;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.625rem;
    }
}
</style>