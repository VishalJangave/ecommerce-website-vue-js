<template>
  <div>
    <v-app>
      <v-card>
        <div>
          <h1>MOBILE_LIST</h1>
        </div>
         <div>
           <br><br>
         <router-link to="/addmobile"
          ><v-btn class="add">Add_mobile</v-btn></router-link
        >
      </div>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headerArray"
          :items="getmobilelist"
          :search="search"
              >
         <template v-slot:[`item.actions`]="{ item }">
            <router-link :to ="{name:'UpdateMobile', params:{id:item._id} }"> 
                <v-icon small class="mr-2">mdi-pencil</v-icon></router-link> 
            <v-icon small @click="deletemobile(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-divider></v-divider>
     
      <br>
      <br>
      <div>
        <h1>LAPTOP_LIST</h1>
      </div>
     <div>
        <router-link to="/addlaptop"
          ><v-btn class="add">Add_Laptop</v-btn></router-link
        >
     </div>
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
          :headers="LaptopheaderArray"
          :items="getlaptoplist"
          :search="Laptopsearch"
              >
         <template v-slot:[`item.actions`]="{ item }">
            <router-link :to ="{name:'UpdateLaptop', params:{id:item._id} }">
               <v-icon small class="mr-2">mdi-pencil</v-icon></router-link>
            <v-icon small @click="deleteLaptop(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-divider></v-divider>
       
    </v-app>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AllProduct",
  data() {
    return {
      search: "",
      Laptopsearch: "",
      headerArray: [
        {
          align: "start",
          sortable: false,
        },
        { text: "MobileName", value: "company"},
        { text: "Model", value: "model" },
        { text: "Prize", value: "prize" },
           { text: "img", value: "img" },
        { text: "Actions", value: "actions", sortable: false },
      ],
       LaptopheaderArray: [
        {
          align: "start",
          sortable: false,
        },
        { text: "LaptopCompany", value: "company"},
        { text: "LaptopModel", value: "model" },
        { text: "Prize", value: "prize" },
           { text: "img", value: "img" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions(["getmobiledata","deletemobile","getlaptopdata","deleteLaptop"]),
  },
  computed: {
    ...mapGetters(["getmobilelist","getlaptoplist","gettoken"]),
  },
 async mounted() {
  await  this.getmobiledata();
  this.getlaptopdata();
    //  this.getmobiledatabend();
  },
};
</script>
<style scoped>
.add {
  margin-left: 700px;
}
</style>
