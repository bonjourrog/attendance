

let url = 'http://localhost:3000/dashboard/getdata'

Vue.component('chart',{
    extends:VueChartJs.Bar,
    data:()=>({
        chartdata:{
            tags:[],
            reports:[],
            bgColors:['#5459b0', '#14c1ab', '#f357d2', '#20e64c', '#ffe945', 'rgb(93, 127, 175)']
        }
    }),
    async mounted(){
        const res = await axios.get(url)
        console.log(res.data);
        res.data.map(i=>{
            this.chartdata.tags.push(i.Name)
            this.chartdata.reports.push(i.repeated)
        })
        // this.mostrar()
        this.renderChart({
            labels: this.chartdata.tags,
            datasets:[
                {
                    label:'Reportes por Maestro',
                    backgroundColor:this.chartdata.bgColors,
                    data:this.chartdata.reports,
                }
            ]
        }, {responsive:false, maintainAspectRadio:false})
    }
})

var vm = new Vue({
    el:'#app',
    data:{
        message:'Grafica de reportes'
    }
})
