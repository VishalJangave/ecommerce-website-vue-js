<template>
   
     <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          rounded
          v-bind="attrs"
          v-model="dialog"
          v-on="on"
        >
        Continue
       
        </v-btn>
      </template>
      <v-card >
        <v-card-title class="disply-4"  >
          Are you want   Buy Product ?
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
             @click="dialog = false"
          >
           No
          </v-btn>
     
          <v-btn
            color="green darken-1"
            text
            @click = "buyproduct()"
          >
           Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</template>
<script>
export default {
    name:'Buydialog',
    data()
    {
        return{
            dialog:false
        }
    },
    methods:{
       buyproduct(){
         this.$emit('buyitem');
           this.dialog=false
        }
    },
  
}
</script>
<style scoped>
.del{
 
  width: 100px;
  padding: 0px 0px 0px ;
  color: brown;
  background-color: chartreuse;
}
.dialog{
  font-size: 90px;
}
</style>