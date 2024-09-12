<template>
    <div class="property-view main">
        <template v-if="data">
            <PropertyMini
                :mini="false"
                :id="data.id"
                :date_posted="data.date_posted"
                :price="data.price"
                :address="data.address"
                :bathrooms="data.bathrooms"
                :bedrooms="data.bedrooms"
                :floors="data.floors"
                :type="data.type"
                :tenure="data.tenure"
                :description="data.description"
            />
            <h1>Marketed by</h1>
            <RouterLink :to="`/users/${data.marketer_id}`" class="marketer">
                <div>
                    <UserIcon />
                </div>
                <div>
                    <div>{{ data.marketer_name || `Unknown name` }}</div>
                    <div>
                        <MailIcon />
                        <div>{{ data.marketer_email || `Unknown email` }}</div>
                    </div>
                    <div>
                        <PhoneIcon />
                        <div>{{ data.marketer_phone || `Unknown phone` }}</div>
                    </div>
                </div>
            </RouterLink>
            <div class="floating-button">
                <RouterLink v-if="currentUser && (currentUser.id === data.marketer_id.toString())" :to="`${route.path}/edit`">Edit property</RouterLink>
            </div>
        </template>
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup lang="ts">
import PropertyMini from "@/components/PropertyMini.vue"
import UserIcon from "@/components/icons/UserIcon.vue"
import {useRoute} from "vue-router"
import {ref} from "vue"
import {IProperty} from "@/types"
import axios from "axios"
import getCurrentUser from "@/util/getCurrentUser"
import MailIcon from "@/components/icons/MailIcon.vue";
import PhoneIcon from "@/components/icons/PhoneIcon.vue";

const currentUser = getCurrentUser()
const route = useRoute()
const id = route.params.id

const data = ref<IProperty>()
const error = ref('')

async function fetchData() {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/properties/${id}`)
        data.value = response.data
    } catch (err: any) {
        if (err.response) error.value = err.response.data
        else error.value = err.message
    }
}

fetchData()
</script>

<style lang="scss" scoped>
.property-view {
    gap: 2rem;

    .contact {
        align-items: center;
        flex-direction: row;
        gap: 1rem;
    }

    .marketer {
        align-items: center;
        flex-direction: row;
        gap: 1.5rem;
        text-decoration: initial;
        width: fit-content;

        > div:first-of-type {
            background-color: var(--color-2);
            border-radius: 50%;
            padding: 1.75rem;
            width: fit-content;

            svg {
                fill: var(--color-3-5);
                width: 1.75rem;
            }
        }

        > div:last-of-type {
            gap: 0.5rem;

            > div {
                align-items: center;
                flex-direction: row;
                gap: 0.5rem;

                svg {
                    fill: var(--color-4);
                    width: 1rem;
                }
            }

            > div:first-of-type {
                font-weight: bold;
            }
        }
    }
}
</style>