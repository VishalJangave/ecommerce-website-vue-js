<template>
  <div>
    <v-app>
      <v-main class="Teams">
        <h1 class="subheading gray --text">Order Product</h1>
         <v-container class="my-5">
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3    v-for="order in getmyorderdetails " :key="order._id"  class="step2">
                       <div id="order" >
                        <v-responsive class="pt-9">
                          <v-avatar size="120" class="gery lighten-2">
                            <img :src="order.ordercart[0].img" />
                          </v-avatar>
                        </v-responsive>
                        <!-- <div class="orderdetails"> -->
                         <div >
                          ProductName : {{ order.ordercart[0].company }}
                        </div>
                       <div >
                          ProductModel: {{ order.ordercart[0].model }}
                        </div> 

                      <div >
                          FirstName : {{ order.firstName }}
                        </div>
                        <div>
                          LastName : {{ order.lastName }}
                        </div>
                        <div >
                          MobileNumber : {{ order.mobileNumber}}
                        </div>
                        <div >
                          Address : {{ order.address}},{{order.landMarks}} ,{{order.district}}
                        </div>
                         <div >
                        PinCode : {{ order.pinCode}}
                        </div>
                        <div >
                        State : {{ order.state}}
                        </div>
                         <v-btn @click="onGeneratePdf(order._id)" color ="red">download Invoice</v-btn>
                       
                 
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas' 
import axios from 'axios'
export default {
    name:'orderDetails',
    methods:{
        ...mapActions(["buyproductList"]),
    async  onGeneratePdf(id)
      {
        console.log("on Generate in order Details")
        console.log("userid ==" ,id)
        await axios.get("http://localhost:3003/myorders/pdf", {
        headers: {
          orderId: id
        },
         responseType: 'blob'
      }).then(res => {

        const file = new Blob(
          [res.data],
          { type: 'application/pdf' });
        // const fileURL = URL.createObjectURL(file);
        var downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(file);
        downloadLink.style.display = "none";
        downloadLink.setAttribute('download', res.data.firstName + "" + Date.now());
        document.body.appendChild(downloadLink);
        downloadLink.click();
        if (name == "quote") {
          this.setState({ isCompleting: true })
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
      }  
       

    },
    computed:{
        ...mapGetters(["getmyorderdetails"])
    },
    mounted()
    {
        this.buyproductList();
    }
    
}
</script>
<style scoped>
.step2{
  margin-bottom: 20px ;
  margin-top: 20px;

}

.Teams{
  background-color:lightgreen;
}
</style>