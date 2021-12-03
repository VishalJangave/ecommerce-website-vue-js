<template>
    <div>
        <v-app>
        <v-main>
             {{todayDate}}
            {{backDate}}
            {{nextDate}}
            <div v-if="todayDate > backDate" >
               <h1 style="color:red">backdate {{backDate}}</h1>
           </div>
           <div v-if="todayDate"></div>
           <div v-if="todayDate < nextDate" >
                 <h1 style="color:orange"> {{nextDate}}</h1>
           </div>
           <!-- <div v-else-if="todayDate > nextDate"> -->
               <!-- hii -->
               <!-- <h2>{{nextDate}}</h2>
               <h1 style="color:blue"> {{nextDate}}</h1> -->
           <!-- </div> -->
           <div v-else>
               <h2>Hello</h2>
            </div>
            <v-btn @click="onClick()">CLick</v-btn>
            <!-- <h1>{{time}}</h1> -->
            <h2>{{ moment(new Date().toLocaleString()) }}</h2>
            <h1>{{timer}}</h1>
            <button @click="updatetime()">inctime</button>
          
        </v-main>
       
        </v-app>
    </div>
</template>
<script>
import swal from 'sweetalert';

export default {
    name:"Fashion",
    data(){
        return{
     backDate : new Date("10/10/2021").toLocaleDateString() ,    
      todayDate : new Date(),
       nextDate : new Date("12/10/2021").toLocaleDateString(),
 
    time :  new Date().getHours() + ":" +  new Date().getMinutes() + ":" +  new Date().getSeconds(),
    count :'',
    timer :''
        }
    },
    
    methods:{
        onClick()
        {
            swal({
                title: "Awesome!",
        text: "Your booking has been confirmed. ",
         icon: "success",
        });
        },
        updatetime()
        {
            setInterval(() =>{
                this.timer = new Date().getSeconds();
                console.log("ince",this.timer)
            },1000)
        },
                counter()
                {
                   return  this.count+= 1 ;
                }
    },
    computed:{
        backdate()
        {
            return this.backDate.setDate(this.backDate.getDate() - 1)
        },

       
    },
   
    
}
</script>
<style scoped>

</style>