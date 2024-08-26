<template>
    <div class="edit-profile main">
        <h1>Edit profile</h1>
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" />
        </div>
        <div>
            <label for="phone">Phone</label>
            <input type="text" name="phone" id="phone" />
        </div>
        <div>
            <label for="address">Address</label>
            <input type="text" name="address" id="address" />
        </div>
        <div>
            <label for="about">About</label>
            <textarea name="about" id="about" />
        </div>
        <button class="black">Submit</button>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.edit-profile {
    gap: 1.5rem;
    max-width: 420px !important;

    h1 {
        margin-bottom: 1rem;
    }

    input,
    textarea {
        border: 1px solid lightgray;
        padding: 0.5rem 0.75rem;
    }

    textarea {
        height: 10rem;
        line-height: 1.5;
    }

    button {
        margin-top: 0.5rem;
        padding: 0.625rem;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
}
</style>