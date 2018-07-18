<template>
<v-container>
    <v-layout row wrap>
    <v-flex xs12>
        <v-card>
            <v-card-title>
               <h1> {{ Meetup.title}} </h1>
               <template v-if="userIsCreator">
                        <v-spacer></v-spacer>
                        <app-edit-meetup :meetup='Meetup'></app-edit-meetup>
               </template>
            </v-card-title>
            <v-card-media 
            :src="Meetup.imgURL"
            height="400px">
            </v-card-media>
            <v-card-text>
                <div class="info--text">
                    <h4>{{Meetup.eventdate}} - {{ Meetup.eventtime}}</h4>
                </div>
                <div>
                    <h4> Location: {{Meetup.location}} </h4>
                </div>
                <div>
                    <p> {{ Meetup.discription }} </p>
                </div>
            </v-card-text>
            <v-card-action>
                <v-spacer></v-spacer>
                <app-register-meetup :meetupid='id'> </app-register-meetup>
            </v-card-action>
        </v-card>
    </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default{
props:['id'],
computed : {

    //getting all meetup details
    Meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },

    //check user is sigin or not
    userIsAuth(){
        this.$store.getters.getuser.id !== null && this.$store.getters.getuser.id !== undefined
    },

    //show hide edit button
    userIsCreator(){
        if(this.userIsAuth){
            return false
        }
        return this.$store.getters.getuser.id === this.Meetup.createId 
    }
  },
  methods:{
      onRegister(){

      }
  }
}
</script>
<style>
</style>