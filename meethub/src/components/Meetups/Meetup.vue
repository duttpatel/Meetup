<template>
  <v-container>
  <v-layout wrap row v-for="meetup in AllMeetups" :key= "meetup.id" class="mb-1">
    <v-flex class="xs12 sm8 md10 offset-sm2 offset-md1 mt-2">
      <v-card>
        <v-container fluid>
          <v-layout row>
          <v-flex xs5 sm4 md3>
              <v-card-media
              :src="meetup.imgURL"
              height="150px">
              </v-card-media>
          </v-flex>
          <v-flex sm8 md9>
            <v-card-title primary-title>
              <div>
                <h1>
                {{meetup.title}}
              </h1>
              <div class="mt-0">
                {{meetup.date}}
              </div>
              </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat :to="'/meetup/' + meetup.id"><v-icon left>arrow_forward</v-icon>View Meetup</v-btn>
              </v-card-actions>
          </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
export default{
  computed : {
    AllMeetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>