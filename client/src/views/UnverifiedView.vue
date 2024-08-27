<template>
    <div class="main">
        <p>You need to verify your email address.</p>
        <button @click="logout()" class="outline">Logout</button>
    </div>
</template>

<script setup lang="ts">
function logout() {
    localStorage.removeItem('jwt')
    window.location.href = `${window.location.origin}`
}
</script>

<style lang="scss" scoped>
.main {
    align-items: center;
    gap: 2rem;

    button {
        border-radius: 0.5rem;
        padding: 0.625rem 1rem;
    }
}
</style>