<template>
<div class="popup">
 
  
  <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" rounded> {{isName}}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
           
    
           :key="link.name"
            router
            :to="link.route"
          >
         <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title
              >{{link.name }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
       
  </div>
</template>
<script>
// import format from 'date-fns/format'
export default {
  name: "List",
  data() {
    return {
      title: "",
      content: "",
      due: null,
      links: [
        { icon: "mdi-cart", name: "MyCart", route: "/mycart" },
        { icon: "mdi-account", name: "My Profile", route: "/myaccount" },
        {icon :"mdi-cart", name:"Myorders",route:"/orderdetails"},
       
      ],
    };
  },
  methods: {
    submit() {
      console.log("title==", this.title, "Information==", this.content);
      this.$router.push({ name: "ProjectList" });
      this.$emit("projectadd");
    },
  },
  computed: {
    isName() {
      return JSON.parse(localStorage.getItem("User")).name;
    },
  },
};
</script>
<style scoped>
.popup{
  color: blue;
}
</style>