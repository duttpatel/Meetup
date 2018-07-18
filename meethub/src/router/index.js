import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllMeetup from '@/components/Meetups/Meetup'
import CreateMeetup from '@/components/Meetups/CreateMeetup/CreateMeetup.vue'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin/Signin.vue'
import Signup from '@/components/User/Signup/Signup.vue'
import ViewMeetup from '@/components/Meetups/ViewMeetup'
import authguard from './auth-gard.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetup/create',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter:authguard
    },
    {
      path: '/meetup/:id',
      name: 'ViewMeetup',
      props: true,
      component: ViewMeetup
    },
    {
      path: '/viewallmeetups',
      name: 'ViewAllMeetup',
      component: AllMeetup
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: Profile,
      beforeEnter:authguard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
})
