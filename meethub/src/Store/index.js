import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
state: {

    //store all meetups data
    loadedMeetups: [],

    //store user data
    user : null,
    loading:false,
    error:null
},
mutations:{

    //Create the single meetup
    CreateMeetup(state,payload){
        state.loadedMeetups.push(payload)
    },

    //update meetup
    updateMeetup(state,payload){
       const editmeetup = state.loadedMeetups.find(meetup =>{
           return meetup.id === payload.id
       })
       
       if(payload.title){
        editmeetup.title=payload.title
    }
    if(payload.discription){
        editmeetup.discription=payload.discription
    }

    if(payload.eventdate){
        editmeetup.eventdate=payload.eventdate
    }
    
    if(payload.eventtime){
        editmeetup.eventtime=payload.eventtime
    }


    },

    //register user in store state
    registerUser(state,payload){
        state.user=payload
    },

    //set loading value
    setLoading(state,payload){
        state.loading=payload
    },

    //set error value
    setError(state,payload){
        state.error=payload
    },

    //clear error value
    clearError(state){
        state.error=null
    },

    //set all meetups
    setLoadedMeetups(state,payload){
        state.loadedMeetups=payload
    },

    //set user data to null
    setUser(state,payload){
        state.user=payload
    },

    registerUserMeetup(state,payload){
        const id=payload.id
        if (state.user.registermeetup.findIndex(meetup => meetup.id === id) >= 0){
            return
        }
        state.user.registermeetup.push(id)
        state.user.fbkey[id]=payload.fbkey
    },
    
    unregisterUserMeetup(state,payload){
        const registermeetup=state.user.registermeetup
        registermeetup.splice(registermeetup.findIndex(meetup => meetup.id === payload),1)
        Reflect.deleteProperty(state.user.fbkey,payload)
    }

},
actions:{
    //load meetups from firebase
    loadMeetup({commit}){
        commit('setLoading',true)
        firebase.database().ref('meetups')
        .once('value')
        .then(
            (data) => {
                commit('setLoading',false)
                const meetups=[]
                const obj = data.val()
                for(let key in obj){
                    meetups.push({
                        id :key,
                        title: obj[key].title,
                        location: obj[key].location,
                        imgURL: obj[key].imgURL, 
                        discription: obj[key].discription,
                        eventdate: obj[key].eventdate,
                        eventtime: obj[key].eventtime,
                        createId: obj[key].createId
                    })
                }

                //store all meetups to store 
                commit('setLoadedMeetups',meetups)
            }
        )
        .catch(
            error=>{
                commit('setLoading',false)
                console.log(error)
            }
        )
    },
    //Create single meetup
    CreateMeetup({commit, getters}, payload){
        console.log(getters.getuser)

        const meetup={
            title: payload.title,
            location: payload.location,
            discription: payload.discription,
            eventdate: payload.eventdate,
            eventtime: payload.eventtime,
            createId: getters.getuser.id
        }
        let imgURL
        let key
        firebase.database().ref('meetups')
        .push(meetup)
        .then(
            data =>{
                        key=data.key
                        console.log(data)
                        return key
                    }
        )
        .then(key=>{
            const filename=payload.image.name
            const extension=filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('meetups/'+key+'.'+extension).put(payload.image)
        })
        .then(filedata =>{
            imgURL=filedata.metadata.downloadURLs[0]

            return firebase.database().ref('meetups').child(key).update({imgURL:imgURL})
        })
        .then(()=>{
            commit('CreateMeetup',{
                                ...meetup,
                                imgURL:imgURL,
                                id : key
                })
        })
        .catch(
            error =>{
                console.log(error)
            }
        )
    },

    updateMeetup({commit},payload){
        const updateObj={}

        if(payload.title){
            updateObj.title=payload.title
        }
        if(payload.discription){
            updateObj.discription=payload.discription
        }

        if(payload.eventdate){
            updateObj.eventdate=payload.eventdate
        }
        
        if(payload.eventtime){
            updateObj.eventtime=payload.eventtime
        }

        firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(()=>{
            commit('updateMeetup',payload)
        })
        .catch (error => {
            console.log(error)
        })
    },

    //register user in firebase 
    SignupUser ({commit},payload){

        //wait for loading all data into firebase
        commit('setLoading',true)
        commit('clearError')
        // pass data  to firebase
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
        .then(
            user => {
                commit('setLoading',false)
                const newuser ={
                    id:user.uid,
                    registermeetup:[],
                    fbkey:[]
                }
                commit('registerUser',newuser)
            }
        )
        .catch(
            error => {
                console.log(error)
                commit('setLoading',false)
                commit('setError',error)
            }
        )
    },

    //sign in information
    SigninUser({commit,getters},payload){
        commit('setLoading',true)
        commit('clearError')
        //pass email and password to check valid user 
        firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
        .then(
            user => {
                commit('setLoading',false)
                const newuser ={
                    id:user.uid,
                    registermeetup:[],
                    fbkey:[]
                }
                commit('registerUser',newuser)
                console.log(getters.getuser)
            }
        )
        .catch(
            error => {
                commit('setLoading',false)
                commit('setError',error)
            }
        )
    },

    registerUserMeetup({commit,getters},payload){
        firebase.database().ref('/users/'+ getters.getuser.id).child('/registration').push(payload)
        .then(data =>{
            commit('registerUserMeetup',{id:payload,fbkey:data.key})
        })
        .catch( error => {
            console.log(error)
        })

    },

    unregisterUserMeetup({commit,getters},payload){
        const user=getters.getuser
        if(!user.fbkey){
            return
        }
        const fbkey=user.fbkey[payload]
        firebase.database().ref('/users/'+ getters.getuser.id + '/registration').child(fbkey).remove()
        .then(() =>{
            commit('unregisterUserMeetup',payload)
        })
        .catch( error => {
            console.log(error)
        })
    },
    //clear error object
    clearError({commit}){
        commit('clearError')
    },

    //auto signin 
    autosignin({commit},payload){
        const user ={
            id:payload.uid,
            registermeetup:[],
            fbkey:[]
        }
        commit('registerUser',user)
    },

    //fetch user data from user
    fetchUserData({commit,getters}){
        firebase.database().ref('/users/'+getters.getuser.id + '/registration').once('value')
        .then(data => {
            const val=data.val()
            let registermeetup=[]
            let swapppair={}
            for(let key in val){
                registermeetup.push(val[key])
                swapppair[val[key]]=key
            }
            const updateduser ={
                id:getters.getuser.id,
                registermeetup:registermeetup,
                fbkey:swapppair
            }
            commit('registerUser',updateduser)
        })
    },
    
    //logout
    Logout({commit}){
        firebase.auth().signOut()
        commit('setUser',null)
    }
},
getters:{
    
    //return all meetup
    loadedMeetups (state) {
        return state.loadedMeetups
    },

    //return first five meetups
    featureMeetup(state,getters){
        return getters.loadedMeetups.slice(0,5)
    },

    //return meetup with particular meetup id
    loadedMeetup (state) {
        return (meetupid) => {
            return state.loadedMeetups.find((meetup)=>{
                return meetup.id === meetupid
            })
        }
    },

    //return user data
    user(state){
        return state.user
    },
    getuser(state){
        return state.user
    },

    //return error
    error(state){
        return state.error
    },

    //return loading
    loading(state){
        return state.loading
    }

    //
}

})