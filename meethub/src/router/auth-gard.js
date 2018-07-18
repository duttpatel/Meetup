import { store } from '../store'
export default(to, form, next) => {
 if(store.getters.getuser){
  next()
 }
 else{
  next('/signin')
 }
}