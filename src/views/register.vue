<template>
<v-app>
    <v-main class="body">
 
<div class="form">

    <div> <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p></div>
            <div v-for="err in errmsg" :key="err">
                 <h3 style="color: red">{{err}}</h3> 
                </div>
                    <div v-if="geterrormsg == 3">
          <h3 style="color: red">Email id AllReady exits </h3>
          </div>
  <form>
    <v-text-field
      v-model="name"
       name= name
      label="Name"
      prepend-icon=" mdi-account"
       v-validate="'required|max:10|min:4'"
      :counter="10"
      :error-messages="errors.collect('name')"
      required
    
    ></v-text-field>
    <v-text-field
      v-model="email"
      name ="email"
      v-validate="'required'"
      label="E-mail"
      prepend-icon="mdi-email"
      :error-messages="errors.collect('email')"
      required
    
    ></v-text-field>
     <v-text-field
      v-model="mobileNumber"
      type="number"
      name ="mobileNumber"
      label="mobileNumber"
      prepend-icon="mdi-phone"
       v-validate="'required|max:10|min:4'"
        :counter="10"
      :error-messages="errors.collect('mobileNumber')"
    required
    ></v-text-field>
      <v-text-field
      v-model="passWord"
      name="passWord"
      label="passWord"
      :type="showPassword ? 'text' : 'passWord'"
      prepend-icon="mdi-lock"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      required
        v-validate="'required|max:10|min:4'"
        :counter="10"
      :error-messages="errors.collect('passWord')"
         @input="$v.passWord.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
    <v-btn
      class="mr-4"
      @click="submit();checkemail()"
    >
     Signup
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
      <div class="text-center">
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
  </form>
  </div>
    </v-main>
</v-app>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { mapActions ,mapGetters} from 'vuex'
  import swal from 'sweetalert'  
  export default {
    mixins: [validationMixin],
  validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
       mobileNumber :{required},
       passWord :{required  },
       checkbox: {
        checked (val) {
          return val
        },
      },
    },
    name:'register',
    data: () => ({
      name: '',
      email: '',
      mobileNumber :'',
      passWord :'',
      checkbox: false,
      showPassword :false,
      errmsg :[]

    }),
    computed: {
       ...mapGetters(["geterrormsg"]),
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      // selectErrors () {
      //   const errors = []
      //   if (!this.$v.select.$dirty) return errors
      //   !this.$v.select.required && errors.push('Item is required')
      //   return errors
      // },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
       mobileNumberErrors () {
        const errors = []
        if (!this.$v.mobileNumber.$dirty) return errors
        !this.$v.mobileNumber.required && errors.push('mobileNumber is required')
        return errors
      },
      //  passWordErrors () {
      //   const errors = []
      //   if (!this.$v.passWord.$dirty) return errors
      //   !this.$v.passWord.required && errors.push('passWord is required')
      //   return errors
      // },
    },

    methods: {
        ...mapActions(["addUser"]),
      submit () {
        this.errmsg =[];
         this.$v.$touch()
       if(this.name!='' && this.passWord!= ''&& this.email!='' &&this.mobileNumber!= '' && this.checkbox == true) {
        console.log(this.name ,this.passWord,this.email,this.mobileNumber)
        console.log("this is onsubmit");
        this.addUser({
           id: this.id,
          name: this.name,
          passWord: this.passWord,
          emailid: this.email,
          mobileNumber: this.mobileNumber,
        });
       }
       else{

         return this.errmsg.push("All Field Required")
       }

      },
      clear () {
        this.$v.$reset()
          this.errmsg =[];
        this.name = ''
        this.email = ''
        this.mobileNumber = ''
        this.passWord = ""
        this.checkbox = false
        
      },
       checkemail(){
       setTimeout(() => {
         if(this.geterrormsg =='1')
         {
              swal({
               title: "Thank You!",
           text: "Registration successfully",
            icon: "success",
             });
           this.$router.push({ name: "LoginPage" });
         }
         
       }, 1000);
      }
    },
  }
</script>
<style scoped>
.form
{
     color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
   width: 400px;
  margin: 0 auto;
  padding: 30px 0;
  margin-top: -15px;
  margin-bottom: 0px ;
}
.body{
   color: #fff;
  background-color: #19aa8d;
  font-family: "Roboto", sans-serif;
  margin-top: 0px;
}

.v-text-field{
    color: yellow ; /* this will override the existing property applied */
    /* add whatever properties you want */
     min-height: 38px;
  box-shadow: none !important;
  margin-left: 8px;
  margin-right: 8px;

}
.v-btn{
  color: #19aa8d;
  width: 40%;
  margin-bottom: 3%;
}
 
</style>>

