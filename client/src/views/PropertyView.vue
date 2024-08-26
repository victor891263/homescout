<template>
    <div class="property-view main">
        <PropertyMini
            :mini="false"
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
        <div class="contact">
            <div>✉️ {{ p.email }}</div>
            <div>☎️ {{ p.phone }}</div>
        </div>
        <RouterLink :to="`/users/${p.marketer_id}`" class="marketer">
            <div>
                <UserIcon />
            </div>
            <div>{{ p.marketer_name }}</div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import PropertyMini from "@/components/PropertyMini.vue"
import UserIcon from "@/components/icons/UserIcon.vue"

const p = {
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
    description: `Two bed end terrace house in need of modernisation. Benefitting from two receptions rooms, an extended kitchen and a separate wc to the ground floor.

The property also benefits from two double bedrooms and the main bathroom on the first floor.

Council Tax Band: A
Tenure: Freehold

Auctioneers Additional Comments

Pattinson Auction are working in Partnership with the marketing agent on this online auction sale and are referred to below as 'The Auctioneer'.

Please be aware that any inquiry, bid or viewing of the subject property will require your details to be shared between both the marketing agent and The Auctioneer in order that all matters can be dealt with effectively.

This auction lot is being sold either by, conditional (Modern) or unconditional (Traditional) auction terms and overseen by the auctioneer in partnership with the marketing agent.

The property is available to be viewed strictly by appointment only via the Marketing Agent or The Auctioneer. Bids can be made via The Auctioneers or the Marketing Agents website.

Auctioneers Additional Comments

Your details may be shared with additional service providers via the marketing agent and/or The Auctioneer.

A Legal Pack associated with this particular property is available to view upon request and contains details relevant to the legal documentation enabling all interested parties to make an informed decision prior to bidding. The Legal Pack will also outline the buyers' obligations and sellers' commitments. It is strongly advised that you seek the counsel of a solicitor prior to proceeding with any property and/or Land Title purchase.

In order to submit a bid upon any property being marketed by The Auctioneer, all bidders/buyers will be required to adhere to a verification and identity process in accordance with Anti Money Laundering procedures.

Auctioneers Additional Comments

In order to secure the property and ensure commitment from the seller, upon exchange of contracts the successful bidder will be expected to pay a non-refundable deposit of 5% of the purchase price of the lot subject to any special conditions detailed in the legal pack. The deposit will be a contribution to the purchase price. A non-refundable reservation fee may also be payable upon agreement of sale (Details of which can be obtained from the auctioneers website). The Reservation Fee is in addition to the agreed purchase price and consideration should be made by the purchaser in relation to any Stamp Duty Land Tax liability associated with overall purchase costs.

Both the Marketing Agent and The Auctioneer may believe it necessary or beneficial to the customer to pass your details to third party service suppliers, from which a referral fee may be obtained. There is no requirement or indeed obligation to use these recommended suppliers or services.`,
    size: '250 x 600',
    marketer_id: 729813,
    marketer_name: 'Rando Real Estate',
    phone: '0374928749',
    email: 'sales@rando.com'
}
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
        color: initial;
        flex-direction: row;
        gap: 0.5rem;
        text-decoration: initial;
        width: fit-content;

        > div:first-of-type {
            background-color: whitesmoke;
            border-radius: 50%;
            padding: 0.75rem;
            width: fit-content;

            svg {
                fill: lightgray;
                width: 1rem;
            }
        }
    }
}
</style>