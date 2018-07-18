<template>
  <v-dialog width="350px" persistent v-model="editDialog">
   <v-btn fab accent slot="activator">
    <v-icon>edit</v-icon>
   </v-btn>
   <v-card>
     <v-container>
       <v-layout row>
         <v-flex xs12>
           <v-card-title>
             Edit Meetup
           </v-card-title>
         </v-flex>
       </v-layout>
       <v-layout row>
         <v-flex xs12>
           <v-card-text>
             <v-text-field
                name="title"
                label="Meetup Title"
                id="title_txt"
                v-model="editedTitle"
                required>
              </v-text-field>
              <v-text-field
              name="discription"
              label="Meetup Description"
              id="discription_txt"
              v-model="editedDescription"
              multi-line
              required>
            </v-text-field>
            <v-layout row class="mb-2">
         <v-flex xs6 sm3 offset-sm3>
          <v-dialog
          ref="datedialog"
          persistent
          v-model="datemodal"
          lazy
          full-width
          width="290px"
          :return-value.sync="eventdate">
          <v-text-field
            slot="activator"
            label="Select Date"
            v-model="eventdate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="eventdate" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="datemodal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.datedialog.save(eventdate)">OK</v-btn>
          </v-date-picker>
         </v-dialog>
         </v-flex>
         <v-flex xs6 sm3>
          <v-dialog
          ref="timedialog"
          persistent
          v-model="timemodal"
          lazy
          full-width
          width="290px"
          :return-value.sync="eventtime">
          <v-text-field
            slot="activator"
            label="Select Time"
            v-model="eventtime"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-time-picker v-model="eventtime">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="timemodal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.timedialog.save(eventtime)">OK</v-btn>
          </v-time-picker>
         </v-dialog>
         </v-flex> 
        </v-layout>
           </v-card-text>
         </v-flex>
       </v-layout>
       <v-layout row>
         <v-flex xs12>
           <v-card-action>
             <v-btn flat @click="editDialog=false">Cancel</v-btn>
             <v-btn flat @click="onSaveClicked">Save</v-btn>
           </v-card-action>
         </v-flex>
       </v-layout>
     </v-container>
   </v-card>
  </v-dialog>
</template>

<script>
export default{
props:['meetup'],
data(){
 return {
   editDialog:false,
   editedTitle:this.meetup.title,
   editedDescription:this.meetup.discription,
   datemodal:false,
   timemodal:false,
   eventdate:this.meetup.eventdate,
   eventtime:this.meetup.eventtime
  }
 },
 methods:{
  onSaveClicked(){
   if(this.editedTitle.trim()==='' || this.editedDescription.trim()===''){
    return
   }
    this.editDialog=false
    let editedmeetup={
     id :this.meetup.id,
     title: this.editedTitle,
     discription: this.editedDescription,
     eventdate:this.eventdate,
     eventtime:this.eventtime
    }
    this.$store.dispatch('updateMeetup',editedmeetup)
  }
 }
}
</script>