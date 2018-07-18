
export default{
 data(){
  return {
   email:'',
   password:'',
   confirmpassword:''
  }
 },
 computed:{

  //comparing the password and confirm password
  ComparePassword(){
   return this.password !== this.confirmpassword ?'Password is not match':''
  },

  //getting user from store state
  user(){
   return this.$store.getters.user
  },

  //check is there any error or not while signup
  error(){
   return this.$store.getters.error
  }
 },
 watch : {
  //watching use property for any change
  user(value){
   if (value !== null && value !== undefined){
    this.$router.push('/')
   }
    
  }
 },
 methods:{
  //subit all data
  onSignup(){

   // store data in firebase 
   this.$store.dispatch('SignupUser',{email : this.email,password:this.password})

   //vuex
   console.log({email:this.email,password:this.password,confirmpassword:this.confirmpassword})
  },

  //alert dismiss
  onDismissed(){
   //console.log('dismissed alert')
   this.$store.dispatch('clearError')
  }
 }
}