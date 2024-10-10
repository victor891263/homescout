<template>
    <div class="main">
        <h1>Feedback</h1>
        <div v-for="(o, i) in operations" :key="i">
            <div>
                <p>Regarding {{ o }}, did it meet your expectations?</p>
                <input type="radio" :id="`${o}-yes`" />
                <label :for="`${o}-yes`">Yes</label>
                <input type="radio" :id="`${o}-no`" />
                <label :for="`${o}-no`">No</label>
            </div>
            <div>
                <p>Regarding {{ o }}, did it exceed your expectations?</p>
                <input type="radio" :id="`${o}-yes`" />
                <label :for="`${o}-yes`">Yes</label>
                <input type="radio" :id="`${o}-no`" />
                <label :for="`${o}-no`">No</label>
            </div>
            <div>
                <p>Regarding {{ o }}, please give a rating?</p>
                <input type="number" min="1" max="10" />
            </div>
        </div>
        <button class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">
const operations = [
    'browsing properties',
    'registration',
    'managing properties',
    'price prediction'
]
</script>

<style scoped>

</style>