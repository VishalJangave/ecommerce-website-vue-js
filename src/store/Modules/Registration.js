import axios from "axios";
const registrationlist = {

    state : {
        userlist:[],
        errormsg:""
    },
    getters:{
      geterrormsg:(state)=>{
        return state.errormsg
      },
      getuserlist:(state) =>{
        return state.userlist
      }
    },
    mutations: {
        addNewUser : (state,user) =>{ 
          state.userlist = state.userlist.unshift(user);
      },
      adderrormsg :(state,data) =>{
        state.errormsg = data;
      }
      
    },
    actions:{
        async addUser(context,user)
        {
          try{
                  const {err ,data }= await axios.post("http://localhost:3003/signup",user);
                  console.log("data in user =",data);
                  if(err)
                  {
                    return err
                  }
                  if(data == "3")
                  {
                    context.commit('adderrormsg',data)
                  }
                  else if( data == "1")
                  {
                    context.commit('adderrormsg',data)
                  }
                  else{
                    context.commit('addNewUser',data);

                  }
                //  this.errormsg = response.data
                  
          }catch(e)
          {
            console.log(e)
          }
        },
    }

}
export default registrationlist
