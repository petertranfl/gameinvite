<template>
    <div class="landingPage">
        <div class="landingText">
            <h1> Welcome to the SummonerSpy</h1>
        </div>
        <div class="searchBar">
            <input v-model="summonerName" type="text" v-on:keyup.enter="submitSearch">
            <a @click="submitSearch">
            <font-awesome-icon :icon="['fa', 'search']" size="lg" :style="{color: '#fad161', cursor: 'pointer'}" transform="up-2 right-4"></font-awesome-icon>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
        summonerName: ""
        }
    },
    methods: {
        submitSearch() {
            this.$router.push({
                name: "Profile",
                params: {
                    summonerName: this.summonerName
                }
            })
        },
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'Friz Quadrata Regular'; /* League of Legends Font (almost) */
        src: url('../assets/Friz Quadrata Regular.woff') format('truetype'); /* Safari, Android, iOS */
        src: url('../assets/Friz Quadrata Regular.woff') format('woff') /* Modern Browsers */
    }
    .landingPage {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .landingText {
        justify-content: center;
        width: 100vw;
        margin-top: 3rem;
        color: #ffc21b;
        text-shadow: 1px 0 0 rgb(77, 65, 1), 0 -1px 0 rgb(77, 65, 1), 0 1px 0 rgb(77, 65, 1), -1px 0 0 rgb(77, 65, 1);
    }
    .searchBar {
        margin-top: 15rem;
    }
    .searchBar input {
        height: 1.5rem;
        width: 20rem;
        font-size: 1.3rem;
        border-style: none;
        border-radius: 0.5rem;
        color: black;
        /*border-color:rgb(77, 65, 1);*/
        background: rgba(255, 255, 255, 0.205);
    }
</style>