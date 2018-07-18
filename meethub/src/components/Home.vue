<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 sm6 class="text-xs-center text-sm-right">
      <v-btn large router to="/viewallmeetups">Explore Meetups</v-btn>
    </v-flex>
    <v-flex xs12 sm6 class="text-xs-center text-sm-left">
      <v-btn large router to="/meetup/create">Organize Meetups</v-btn>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12 class='text-xs-center'>
        <v-progress-circular 
        indeterminate 
        color="primary"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-2">
    <v-flex xs12 class="text-xs-center">
      <v-carousel style="cursor: pointer;">
        <v-carousel-item
        v-if = '!loading' 
        v-for="item in meetup" 
        :src="item.imgURL" 
        :key="item.id"
        @click="OnMeetupsLoad(item.id)">
          <div class="title">
          {{ item.title }}
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-2">
    <v-flex xs12 class="text-xs-center">
      Join our meetups!
    </v-flex>
  </v-layout>
</v-container>

</template>
<script>

export default {
  computed: {
    meetup () {
      return this.$store.getters.featureMeetup
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  methods: {
    OnMeetupsLoad (id) {
      this.$router.push('/viewallmeetups')
    }
  },
  name: 'HApp'
}
</script>
<style scoped>
.title{
  position:absolute;
  bottom: 60px;
  background-color: rgba(0,0,0,0.5);
  color:white;
  font-size: 2em;
  padding: 30px;
}
</style>