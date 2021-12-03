<template>
    <v-flex xs2 sm4 md2>
     <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          text
          rounded
          v-bind="attrs"
          v-model="dialog"
          v-on="on"
        >
        Remove To Cart
        <!-- <v-icon>mdi-delete</v-icon> -->
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Remove Item
        </v-card-title>
        <v-card-text>Are u sure  you want to remove this item ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
             @click="dialog = false"
          >
           Cancle
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deletedid()"
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     </v-flex>
</template>
<script>
export default {
    name:'RemoveDialog',
    data()
    {
        return{
            dialog:false
        }
    },
    methods:{
        deletedid(){
         this.$emit('deleteid');
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
</style>