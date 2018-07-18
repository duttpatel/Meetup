<template>
  <v-dialog persistent v-model="registerDialog">
   <v-btn accent slot="activator" primary>
    {{userIsRegistered ? 'Unregister':'Register'}}
   </v-btn>
   <v-card>
   <v-container>
     <v-layout row wrap>
      <v-flex xs12>
       <v-card-title v-if='userIsRegistered'>Unregister from Meetup ?</v-card-title>
       <v-card-title v-else>Register to Meetup ?</v-card-title>
      </v-flex>
     </v-layout>

     <v-layout row wrap>
      <v-flex xs12>
       <v-card-text>
        You can change your decision
       </v-card-text>
      </v-flex>
     </v-layout>

     <v-layout row wrap>
      <v-flex xs12>
       <v-card-action>
        <v-btn flat @click="onConfirm">Confirm</v-btn>
        <v-btn flat @click="registerDialog=false">Cancel</v-btn>
       </v-card-action>
      </v-flex>
     </v-layout>
   </v-container>
   </v-card>
  </v-dialog>
</template>

<script>
export default{
 data(){
  return {
   registerDialog:false
  }
 },
 props:['meetupid'],
 computed:{
  userIsRegistered(){
   return this.$store.getters.getuser.registermeetup.findIndex(meetupid=>{
     return meetupid === this.meetupid
   }) >= 0
  }
 },
 methods:{
  onConfirm(){
    if(this.userIsRegistered){
     this.$store.dispatch('unregisterUserMeetup',this.meetupid)
     this.registerDialog=false
    }else{
     this.$store.dispatch('registerUserMeetup',this.meetupid)
     this.registerDialog=false
    }
  }
 }
}
</script>