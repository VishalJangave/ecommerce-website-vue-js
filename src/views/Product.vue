<template>
  <div>
    <v-app class="product">
      <div>
        <h1 class="display-2 mt-10">productList</h1>
        <router-link to="/addproduct"
          ><v-btn class="blue mb-10 mr-10">AddProduct</v-btn></router-link
        >
      
      </div>
      <v-card class="wheat">
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
          :items="getproductlist"
          :search="search"
          item ="id"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <router-link
              :to="{ name: 'UpdateProduct', params: { id: item._id } }"
            >
              <v-icon small class="mr-2">mdi-pencil</v-icon></router-link
            >
            <v-icon small @click="deleteproduct(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Product",
  data() {
    return {
      search: "",
      items:'',
      headerArray: [
        {
          align: "start",
          sortable: false,
        },
        { text: "Id", value: "_id" },
        { text: "CompanyName", value: "pCompanyName" },
        { text: "ProductName", value: "pName" },
        { text: "Prize", value: "pPrize" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    ...mapActions(["getproductdata", "deleteproduct"]),
    

  },
  computed: {
    ...mapGetters(["getproductlist"]),

  },
  
  async mounted() {
    await this.getproductdata();
  },
};
</script>
<style scoped>
.blue {
  background-color: darkred;
  float: right;
  text-shadow: deeppink;
  width: 150px;
  margin-bottom: 10px;
}
.display-2 {
  text-transform: uppercase;
  display: block;
  text-align: center;
}
</style>