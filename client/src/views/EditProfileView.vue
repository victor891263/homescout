<template>
    <div class="edit-profile main">
        <h1>Edit profile</h1>
        <div>
            <label for="name">Name</label>
            <input v-model="name" type="text" name="name" id="name" />
        </div>
        <div>
            <label for="phone">Phone</label>
            <input v-model="phone" type="text" name="phone" id="phone" />
        </div>
        <div>
            <label for="address">Address</label>
            <input v-model="address" type="text" name="address" id="address" />
        </div>
        <div>
            <label for="about">About</label>
            <textarea v-model="about" name="about" id="about" />
        </div>
        <button @click="submit($event)" class="black">Submit</button>
    </div>
    <PopUp v-if="error" :msg="error" />
</template>

<script setup lang="ts">
import {ref} from "vue"
import axios from "axios"
import getCurrentUser from "@/util/getCurrentUser"
import PopUp from "@/components/PopUp.vue"
import {useRouter} from "vue-router";

const name = ref('')
const phone = ref('')
const address = ref('')
const about = ref('')

const error = ref('')

const currentUser = getCurrentUser()
const router = useRouter()

async function fetchData() {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${currentUser!.id}`)
        name.value = response.data.user.name
        phone.value = response.data.user.phone
        address.value = response.data.user.address
        about.value = response.data.user.about
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

async function submit(event: any) {
    event.target.disabled = true
    try {
        await axios.put(`${process.env.VUE_APP_API_URL}/users`, {
            name: name.value,
            phone: phone.value,
            address: address.value,
            about: about.value
        }, {
            headers: {
                Authorization: localStorage.getItem('jwt')
            }
        })
        await router.push('/profile')
    } catch (err: any) {
        event.target.disabled = false
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

fetchData()
</script>

<style lang="scss" scoped>
.edit-profile {
    gap: 1.25rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    input,
    textarea {
        border: 1px solid lightgray;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
    }

    textarea {
        height: 10rem;
        line-height: 1.5;
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
}
</style>