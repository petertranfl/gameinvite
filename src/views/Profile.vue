<template>
  <div>
    <div class="loadingDiv" v-show="isLoading">
      <div class="loadingIcon"></div> 
    </div>
    <div v-show="!isLoading">
      <SummonerProfile @loading="beginLoading" @error="loadError" @search="search" :summonerName=summonerName></SummonerProfile>
      <ChampionMastery></ChampionMastery>
      <MatchHistory @loading="finishLoading" @error="loadError"></MatchHistory>
    </div>
  </div>
</template>

<script>
import SummonerProfile from '../components/SummonerProfile'
import ChampionMastery from '../components/ChampionMastery'
import MatchHistory from '../components/MatchHistory'

export default {
  name: 'Profile',
  components: {
    SummonerProfile,
    ChampionMastery,
    MatchHistory,
  },
  data() {
    return {
      summonerName: String,
      isLoading: false,
    }
  },
  methods: {
    beginLoading(isLoading) {
      this.isLoading = isLoading
    },
    finishLoading(isLoading) {
      this.isLoading = isLoading
    },
    loadError(isError) {
     if (isError)
      this.$router.push({
        name: "ErrorPage"
      })
    },
    search(newSummonerName) {
      this.summonerName = newSummonerName
      this.$store.commit('saveSummonerName', this.summonerName)
    }
  },
  created() {
    this.summonerName = this.$route.params.summonerName
    this.$store.commit('saveSummonerName', this.summonerName)
  }
}
</script>


<style>
body {
  margin: 0;
  padding: 0;
}
.loadingDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 100%;
}
.loadingIcon {
  border: 0.5rem solid #f3f3f3; /* Light grey */
  border-top: 0.5rem solid #3498db; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;
  align-content: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
