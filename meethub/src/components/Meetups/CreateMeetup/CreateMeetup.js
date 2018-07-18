export default {
  data() {
    return {
      title: '',
      location: '',
      imgURL: '',
      discription: '',
      eventdate: null,
      eventtime: null,
      datemodal:false,
      timemodal:false,
      image:null
    }
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imgURL !== '' &&
        this.discription !== ''
      )
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      if(!this.image){
        return
      }
      const meetup = {
        title: this.title,
        location: this.location,
        image: this.image,
        discription: this.discription,
        eventdate: this.eventdate,
        eventtime:this.eventtime
      }
      this.$store.dispatch('CreateMeetup', meetup)
      this.$router.push('/viewallmeetups')
    },
    //open the file browser
    onPickFile(){
      this.$refs.selectFile.click()
    },

    //after selecting file from browser
    onFilePicked(event){

      const files=event.target.files
      let filename=files[0].name
      if(filename.lastIndexOf('.')<=0){
        return alert('Pleace add a valid file')
      }
      const fileReader=new FileReader()
      fileReader.addEventListener('load',()=>{
        this.imgURL=fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image=files[0]
    }
  }
}