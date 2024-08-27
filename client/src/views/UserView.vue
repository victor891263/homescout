<template>
    <div class="floating-button">
        <RouterLink v-if="currentUser" to="/profile/edit">Edit profile</RouterLink>
    </div>
    <div class="user-view main">
        <template v-if="data">
            <div>
                <UserIcon />
            </div>
            <div>
                <h2>{{ data.user.name || `Unknown name` }}</h2>
                <div class="contact">
                    <div>
                        <MailIcon />
                        <div>{{ data.user.email }}</div>
                    </div>
                    <div>
                        <PhoneIcon />
                        <div>{{ data.user.phone || `Unknown phone` }}</div>
                    </div>
                    <div>
                        <LocationPinIcon />
                        <div>{{ data.user.address || `Unknown address` }}</div>
                    </div>
                </div>
                <p>{{ data.user.about || `Unknown bio` }}</p>
            </div>
            <div>
                <h1>Properties</h1>
                <template v-if="data.properties.length > 0">
                    <PropertyMini
                        v-for="p in data.properties"
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
                <p v-else>This user hasn't listed any properties yet.</p>
            </div>
        </template>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup lang="ts">
import UserIcon from "@/components/icons/UserIcon.vue"
import PropertyMini from "@/components/PropertyMini.vue"
import {useRoute} from "vue-router"
import {ref} from "vue"
import axios from "axios"
import {IPropertyMini, IUser} from "@/types"
import getCurrentUser from "@/util/getCurrentUser";
import MailIcon from "@/components/icons/MailIcon.vue";
import PhoneIcon from "@/components/icons/PhoneIcon.vue";
import LocationPinIcon from "@/components/icons/LocationPinIcon.vue";

const route = useRoute()
const id = route.params.id

const currentUser = getCurrentUser()

const data = ref<{
    user: IUser
    properties: IPropertyMini[]
}>()
const error = ref('')

async function fetchData() {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${id || currentUser!.id}`)
        data.value = response.data
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

fetchData()
</script>

<style lang="scss" scoped>
.user-view {
    gap: 2rem;

    > div:first-of-type {
        background-color: whitesmoke;
        border-radius: 50%;
        height: fit-content;
        padding: 3rem;
        width: fit-content;

        svg {
            fill: lightgray;
            width: 3rem;
        }
    }

    > div:nth-of-type(2) {
        gap: 1.5rem;

        h2 {
            font-size: 2rem;
            margin-top: -0.5rem;
            margin-bottom: -0.25rem;
        }

        .contact {
            gap: 0.5rem;

            > div {
                align-items: center;
                flex-direction: row;
                gap: 0.5rem;

                svg {
                    fill: darkgray;
                    width: 1rem;
                }
            }
        }

        p {
            white-space: pre-wrap;
        }
    }

    > div:nth-of-type(3) {
        gap: 2.5rem;
        margin-top: 2rem;
    }
}
</style>