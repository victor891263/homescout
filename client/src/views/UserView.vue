<template>
    <div class="user-view main">
        <div>
            <UserIcon />
        </div>
        <div>
            <h2>{{ user.name }}</h2>
            <div class="contact">
                <div>✉️ {{ user.email }}</div>
                <div>📞 {{ user.phone }}</div>
                <div>🏠 {{ user.address }}</div>
            </div>
            <p>{{ user.about }}</p>
        </div>
        <div>
            <PropertyMini
                v-for="p in properties"
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
        </div>
    </div>
</template>

<script setup lang="ts">
import UserIcon from "@/components/icons/UserIcon.vue"
import PropertyMini from "@/components/PropertyMini.vue"

const user = {
    name: 'Rando Real Estate',
    email: 'sales@rando.com',
    phone: '078957985',
    address: '45 Red Lane Manchester M56 7JK',
    about: `Pattinson Estate Agency is an award-winning family-run business that was Launched in 1977 on Independence Day. This is no coincidence, as independence is central to our company ethos. We are the most recognised estate agency in the North East, and in that time we have grown from 1 office to 28, with 300 members of staff, and we officially sell more properties in the North East, than any other estate agency.

However, we don’t just sell houses! Our many property services include sales, lettings (property management), auction, commercial, financial services, conveyance and surveys, and we have it all under one roof! We can be contacted 6 days a week at extended hours, as we have a dedicated Regional Team who take the overspill calls from our 28 branches, so all client relationships are built and maintained.

At Pattinsons, we are innovative leaders in the property industry, with pro-active selling, a reliable reputation, and substantial repeat business. Our national secure sale department, ‘Pattinson Auction’, was launched 33 years ago, and is going from strength to strength.

As serious players in the field of digital marketing, we successfully utilise the social media platforms TikTok, Facebook and Instagram as part of our extensive marketing process. We have a wealth of knowledge and an expansive network to help find the best solution for you and your property requirements. You can trust Pattinsons, the North East’s leading estate agency.`
}
const properties = [
    {
        id: 21321,
        date_posted: new Date().toString(),
        price: 245000,
        address: '12 Green Street, Birmingham B12 0EP',
        bathrooms: 3,
        bedrooms: 4,
        floors: 2,
        type: 'house',
        tenure: 'leasehold',
        date_modified: new Date().toString(),
        description: `A delightful four-bedroom house located in a quiet, sought-after neighborhood. The property benefits from a spacious garden, a modern kitchen, and close proximity to local schools and amenities.`,
        size: '250 x 600'
    },
    {
        id: 867886,
        date_posted: new Date().toString(),
        price: 170000,
        address: '45 Blue Road, Leeds LS1 3AB',
        bathrooms: 1,
        bedrooms: 2,
        floors: 1,
        type: 'flat',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `An elegant two-bedroom flat located in the heart of Leeds. This flat boasts a modern interior with a spacious living area, ideal for first-time buyers or investors.`,
        size: '180 x 400'
    },
    {
        id: 56546,
        date_posted: new Date().toString(),
        price: 300000,
        address: '89 Yellow Avenue, Bristol BS2 8PN',
        bathrooms: 2,
        bedrooms: 3,
        floors: 3,
        type: 'townhouse',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `A beautiful three-story townhouse with a contemporary design, situated in a vibrant area of Bristol. Features include a private garage, garden, and proximity to the city center.`,
        size: '300 x 650'
    },
    {
        id: 8019247,
        date_posted: new Date().toString(),
        price: 210000,
        address: '67 Violet Road, Manchester M4 1PQ',
        bathrooms: 2,
        bedrooms: 2,
        floors: 1,
        type: 'apartment',
        tenure: 'leasehold',
        date_modified: new Date().toString(),
        description: `A stylish two-bedroom apartment with stunning views of Manchester's skyline. Located in a modern development with on-site gym and concierge service.`,
        size: '220 x 480'
    },
    {
        id: 934651,
        date_posted: new Date().toString(),
        price: 280000,
        address: '23 Red Lane, Manchester M56 8JK',
        bathrooms: 2,
        bedrooms: 2,
        floors: 2,
        type: 'flat',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `St Luke's Centre on Whalley Road, Whalley Range is a truly stunning building, now available for a limited time. We have been asked to market this property for a four-week period, and all offers must be submitted in writing FAO Danny / Eddie.`,
        size: '233 x 500'
    },
    {
        id: 12932,
        date_posted: new Date().toString(),
        price: 195000,
        address: '34 White Crescent, Edinburgh EH1 1AN',
        bathrooms: 1,
        bedrooms: 3,
        floors: 2,
        type: 'cottage',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `A charming three-bedroom cottage nestled in a picturesque area of Edinburgh. Features include a cozy living room with a fireplace, a spacious garden, and beautiful views.`,
        size: '260 x 540'
    },
    {
        id: 8721321,
        date_posted: new Date().toString(),
        price: 160000,
        address: '99 Orange Street, Liverpool L1 0ER',
        bathrooms: 1,
        bedrooms: 1,
        floors: 1,
        type: 'studio',
        tenure: 'leasehold',
        date_modified: new Date().toString(),
        description: `A modern studio apartment perfect for city living in Liverpool. Close to the waterfront, this property is ideal for young professionals or as an investment opportunity.`,
        size: '150 x 350'
    },
    {
        id: 200121,
        date_posted: new Date().toString(),
        price: 500000,
        address: '58 Indigo Lane, London SW3 2BB',
        bathrooms: 2,
        bedrooms: 4,
        floors: 3,
        type: 'terraced house',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `A luxurious four-bedroom terraced house located in the prestigious Chelsea area. The property features a large kitchen with modern appliances, a private garden, and high-end finishes throughout.`,
        size: '400 x 700'
    },
    {
        id: 1237899,
        date_posted: new Date().toString(),
        price: 270000,
        address: '11 Black Lane, Cardiff CF10 1AA',
        bathrooms: 2,
        bedrooms: 3,
        floors: 2,
        type: 'semi-detached house',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `A well-presented three-bedroom semi-detached house in a popular Cardiff suburb. This property offers a large driveway, a private garden, and is within walking distance of local amenities.`,
        size: '275 x 550'
    },
    {
        id: 45654,
        date_posted: new Date().toString(),
        price: 225000,
        address: '78 Grey Avenue, Newcastle NE1 5BN',
        bathrooms: 1,
        bedrooms: 2,
        floors: 1,
        type: 'bungalow',
        tenure: 'freehold',
        date_modified: new Date().toString(),
        description: `A delightful two-bedroom bungalow situated in a quiet residential area of Newcastle. The property benefits from a spacious garden, off-road parking, and easy access to local transport links.`,
        size: '210 x 460'
    }
]
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
        }

        .contact {
            gap: 0.625rem;
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