<template>
  <div>
    <v-app>
      <v-main>
        <div ref="testHtml">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" color="black">
                <span class="black--text">Address</span>
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2" color="black">
                <span class="black--text"> order Summary</span>
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3" color="black">
                <span> payment method</span>
              </v-stepper-step>
               <v-divider></v-divider>
                <v-stepper-step  :complete="e1 > 4" step="4" color="black">
                <span>CardPayment</span>
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="5" color="black">
                <span> orderdetails</span>
              </v-stepper-step>
               
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1" color="red">
                <v-card class="mb-20 mt-12" xs12 sm6 md4 lg3 height="450px">
                  <v-card-text>
                    <div v-for="err in errmsg" :key="err">
                 <h1 style="color: red">{{err}}</h1> 
                </div>
                  </v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-row>
                      <v-col md="4">
                        <v-text-field
                          label="FirstName *"
                          type="text"
                          name="Firstname"
                          v-model="firstName"
                          v-validate="'required'"
                          :error-messages="errors.collect('Firstname')"
                        />
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="LastName *"
                          type="text"
                          name="lastName"
                          v-model="lastName"
                          v-validate="'required'"
                          :error-messages="errors.collect('lastName')"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Address*"
                          type="text"
                          name="address"
                          v-model="address"
                          v-validate="'required'"
                          :error-messages="errors.collect('address')"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4">
                        <v-text-field
                          label="LandMarks"
                          type="text"
                          name="landMarks"
                          v-model="landMarks"
                          v-validate="'required'"
                          :error-messages="errors.collect('landMarks')"
                        />
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="District*"
                          type="text"
                          name="district"
                          v-model="district"
                          v-validate="'required'"
                          :error-messages="errors.collect('district')"
                        />
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="State*"
                          type="text"
                          name="state"
                          v-model="state"
                          v-validate="'required'"
                          :error-messages="errors.collect('state')"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4">
                        <v-text-field
                          label="PinCode*"
                          type="number"
                          name="pinCode"
                          v-model="pinCode"
                          v-validate="'required'"
                         
                          :error-messages="errors.collect('pinCode')"
                        />
                      </v-col>
                      <v-col md="4">
                        <v-text-field
                          label="MobileNumber*"
                          type="number"
                          name="mobileNumber"
                          v-model="mobileNumber"
                          v-validate="'required|max:10'"
                           :counter ="10"
                          :error-messages="errors.collect('mobileNumber')"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card>
                <AddDialog
                  @addtocart="onNext()"
                  aria-disabled="!valid"
                ></AddDialog>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container class="my-5">
                  <v-layout row wrap>
                   <div v-for="err in errmsg" :key="err">
           <h1 style="color: red">{{err}}</h1> 
              </div>
                    <v-flex xs12 sm6 md4 lg3>
                      <div class="step2">
                        <v-responsive class="pt-9">
                          <v-avatar size="120" class="gery lighten-2">
                            <img :src="ismyorderdata.img" />
                          </v-avatar>
                        </v-responsive>

                        <div>ProductName : {{ ismyorderdata.company }}</div>

                        <div>ProductModel: {{ ismyorderdata.model }}</div>

                        <div>TotalPrize : {{ istotalPrize }}</div>
                        <div>
                          quantity :
                          <select
                         
                            placeholder="quantity"
                            name="Select option"
                            id="dropdown"
                            v-model="quantity"
                          >
                            <option>Select Option</option>
                            <option
                              v-for="item in items"
                              :value="item"
                              :key="item"
                            >
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <div class="orderdetails">
                          <v-btn class="primary mr-16"  rounded @click="prev()">
                            Previous
                          </v-btn>
                          <BuyDialog
                            @buyitem="addorderdetails()"

                          />
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="payment">
                   <div v-if=" IsCheckbox == true && IsCheckbox1 == true" style="color:red"> *Please select any one </div>
      <v-container fluid  class="checkbox">

    <v-checkbox
      v-model="checkbox1"
      label="Cash On Delivary"
    ></v-checkbox>
     <v-checkbox
      v-model="checkbox3"
      label="UPI"
    ></v-checkbox>
     <v-checkbox
      v-model="checkbox4"
      label="Net Banking"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox2"
      label="Credit/Debit/Atm Card"
    ></v-checkbox>
  </v-container>
                  <v-btn color="primary" rounded @click="prev()" class="mr-16 mb-10"> Previous </v-btn>
     <v-btn color="primary" rounded @click="chekboxnext()"  class="mb-10">
                    countinue
                  </v-btn>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="4" v-if=" IsCheckbox == true && IsCheckbox1 == false">
                <v-card class="payment">
                
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="cardNumber*"
                          type="Number"
                          name="cardNumber"
                          v-validate="'required'"
                          :error-messages="errors.collect('cardNumber')"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Valid Upto"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" type="month" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn  color="primary" @click="modal = false" >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="CVC*"
                          type="Number"
                          name="CVC"
                          v-validate="'required'"
                          :error-messages="errors.collect('CVC')"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="name on Card*"
                          type="text"
                         
                          name="cardName"
                          v-validate="'required'"
                          :error-messages="errors.collect('cardName')"
                        />
                      </v-col>
                    </v-row>
                  <v-btn color="primary" @click="prev()" class="mr-16" rounded> Previous </v-btn>
                  
                  <v-btn color="primary" @click="onSubmit()" rounded >
                    countinue
                  </v-btn>
                  <!-- <ConfirmDialog @toConfirmorder = "onSubmit()" ></ConfirmDialog> -->
                   <div class="orderdetails">
                                <v-btn @click="onGeneratePdf()" color="red"
                                  >download Invoice</v-btn
                                >
                      </div>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="5">
                <v-container id="step4">
                  <v-layout row wrap>
                      <v-flex
                          xs12
                          sm6
                          md4
                          lg3
                          v-for="(order, index) in buyproductdetails"
                          :key="order._id"
                        >
                        <div v-if="index < 1" >
                             <v-responsive class="pt-9">
                                <v-avatar size="120" class="gery lighten-2">
                                  <img :src="ismyorderdata.img" />
                                </v-avatar>
                              </v-responsive>
                            <div class="orderdetails">
                              <div>ProductName : {{ ismyorderdata.company }}</div>
                              <div>ProductModel: {{ ismyorderdata.model }}</div>

                              <div>FirstName : {{ order.firstName }}</div>
                              <div>LastName : {{ order.lastName }}</div>
                              <div>MobileNumber : {{ order.mobileNumber }}</div>
                              <div>  Address : {{ order.address }},{{ order.landMarks }},{{ order.district }} </div>
                              <div>PinCode : {{ order.pinCode }}</div>
                              <div>State : {{ order.state }}</div>
                              </div>
                              <div class="orderdetails">
                                <v-btn @click="onGeneratePdf()" color="red"
                                  >download Invoice</v-btn
                                >
                            </div>
                             <div class="btn">
                                    <router-link to="/">
                                        <v-btn class="primary" rounded
                                          >Go To Home</v-btn
                                      ></router-link >
                                </div>
                            </div>
                    </v-flex>
                  </v-layout>
                </v-container>
                     
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
  
      </v-main>
    </v-app>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddDialog from "../dialog/AddDialog.vue";
import BuyDialog from "../dialog/BuyDialog.vue";
import swal from 'sweetalert'
import axios from "axios";
export default {
  name: "MyOrders",
  components: {
    AddDialog,
    BuyDialog,
  },
  data() {
    return {
      e1: 1,
      abc: localStorage.getItem("myorderproductId"),
      ordercart: [],
      quantity: 0,
      buyproductdetails: [],
      items: [1, 2, 3, 4],
      firstName: "",
      lastName: "",
      address: "",
      landMarks: "",
      district: "",
      state: "",
      mobileNumber: "",
      pinCode: "",
      totalPrize: "",
      snackbar: false,
      valid :true,
      errmsg:[],
      checkbox1:false,
      checkbox2:false,
       checkbox3:false,
      checkbox4:false,
      text: `product is successfully  ordered`,
      date: new Date().toISOString().substr(0, 7),
       modal: false,
       heading:"orderDetails",
        itemss: [
        {id:1, title: "Item 1", body: "jnkn"},
        {id:2, title: "Item 2", body: "jnnk"},
        { id:3,title: "Item 3", body: "I am item 3 body text" },
        { id:4 ,title: "Item 4", body: "I am item 4 body text" }
      ]
    };
  },
  methods: {
    ...mapActions(["getorderslist", "myorderdetails"]),
    showdata() {
      this.$emit("showmycart");
      console.log("orderlist==", this.$emit("showmycart"));
    },
   async chekboxnext(){
      if(this.checkbox1==true)
      {
       this.e1 =5 ;
        console.log("this is on submit function cash on delivary");
      // this.snackbar = true;
      let id = JSON.parse(localStorage.getItem("myoderdata"))._id;
      console.log('id',id)
      const res = await axios.get(
        "http://localhost:3003/myorders/buyorderdetails",{
           headers: {
          orderId: id,
        },
        }
      );
      this.buyproductdetails.push(res.data);
      console.log("ress==", res.data);
      
        swal({
            title: "Awesome!",
        text: "Your order has been confirmed. ",
         icon: "success",
          });
      }
      else  if(this.checkbox2 == true){
        this.e1++
        console.log("cash on card")
      }
    },
  
    async addorderdetails() {
        this.errmsg =[];
      console.log("hello this is valid1")
        if (this.$refs[`form`].validate()) {
          console.log("hello this is valid2")
        if(this.istotalPrize != '' && this.quantity!='')  
        {
          this.e1++;
          console.log("hello this is valid3")
      await this.myorderdetails({
        orderId: JSON.parse(localStorage.getItem("myoderdata"))._id,
        userId: JSON.parse(localStorage.getItem("User"))._id,
        ordercart: JSON.parse(localStorage.getItem("myoderdata")),
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        landMarks: this.landMarks,
        district: this.district,
        state: this.state,
        mobileNumber: this.mobileNumber,
        pinCode: this.pinCode,
        quantity: this.quantity,
        totalPrize: this.istotalPrize,
      });
        }
        else{

              this.errmsg.push("All field requried")
              console.log("error msg",this.errmsg)
        }
    }
    },
    ince() {
      this.e1++;
    },
    prev() {
      this.e1--;
    },
    async onSubmit() {
        this.e1++;
      console.log("this is on submit function");
      // this.snackbar = true;
      let id = JSON.parse(localStorage.getItem("myoderdata"))._id;
      console.log('id',id)
      const res = await axios.get(
        "http://localhost:3003/myorders/buyorderdetails",{
           headers: {
          orderId: id,
        },
        }
      );
      this.buyproductdetails.push(res.data);
      console.log("ress==", res.data);
      
        swal({
            title: "Awesome!",
        text: "Your order has been confirmed. ",
         icon: "success",
          });
    

    },
    onClose() {
      this.snackbar = false;
      this.$router.push({ name: "Home" });
    },
    async onGeneratePdf() {
      console.log("hii on generate");
      let id = JSON.parse(localStorage.getItem("myoderdata"))._id;
      console.log("Id on order details==", id);
     await axios.get("http://localhost:3003/myorders/pdf", {
        headers: {
          orderId: id,
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
        downloadLink.setAttribute('download', "vj" + "" + Date.now());
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
  // }
    },
    onNext() {
        this.errmsg =[];
       if (this.$refs[`form`].validate()) {
         console.log('in next1')
         if(this.firstName!='' && this.lastName!='' && this.address != '' && this.pinCode!= '' && this.state!='' && this.mobileNumber!='' && this.address!='')
         {
             console.log('in next2')
           this.e1++;

         }
         else{
           return this.errmsg.push("all fields requried")
         }
      }
    },
   
  },
  computed: {
    ...mapGetters(["getmyorders", "getmyorderdetails"]),
    Isorder() {
      return localStorage.getItem("myorderproductid");
    },
    ismyorderdata() {
      return JSON.parse(localStorage.getItem("myoderdata"));
    },
    istotalPrize() {
      return (
        JSON.parse(localStorage.getItem("myoderdata")).prize * this.quantity
      );
    },
    IsCheckbox()
    {
      return this.checkbox2
    },
    IsCheckbox1()
    {
      return this.checkbox1
    }
  },
  mounted() {
    this.getorderslist();
  },
};
</script>
<style scoped>
.subheading {
  font-size: 20px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
#step4 {
  margin-left: 225px;  
  margin-right: 500px;
  align-content: center;
  height: 7in;
  width: 10in;
}
.payment {
  text-align: center;
  margin-left: 280px;
  margin-bottom: 20px;
  width: 550px;
  height: "280px";
  background-color: lightgreen;
}
.orderdetails {
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn {
  margin-left: -45px;
  justify-content: space-between;
}
.Teams {
  background-color: lightgreen;
}
.step2{
   margin-left: 250px; 
  background-color: lightgreen;
  align-content: center;
  width: 500px;
}
.checkbox{
  font:bold;
  font-size: 20px;
 
  
}

</style>