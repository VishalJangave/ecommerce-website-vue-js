import axios from "axios";
const adminregistrationlist = {

    state : {
        adminlist:[]
    },
    mutations: {
        addNewadmin : (state,admin) =>{
          state.adminlist = state.adminlist.unshift(admin);
      }
    },
    actions:{
        async addAdmin(context,admin)
        {
          try{
        
                  const response= await axios.post("http://localhost:3003/admin/signup",admin);
                  context.commit('addNewadmin',response.data);
          }catch(e)
          {
            console.log(e)
          }
        },
    }

}
export default adminregistrationlist
