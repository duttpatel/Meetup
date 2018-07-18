export default{
  data(){
   return{
    email:'',
    password:''
   }
  },
  methods:{
   
   //sing in button click
   onSignin(){
    this.$store.dispatch('SigninUser',{email:this.email,password:this.password})
   },

   //close the alert
   onDismissed(){
     this.$store.dispatch('clearError')
   }

  },
  computed:{
   user(){
    return this.$store.getters.user
   },

   //get all error
   error(){
     return this.$store.getters.error
   }
  },
  watch:{
    user(value){
     if (value !== null && value !==undefined){
      this.$router.push('/')
     }
    }
  }
  
}