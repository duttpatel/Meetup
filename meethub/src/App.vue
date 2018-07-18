<template>
  <v-app light>
    <v-navigation-drawer v-model="drawerstate" app temporary>
    <v-list>
      <v-list-tile 
      v-for="item in menuItem" 
      :key="item.title"
      router
      :to="item.link">
        <v-list-tile-action>
          <v-icon> {{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="userIsAuthentiated" @click="onLogout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Logout</v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar class= "elevation-5">
      <v-toolbar-side-icon @click.stop="drawerstate = !drawerstate" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Meet Hub</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
        v-for="item in menuItem" 
        :key="item.title"
        :to="item.link"
        flat>
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthentiated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
      
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawerstate: false
    }
  },
  computed : {
    menuItem(){
      let menuItem = [
        {title: 'Signup', icon: 'face', link: '/signup'},
        {title: 'Signin', icon: 'lock_open', link: '/signin'}
      ]

      if (this.userIsAuthentiated){
        menuItem=[
        {title: 'View Meetups', icon: 'supervisor_account', link: '/viewallmeetups'},
        {title: 'Oraganize Meetups', icon: 'room', link: '/meetup/create'},
        {title: 'Profile', icon: 'person', link: '/profile'}
      ]
      }
      return menuItem 
       
    },
    userIsAuthentiated (){
      return this.$store.getters.user !== null && this.$store.getters.user != undefined
    }
  },
  methods:{

    onLogout(){
      this.$store.dispatch("Logout")
    }
  },
  name: 'App'
}
</script>
