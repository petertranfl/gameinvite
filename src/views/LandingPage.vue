<template>
    <div class="landingPage">
        <div class="landingText">
            <h1> Welcome to the SummonerSpy</h1>
        </div>
        <div class="searchBar">
            <input v-model="summonerName" type="text" v-on:keyup.enter="submitSearch" placeholder="Enter a Summoner Name">
            <a @click="submitSearch">
            <font-awesome-icon :icon="['fa', 'search']" size="lg" :style="{color: '#fad161', cursor: 'pointer'}" transform="up-2 right-4"></font-awesome-icon>
            </a>
        </div>
        <div class="infoBox">
            <div class="title">
                <h3> Check your mastery stats and match history instantly with SummonerSpy </h3>
            </div>
            <div class="info">
                <div class="infoBox1">
                    <img :src="'./IntroPic1.png'" id="introPic1">
                    <font-awesome-icon :icon="['fa', 'long-arrow-alt-right']" size="2x" id="arrow"></font-awesome-icon>
                </div>
                <div class="infoBox2">
                    <img :src="'./IntroPic2.png'" id="introPic2">
                </div>
                <div class="">
                </div>
            </div>
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
        align-items: center;
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
        margin-top: 10rem;
    }
    .searchBar input {
        height: 1.5rem;
        width: 20rem;
        font-size: 1.3rem;
        border-style: none;
        border-radius: 0.5rem;
        color: black;
        background: rgba(255, 255, 255, 0.205);
    }
    .infoBox {
        height: 20rem;
        width: 55rem;
        margin-top: 4rem;
        border-radius: 0.75rem;
        background: rgba(165, 165, 165, 0.562);
        
    }
    .infoBox h3 {
        margin-top: 0.5rem;
        font-size: 1.3rem;
        color: #ffc21b;
        text-shadow: 1px 0 0 rgb(77, 65, 1), 0 -1px 0 rgb(77, 65, 1), 0 1px 0 rgb(77, 65, 1), -1px 0 0 rgb(77, 65, 1);
    }
     .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #arrow {
        position: absolute;
        margin-top: 3em;
        margin-left: 2.5em;
        color: #ffc21b;
        text-shadow: 1px 0 0 rgb(77, 65, 1), 0 -1px 0 rgb(77, 65, 1), 0 1px 0 rgb(77, 65, 1), -1px 0 0 rgb(77, 65, 1);
    }
    .infoBox1 {
        margin-left: 2em;
    }
    .infoBox2 {
        margin-right: -9rem;
    }
    #introPic1 {
        height: 13em;
        margin-top: 2em;
    }
    #introPic2 {
        height: 13em;
        width: 20em;
        margin-top: 2em;
    }
    .title {
        border-bottom: 1px solid black;
    }
    ::placeholder {
        color: black;
    }
</style>