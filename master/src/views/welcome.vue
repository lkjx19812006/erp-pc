

<template>
    <div id="app">
        <hello></hello>
        <p>
            Welcome to your Vue.js appssss!
        </p>
    </div>
    <div class="image_demo">
    <press-image :param="test"></press-image>
    </div>
    <div>
        <show-model :param="test"></show-model>
        <button v-on:click="btnClick('hello')">hello</button>
        <button v-on:click="btnClick('test')">hello</button>
    </div>
    <div>
   
  
<mz-datepicker :time.sync="dateText" format="yyyy/MM/dd HH:mm"></mz-datepicker>
    </div>
 <region-select></region-select>

</template>
<script>
import Hello from '../components/Hello'
import pressImage from '../components/imagePress'
import showModel from './showmodel'
import calendar from '../components/calendar/vue.datepicker'
import regionSelect from '../components/tools/regionSelect'

export default {
    components: {
        Hello,
        showModel,
        pressImage,
        regionSelect
    },
    data() {
        return {
            select: {
            active: true,
            data: [
                { active: true, value: 0, text: 'A'},
                { active: true, value: 1, text: 'B'},
                { active: true, value: 2, text: 'C'},
                { active: true, value: 3, text: 'D'},
            ]
        },
            modelParam: {
                show: false,
                name: 'hello'
            },
            test:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            dateText:'',
            show:false

     
        }
    },
    watch: {
            show(value) {
                if (value) {
                    this.$els.input.disabled = true
                } else {
                    this.$els.input.disabled = false
                }
            }
        },
    methods: {
        btnClick: function(value) {
            this.modelParam.name = value;
            this.modelParam.show = true;
        },
        createDateText() {
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let str = `${year}/${month}/${day}`
                this.dateText = str.replace(/\b(\w)\b/g, "0$1")
            }
    },
   
    events: {
        getImageData: function(imageData) {
            console.log(imageData);
        }
    },
    ready() {
            this.createDateText()
        }
}
</script>
<style scoped>
/* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 }  */

#app {
    color: #2c3e50;
    max-width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
}

#app a {
    color: #42b983;
    text-decoration: none;
}

.logo {
    width: 100px;
    height: 100px
}

.image_demo{
    width: 200px;
    height:200px
}
</style>