<template>
  <div>
    <v-app>
      <v-main class="Teams">
        <h1 class="subheading gray --text"> Admin Order Product</h1>
         <v-card>
        
        <v-card-title>
          <v-text-field
            v-model="Laptopsearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headerArray"
          :items="getalluseroderdetails"
          :search="Laptopsearch"
              >
        </v-data-table>
      </v-card>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'AorderDetails',
    data(){
        return{
             search: "",
      Laptopsearch: "",
      headerArray: [
        {
          align: "start",
          sortable: false,
        },
        { text: "FirstName", value: "firstName"},
        { text: "LastName", value: "lastName" },
          { text: "MobileNumber", value: "mobileNumber"},
           {text :"Company" , value :"ordercart[0].company"},
           {text :"Model" ,value :"ordercart[0].model"},
           {text : "TotalPrize" , value :"totalPrize"},
          { text: "Address", value: "address" },
           { text: "State", value: "state" },
           { text: "PinCode", value: "pinCode" },
           {text :"Status" ,value:"Status"}
      ],
        }
    },
    methods:{
        ...mapActions(["getallorderslist"]),
   
    },
    computed:{
        ...mapGetters(["getalluseroderdetails"])
    },
    mounted()
    {
        this.getallorderslist();
    }
    
}
</script>
<style scoped>
.step2{
  margin-bottom: 20px ;
  margin-top: 20px;

}


</style>