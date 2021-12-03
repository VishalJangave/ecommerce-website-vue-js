<template>
    <div>
        <v-app>
        <h1>footware page</h1>
          <div id="app">
        <v-app>
          <v-container>
            <v-row>
              <v-col>
                <h1>{{ heading }}</h1>
                <v-btn color='black' class="white--text" @click='generatePDF'>Generate PDF</v-btn>
                <v-btn @click="generateZip()">Zip</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ul>
                  <li v-for='item in items' :key="item.id">{{ item.title }} - {{ item.body }}</li>
                </ul>
              </v-col>
            </v-row>
          </v-container>
        </v-app>
      </div>
        </v-app>
    </div>
</template>

<script>
 import jspdf from 'jspdf'
 import JSZip from 'jszip'
 import filesave from 'file-saver'
// import 'jspdf-autotable'

// import home from './Home.vue'
export default {
    name:"Footware",
    data() {
    return {
      heading: "Sample PDF Generator",
      moreText: [
        "This is another few sentences of text to look at it.",
        "Just testing the paragraphs to see how they format.",
        "jsPDF likes arrays for sentences.",
        "Do paragraphs wrap properly?",
        "Yes, they do!",
        "What does it look like?",
        "Not bad at all."
      ],
      items: [
        {id:1, title: "Item 1", body: "I am item 1 body text" },
        {id:2, title: "Item 2", body: "I am item 2 body text" },
        { id:3,title: "Item 3", body: "I am item 3 body text" },
        { id:4 ,title: "Item 4", body: "I am item 4 body text" }
      ]
    }
    },
    methods:{
      getitem :()=>{
        console.log("jhjh")
      },
      generateZip()
      {
        var zip = new JSZip();
    zip.file("Hello.html", "home"),
      zip.file("vj.txt", "vj")
      zip.file("ejs.txt", "Hello World")
    zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
  filesave.saveAs(content, "example.zip");
}); 
      },
        download() 
        {
            const doc = new jspdf();
            const html = this.$refs.content.innerHTML
            doc.fromHTML(html ,15 ,15, {
                width:150
            }),
              doc.save("Test.pdf");
        },
      //    generatePDF() {
      // const columns = [
      //   { title: "Title", dataKey: "title" },
      //   { title: "Body", dataKey: "body" }
      // ];
      // const doc = new jspdf({ 
      //   orientation: "portrait",
      //   unit: "in",
      //   format: "a4"
      // });
      // // text is placed using x, y coordinates
      // doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      // // create a line under heading 
      // doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using autoTable plugin
    //   autoTable(doc,{ 
    //     columns,
    //     body: this.items,
    //     margin: { left: 0.5, top: 1.25 }
    //   });
      
    //     doc.save(`${this.heading}.pdf`);
    //  }
  
    }
    
 
}
</script>