<template>
  <div class="errorContainer">
    <h1> Uh oh! Looks like we couldn't find the Summoner you were looking for!</h1>
    <h2>Please search for another Summoner below.</h2>
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
  name: 'ErrorPage',
  data() {
    return {
      summonerName: ""
    }
  },
  methods: {
    /* eslint-disable */ 
    submitSearch() {
      this.$router.push({
          name: "Profile",
          params: {
            summonerName: this.summonerName
          }
      })
    },
    /* eslint-enable */
  }
}
</script>


<style scoped>
.errorContainer {
  height: 100vh
}

h1 {
  margin-top: 0;
  padding-top: 4em;
  color: #fad161;
  text-shadow: 1px 0 0 rgb(49, 42, 9), 0 -1px 0 rgb(49, 42, 9), 0 1px 0 rgb(49, 42, 9), -1px 0 0 rgb(49, 42, 9);
}
h2 {
  padding-top: 1em;
  color: #fad161;
  text-shadow: 1px 0 0 rgb(49, 42, 9), 0 -1px 0 rgb(49, 42, 9), 0 1px 0 rgb(49, 42, 9), -1px 0 0 rgb(49, 42, 9);
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
</style>
