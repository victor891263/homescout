<template>
    <component :is="mini ? `RouterLink` : `div`" :to="`/properties/${id}`" class="property" :class="mini ? `mini` : ``">
        <div>
            <ImageIcon />
        </div>
        <div>
            <div v-if="!mini" class="date">Listed 3d ago</div>
            <h2>${{ price }}</h2>
            <div class="tags">
                <div>{{ type }}</div>
                <div>{{ tenure }}</div>
            </div>
            <div class="icons">
                <div>🛀🏻 {{ bathrooms }}</div>
                <div>🛌🏻 {{ bedrooms }}</div>
                <div>🧱 {{ floors }}</div>
            </div>
            <div class="address">{{ address }}</div>
            <p :class="mini ? `truncated-text` : `wrap`">{{ description }}</p>
            <div v-if="mini" class="date">Listed 3d ago</div>
        </div>
    </component>
</template>

<script setup lang="ts">
import ImageIcon from "@/components/icons/ImageIcon.vue"
import {defineProps} from "vue"

defineProps<{
    mini: boolean
    id: number
    date_posted: string
    price: number
    address: string
    bathrooms: number
    bedrooms: number
    floors: number
    type: string
    tenure: string
    description: string
}>()
</script>

<style lang="scss" scoped>
a.property {
    color: initial;
    text-decoration: initial;
}

.property {
    p.wrap {
        white-space: pre-wrap;
    }

    > div:first-of-type {
        align-items: center;
        aspect-ratio: 1/1;
        background-color: whitesmoke;
        justify-content: center;

        svg {
            fill: lightgray;
            width: 5rem;
        }
    }

    > div:last-of-type {
        gap: 1.5rem;
        padding-top: 1.75rem;

        h2 {
            font-size: 2rem;
        }

        .tags {
            flex-direction: row;
            gap: 0.375rem;

            div {
                border: 1px solid black;
                border-radius: 50rem;
                padding: 0.25rem 0.875rem;
                text-transform: capitalize;
                width: fit-content;
            }
        }

        .icons {
            flex-direction: row;
            gap: 1rem;
        }

        .address {
            font-weight: bold;
        }

        .date {
            color: darkgray;
        }
    }
}

@media (min-width: 768px) {
    .property.mini {
        flex-direction: row;

        > div {
            width: 50%;
        }

        > div:last-of-type {
            padding-left: 2rem;
            padding-top: 0;
        }
    }
}
</style>