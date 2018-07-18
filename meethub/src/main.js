import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import * as firebase from 'firebase'
import alert from './components/Shared/Alert/Alert.vue'
import EditMeetupAlert from './components/Meetups/Edit/EditMeetupAlert.vue'
import RegisterAlert from './components/Meetups/Register/RegisterAlert.vue'
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component('app-alert',alert)
Vue.component('app-edit-meetup',EditMeetupAlert)
Vue.component('app-register-meetup',RegisterAlert)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({ 
      apiKey: "AIzaSyCtGYzIC-NypLTxW0oqhvP9i_KlKS_dkb8",
      authDomain: "meetup-12cfa.firebaseapp.com",
      databaseURL: "https://meetup-12cfa.firebaseio.com",
      projectId: "meetup-12cfa",
      storageBucket: "gs://meetup-12cfa.appspot.com",
      messagingSenderId: "139577856868"
    })

    firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          this.$store.dispatch('autosignin',user)
          this.$store.dispatch('fetchUserData')
        }
      })
    this.$store.dispatch('loadMeetup')
  } 
})
