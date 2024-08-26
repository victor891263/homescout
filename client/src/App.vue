<template>
    <nav>
        <div>
            <RouterLink to="/">🏠 Homescout</RouterLink>
            <div>
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </div>
        </div>
    </nav>
    <router-view/>
</template>

<style lang="scss">
#app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    h1,
    h2 {
        font-family: 'Georgia', serif;
        font-weight: 400;
        letter-spacing: -0.01em;
    }

    p {
        line-height: 1.5;
    }

    a {
        color: initial;
        cursor: pointer;
    }

    input,
    select,
    textarea,
    button {
        font-size: 1rem;
        outline: none;
    }

    textarea {
        font-family: Arial, sans-serif;
        resize: vertical;
    }

    button {
        align-items: center;
        cursor: pointer;
        font-weight: bold;

        &.black {
            background-color: black;
            border: none;
            color: white;

            &:hover {
                background-color: rgb(50, 50, 50);
            }
        }
    }

    .truncated-text {
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .main {
        max-width: 768px;
        margin-left: auto;
        margin-right: auto;
        padding: 10rem 1.5rem;
        width: 100%;
    }

    nav {
        align-items: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;

        a {
            color: initial;
            text-decoration: none;
        }

        > div {
            background-color: white;
            flex-direction: row;
            justify-content: space-between;
            max-width: 768px;
            padding: 1.5rem;
            width: 100%;

            > div {
                flex-direction: row;
                gap: 1rem;
            }
        }
    }
}

.app,
.app * {
    display: flex;
    flex-direction: column;
}
</style>
