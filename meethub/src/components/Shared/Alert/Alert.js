export default{
 methods:{
  onDismissed(){
   this.$emit('dismissed')
  }
 },
 props:['text']
}