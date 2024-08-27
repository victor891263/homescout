<template>
    <div class="floating-button">
        <RouterLink to="/new">Add property</RouterLink>
    </div>
    <div class="home-view main">
        <template v-if="data">
            <template v-if="data.length > 0">
                <PropertyMini
                    v-for="p in data"
                    :key="p.id"
                    :mini="true"
                    :id="p.id"
                    :date_posted="p.date_posted"
                    :price="p.price"
                    :address="p.address"
                    :bathrooms="p.bathrooms"
                    :bedrooms="p.bedrooms"
                    :floors="p.floors"
                    :type="p.type"
                    :tenure="p.tenure"
                    :description="p.description"
                />
            </template>
            <div v-else>
                <p>No relevant properties found</p>
            </div>
        </template>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup lang='ts'>
import PropertyMini from "@/components/PropertyMini.vue"
import {ref} from "vue"
import {IPropertyMini} from "@/types"
import axios from "axios"

const data = ref<IPropertyMini[]>()
const error = ref('')

async function fetchData() {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/properties`)
        data.value = response.data
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

fetchData()
</script>

<style lang="scss" scoped>
.home-view {
    gap: 2.5rem;
}
</style>
