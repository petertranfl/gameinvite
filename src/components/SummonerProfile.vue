<template>
    <div class="main-container">
        <div v-if="summonerDataLoaded">
            <div class="homeIcon">
                <a @click="goHome">
                    <font-awesome-icon :icon="['fa', 'home']" size="2x" :style="{color: '#fad161', cursor: 'pointer'}" transform="up-2 right-4"></font-awesome-icon>
                </a>
            </div>
            <div class="searchBar">
                <input v-model="searchParam" type="text" v-on:keyup.enter="submitSearch">
                <a @click="submitSearch">
                <font-awesome-icon :icon="['fa', 'search']" size="lg" :style="{color: '#fad161', cursor: 'pointer'}" transform="up-2 right-4"></font-awesome-icon>
                </a>
            </div>
            <div class="profile-container">
                <img id="rankedCrest" :src="'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/' + leagueNumber + '_' + soloSummonerLeague + '/images/' + soloSummonerLeague + '_base_sheeng.png'" alt="" @error="noImg"/>
                <img id="profileIcon" :src="'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + profileIconID + '.jpg'"/>
                <img id="banner" :src="'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/regalia/banners/backgrounds/solidbanner_animatable.png'"/>
                <img id="trim" :src="'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/regalia/banners/trims/' + banner + '.png'"/>
            </div>
            <div class="text-container">
                <h2>{{summonerName}}</h2>
                <h3>Lvl: {{summonerLevel}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import AWS from 'aws-sdk';

export default {
    name: 'SummonerProfile',
    props: ['summonerName'],
    data() {
        return {
            searchParam: "",
            summonerLevel: Number,
            profileIconID: Number,
            encryptedSummonerID: String,
            flexSummonerLeague: String,
            soloSummonerLeague: String,
            leagueResults: [],
            summonerDataLoaded: false,
        }
    },
    created() {
        this.getNASummonerData();
    },
    watch: {
        summonerName() {
            this.getNASummonerData();
        },
        encryptedSummonerID(){
            this.getNALeagueData();
        }
    },
    computed: {
        /* eslint-disable */ 
        leagueNumber() {
            switch (this.soloSummonerLeague) {
                case "iron":
                    return "01";
                case "bronze":
                    return "02";
                case "silver":
                    return "03";
                case "gold":
                    return "04";
                case "platinum":
                    return "05";
                case "diamond":
                    return "06";
                case "master":
                    return "07";
                case "grandmaster":
                    return "08";
                case "challenger":
                    return "09";
            }
        /* eslint-enable */
        },
        banner() {
            switch(this.soloSummonerLeague) {
                case "iron":
                    return "trim_iron";
                case "bronze":
                    return "trim_bronze";
                case "silver":
                    return "trim_silver";
                case "gold":
                    return "trim_gold";
                case "platinum":
                    return "trim_plat";
                case "diamond":
                    return "trim_diamond";
                case "master":
                    return "trim_master";
                case "grandmaster":
                    return "trim_grandmaster";
                case "challenger":
                    return "trim_challenger";
                default:
                    return "defaulttrim";
            }
        }
    },
    methods: {
        /* eslint-disable */ 
        getNASummonerData() {
            this.$emit('loading', true)
            //load AWS credentials
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:98b70204-c8a3-4336-b9be-ea2f4393f3b1',
            },
            {
                region: 'us-east-1'
            });

            //create AWS service object
            const lambda = new AWS.Lambda({region: 'us-east-1'});
            //create JSON object for parameters for invoking Lambda function
            const summonerParams = {
                FunctionName: 'getNASummonerDataByName',
                InvocationType: 'RequestResponse',
                LogType: 'None',
                Payload: '{"SummonerName?": ' + `"` + this.summonerName + '"}'
            };
            //create variable to hold data returned by Lambda function
            let summonerResults;

            //Calls Lambda function 'GetSummonerDataByName' with given reqParams
            let getData = lambda.invoke(summonerParams).promise()
            getData.then(data => {
                if (data.Payload == "{}") {
                    this.$emit('error', true)
                    this.$emit('loading', false)
                } else {
                summonerResults = JSON.parse(data.Payload)
                //have to clear the store here in case someone enters in the same name from landing page
                this.$store.dispatch('commitSummonerID', "")
                this.$store.dispatch('commitAccountID', "")
                this.summonerLevel = summonerResults.summonerLevel;
                this.profileIconID = summonerResults.profileIconId;
                this.encryptedSummonerID = summonerResults.id;
                this.$store.dispatch('commitSummonerID', summonerResults.id);
                this.$store.dispatch('commitAccountID', summonerResults.accountId)
                }
            })
            getData.catch(error => {
                console.log(error)
                this.$emit('error', true)
            })
        },
        getNALeagueData() {
            //load AWS credentials
           AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:98b70204-c8a3-4336-b9be-ea2f4393f3b1',
            },
            {
                region: 'us-east-1'
            });

            //create AWS service object
            const lambda = new AWS.Lambda({region: 'us-east-1'});
            //create JSON object for parameters for invoking Lambda function
            const leagueParams = {
                FunctionName: 'getNALeagueDataByID',
                InvocationType: 'RequestResponse',
                LogType: 'None',
                Payload: '{"SummonerID?": ' + `"` + this.encryptedSummonerID + '"}'
            };

            //Calls Lambda function 'GetSummonerDataByName' with given reqParams
            let getLeagueData = lambda.invoke(leagueParams).promise()
            getLeagueData.then(data => {
                this.leagueResults = JSON.parse(data.Payload);
                this.sortNALeagueData(this.leagueResults);
                //console.log(this.leagueResults)
                this.$store.dispatch('commitLeagueTier', this.soloSummonerLeague);
                this.summonerDataLoaded = true;
                })
            getLeagueData.catch(error => {
                console.log(error)
                this.$emit('error', true)
            })
        },
        sortNALeagueData(data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].queueType == "RANKED_SOLO_5x5") {
                    this.soloSummonerLeague = data[i].tier.toLowerCase();
                }
                else this.flexSummonerLeague = data[i].tier.toLowerCase();
            }
        },
        noImg(event) {
            event.target.style.display='none'
        },
        goHome() {
            this.$router.push({
                name: 'LandingPage'
            })
        },
        submitSearch() {
            this.$emit('search', this.searchParam)
        },
        /* eslint-enable */
    },
}
</script>

<style scoped>
    .main-container {
        display: flex;
        height: 500px;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2em;
    }
    .homeIcon {
        position: absolute;
        padding-top: 1em;
        left: 17em;
    }
    .searchBar {
        position: absolute;
        padding-top: 1em;
        padding-left: 35em;
    }
    .searchBar input {
        height: 1.5rem;
        width: 15rem;
        font-size: 1.3rem;
        border-style: none;
        border-radius: 0.5rem;
        color: black;
        background: rgba(255, 255, 255, 0.205);
    }
    .profile-container {
        position: relative;
        width: 500px;
        height: 350px;
    }

    .profile-container #rankedCrest {
        position: absolute;
        top: 1.3em;
        left: 6.25em;
        z-index: 2;
    }
    .profile-container #profileIcon {
        position: absolute;
        width: 30%;
        height: auto;
        border-radius: 50%;
        top: 7em;
        right: 10.9em;
    }
    .profile-container #banner {
        height: 29em;
        width: 13.1em;
        z-index: -1;
    }

    .profile-container #trim {
        height: 6.6em;
        width: auto;
        position: absolute;
        top: 23.6em;
        left: 9em;
    }

    .text-container {
        position: relative
    }
    
    h2 {
        margin-top: -1.3em;
        color: #fad161;
        text-shadow: 1px 0 0 rgb(49, 42, 9), 0 -1px 0 rgb(49, 42, 9), 0 1px 0 rgb(49, 42, 9), -1px 0 0 rgb(49, 42, 9);
    }
    h3 {
        color: #fad161;
        text-shadow: 1px 0 0 rgb(49, 42, 9), 0 -1px 0 rgb(49, 42, 9), 0 1px 0 rgb(49, 42, 9), -1px 0 0 rgb(49, 42, 9);
    }
</style>