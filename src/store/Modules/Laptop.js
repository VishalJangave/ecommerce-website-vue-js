import axios from "axios";
const laptopList = {

    state : {
       laptoplist:[],
       localtoken : localStorage.getItem("jwt") ,
       admintoken :''
    },
    getters:{
        getlaptoplist : (state) => {
            return state.laptoplist
        },
        getadmintokenlaptop :(state) =>{
            return state.getadmintoken;
          },
          gettokenlaptop:(state) =>{
            return state.jwttoken;
          },

    },
    mutations: {
        addNewlaptop : (state,laptop) =>{
          state.laptoplist = state.laptoplist.unshift(laptop);
      },
       getlaptopdata :(state,laptop) =>{
           state.laptoplist = laptop;
       },
       deletelaptopByid :(state,id) => {
           state.laptoplist = state.laptoplist.filter(laptop => laptop.id!=id)
       },
       updatelaptop:(state,laptop) =>{
         state.laptoplist = laptop;
       },  
       setadmintoken :(state ,admintoken)=>{
        // console.log("SET MUNNN==",admintoken)
        state.admintoken = admintoken;
      }
    },
    actions:{
        async addlaptop(context,laptop)
        {
          try{
              console.log("add laptop in vuex==",laptop);
              const admintoken = localStorage.getItem('jwtadmin');
              console.log("adminlaptop add Lptop",admintoken);
              console.log("adminlaptop add getters Lptop",this.getters.getadmintokenlaptop)
                  const response= await axios.post("http://localhost:3003/laptop/addlaptop", laptop ,{
                    headers:{
                        adminAuthorization: this.getters.getadmintokenlaptop  || admintoken
                      }
                  });
                  context.commit('addNewlaptop',response.data);
          }catch(e)
          {
            console.log(e)
          }
        },
       async getlaptopdata({commit})
        {
            const response = await axios.get("http://localhost:3003/laptop/laptoplist");
            commit("getlaptopdata",response.data)
        },
     async deleteLaptop({commit},id){
                console.log("idofLaptop==",id)
            await axios.delete("http://localhost:3003/laptop/" + id);
            commit("deletelaptopByid",id)
        },
        async updateLaptop(context,laptop)
        {
            console.log("this is onsubmit vuex update==" ,laptop);
            const response = await axios.patch("http://localhost:3003/laptop/" + laptop._id,laptop);
            context.commit("updatelaptop",response.data);
            console.log("this is onsubmit vuex after",response.data);
        }

    }

}
export default laptopList
