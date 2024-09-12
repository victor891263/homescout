<template>
    <component :is="mini ? `RouterLink` : `div`" :to="`/properties/${id}`" class="property" :class="mini ? `mini` : ``">
        <div>
            <ImageIcon />
        </div>
        <div>
            <div v-if="!mini" class="date">Listed 3d ago</div>
            <h2>£{{ price }}</h2>
            <div class="tags">
                <div>{{ type }}</div>
                <div>{{ tenure }}</div>
            </div>
            <div class="icons">
                <div>
                    <ShowerIcon />
                    <div>{{ bathrooms }}</div>
                </div>
                <div>
                    <BedIcon />
                    <div>{{ bedrooms }}</div>
                </div>
                <div>
                    <BrickIcon />
                    <div>{{ floors }}</div>
                </div>
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
import ShowerIcon from "@/components/icons/ShowerIcon.vue";
import BedIcon from "@/components/icons/BedIcon.vue";
import BrickIcon from "@/components/icons/BrickIcon.vue";

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
    text-decoration: initial;
}

.property {
    p.wrap {
        white-space: pre-wrap;
    }

    > div:first-of-type {
        align-items: center;
        aspect-ratio: 1/1;
        background-color: var(--color-2);
        border-radius: 2rem;
        justify-content: center;

        svg {
            fill: var(--color-3-5);
            width: 5rem;
        }
    }

    > div:last-of-type {
        gap: 1.25rem;
        padding-top: 1.75rem;

        h2 {
            font-size: 2.5rem;
            margin-bottom: -0.5rem;
            margin-top: -0.5rem;
        }

        .tags {
            flex-direction: row;
            gap: 0.375rem;

            div {
                background-color: var(--color-2);
                border-radius: 0.625rem;
                padding: 0.5rem 0.75rem;
                text-transform: capitalize;
                width: fit-content;
            }
        }

        .icons {
            flex-direction: row;
            gap: 1rem;

            > div {
                align-items: center;
                flex-direction: row;
                gap: 0.5rem;

                svg {
                    fill: var(--color-4);
                    width: 1rem;
                }
            }
        }

        .address {
            font-weight: bold;
        }

        .date {
            color: var(--color-4);
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