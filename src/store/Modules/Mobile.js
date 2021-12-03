import axios from "axios";

const mobileList = {

  state: {
    mobilelist: [],
    mycart: [],
    myorders:[],
    jwttoken : '',
    localtoken : localStorage.getItem("jwt") ,
    admintoken :'',
    myorderdetails:[],
    alluseroderdetails :[]
  },
  getters: {
    getmobilelist: (state) => {
      return state.mobilelist
    },
    getmycart: (state) => {
      return state.mycart
    },
    getmyorders :(state) =>{
      return state.myorders
    },
    getmyorderdetails :(state) =>{
      return state.myorderdetails
    },
    gettoken:(state) =>{
      return state.jwttoken;
    },
    getadmintoken :(state) =>{
      return state.getadmintoken;
    },
    getalluseroderdetails:(state) =>{
      return state.alluseroderdetails
    }

  },
  mutations: {
    addNewMobile: (state, mobile) => {
      state.mobilelist = state.mobilelist.unshift(mobile);
    },
    getmobidata: (state, mobile) => {
    state.mobilelist = mobile;
    },

    deleteMobileByid: (state, id) => {
      state.mobilelist = state.mobilelist.filter(mobile => mobile.id != id)
    },
    deleteCartByid: (state, id) => {
      state.mycart = state.mycart.filter(mycart => mycart.id != id)
    },
    updatemobile: (state, mobile) => {
      state.mobilelist = mobile;
    },
    AddCart: (state, cart) => {
      state.mycart = cart;
    },
    Addorders: (state, order) => {
      state.myorders = order;
    },
    getCart: (state, cart) => {
      state.mycart = cart;
    },
    getOrders :(state,order) =>{
      state.myorders = order
    },
    settoken: (state, token) => {
      // console.log("SET MUNNN==",token)
      state.jwttoken = token;
    },
    setadmintoken :(state ,admintoken)=>{
      // console.log("SET MUNNN==",admintoken)
      state.admintoken = admintoken;
    },
    Myordersdetails :(state ,myorder)=>{
      state.myorderdetails = myorder
    },
    buyproduct :(state ,product) =>{
      state.myorderdetails = product
    },
    getorderList :(state ,order) =>{
      state.alluseroderdetails = order
    }
  },
  actions: {
    async addMobile(context, mobile) {
      console.log("add mobile vuex ==", mobile)
      try {
            // console.log("admin token add mobile", this.getters.getadmintoken)
            const admintoken = localStorage.getItem("jwtadmin");
        const response = await axios.post("http://localhost:3003/mobile/addmobile", mobile ,{
          headers:{
            adminAuthorization: this.getters.getadmintoken  || admintoken
          }
        });
        context.commit('addNewMobile', response.data);
      } catch (e) {
        console.log(e)
      }
    },
    async getmobiledata({ commit }) {
      const response = await axios.get("http://localhost:3003/mobile/mlist");
      commit("getmobidata", response.data)
      console.log("getdataaa",response.data)

    },
    async deletemobile({ commit }, id) {
      console.log("this is delete ==",id)
      const admintoken = localStorage.getItem("jwtadmin");
      await axios.delete("http://localhost:3003/mobile/" + id ,{
        headers:{
          adminAuthorization: this.getters.getadmintoken  || admintoken
        }
      });
      commit("deleteMobileByid", id)
    },
    async addmycart(context, mycartdata) {
      try {
        // console.log("hiii this is addmycart==", mycartdata.mycartdata)
        // console.log("hiii this is productIdd==", mycartdata);
        const tokens = localStorage.getItem("jwt");
        const userid =  JSON.parse(localStorage.getItem("User"))._id
      // console.log("this is add method userid",userid)
        const res = await axios.post("http://localhost:3003/mobile/addcart", mycartdata,{
          headers: {
            Authorization: this.getters.gettoken  || tokens,
            userId :userid
         }
        });
        context.commit("AddCart", res.data)
        

      } catch (err) {
        console.log("this is mycsrt err==", err)
      }
    },
    async getcart({ commit }) {
   
      const tokens = localStorage.getItem("jwt")
    
      const userid =  JSON.parse(localStorage.getItem("User"))._id
      // console.log("this is get method userid",userid)
      // console.log( "token in set local==", tokens)
      const response = await axios.get("http://localhost:3003/mobile/mycart" ,{
        headers: {
          Authorization: this.getters.gettoken  || tokens,
          userId:userid
       }
      });

      commit("getCart", response.data)
      // console.log("data=", response.data)

    },
    async deletecart({ commit }, id) {
      // console.log("iddd---", id)
      await axios.delete("http://localhost:3003/mobile/carts/" + id);
      commit("deleteCartByid", id)
      location.reload();
    },
       async updateMobile(context,mobile)
        {
            console.log("this is update token vuex", this.getters.getadmintoken );
            const admintoken = localStorage.getItem("jwtadmin");
            const response = await axios.patch("http://localhost:3003/mobile/" + mobile._id , mobile,{
              headers:{
                adminAuthorization: this.getters.getadmintoken  || admintoken
              }
            });
            context.commit("updatemobile",response.data);
            // console.log("this is onsubmit vuex after",response.data);
        },
        async addmyorder(context, myorder) {
          try {
            // console.log("hiii this is addmycart==", mycartdata.mycartdata)
            // console.log("hiii this is addorders==", myorder);
            const tokens = localStorage.getItem("jwt");
            const userid =  JSON.parse(localStorage.getItem("User"))._id
          // console.log("this is add method userid",userid)
            const res = await axios.post("http://localhost:3003/myorders/addmyorders", myorder ,{
              headers: {
                Authorization: this.getters.gettoken  || tokens,
                userId :userid
             }
            });
            context.commit("Addorders", res.data)
            
      
          } catch (err) {
            console.log("this is mycsrt err==", err)
          }
        },
        async getorderslist({ commit }) {
   
          const tokens = localStorage.getItem("jwt")
        
          const userid =  JSON.parse(localStorage.getItem("User"))._id
          // console.log("this is get method userid",userid)
          // console.log( "token in set local==", tokens)
          const response = await axios.get("http://localhost:3003/myorders/myorders" ,{
            headers: {
              Authorization: this.getters.gettoken  || tokens,
              userId:userid
           }
          });
    
          commit("getOrders", response.data)
          // console.log("orders=", response.data)
    
        },
        async myorderdetails(context, myorder) {
          try {
            // console.log("hiii this is addmycart==", mycartdata.mycartdata)
            // console.log("hiii this is myordersdetails==", myorder);
            const tokens = localStorage.getItem("jwt");
            const userid =  JSON.parse(localStorage.getItem("User"))._id
            // const details =JSON.parse(localStorage.getItem("myorder")) 
         
          // console.log("this is add method userid",userid)
            const res = await axios.post("http://localhost:3003/myorders/addmyordersdetails", myorder ,{
              headers: {
                Authorization: this.getters.gettoken  || tokens,
                userId :userid
             }
            });
            context.commit("Myordersdetails", res.data)
            
      
          } catch (err) {
            console.log("this is mycsrt err==", err)
          }
        },
        async buyproductList(context){
          try{
            const tokens = localStorage.getItem("jwt");
            const userid =  JSON.parse(localStorage.getItem("User"))._id
            console.log("userid in buy product==",userid);
            const response = await axios.get("http://localhost:3003/myorders/buyproducts" ,{
              headers: {
                Authorization: this.getters.gettoken  || tokens,  
                userId:userid
             }  
            });
            context.commit('buyproduct',response.data)
            console.log("Res data==",response.data);
          }catch(err)
          {
            console.log("this is buyProduct err==", err)
          }
        },

        async getallorderslist({commit}){
          try {
            const tokens = localStorage.getItem("jwtadmin");
            const response = await axios.get("http://localhost:3003/myorders/getorderlist" ,{
              headers: {
                Authorization: this.getters.admintoken  || tokens,  
             }  
            });
            commit('getorderList',response.data)
          } catch (error) {
            console.log(error)
          }
        } 
      },


}
export default mobileList
