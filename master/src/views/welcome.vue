

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
    <v-select
  :debounce="250"
  :value.sync="city.value"
  :on-search="districtGetOptions"
  :options="city.arr"
  placeholder="省/市"
  label="category"

  ></v-select>
 <v-select :debounce="250"
  :value.sync="city.value"
  :on-search="secondLevel"
  :options="city.arr"
  placeholder="二级目录"
  label="category"
  ></v-select>
  asdfsdfsdfsd
  <treeview :value.sync="id"
            :model="users"
            class="form-control"
            labelname="label"
            valuename="value"
            children="arr"
  ></treeview>


</template>
<script>
import Hello from '../components/Hello'
import pressImage from '../components/imagePress'
import showModel from './showmodel'
import calendar from '../components/calendar/vue.datepicker'
import vSelect from '../components/tools/vueSelect/components/Select'
export default {
    components: {
        Hello,
        showModel,
        pressImage,
        vSelect
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
            show:false,
            city:{
          value:'',
          arr:[]
         },
          id: undefined, // Binded to component.
          users: [
        {
          label: 'Root',
          value: 1,
          arr: [
            {
              label: 'Parent #1',
              value: 2,
              arr: [
                {
                  label: 'Child 1 from #1',
                  value: 3
                },
                {
                  label: 'Child 2 from #1',
                  value: 13
                }
              ]
            },
            {
              label: 'Parent #2',
              value: 4,
              arr: [
                {
                  label: 'Child 1 from #2',
                  value: 5
                },
              ]
            },
            {
              label: 'Child #1 from root',
              value: 6
            },
            {
              label: 'Child #2 from root',
              value: 7
            },
            {
              label: 'Child #3 from root',
              value: 8
            }
          ],
        }
      ],
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
        districtGetOptions:function(search, loading) {
            loading(true)
            this.$http.get('/static/data/list.json', {
               q: search
            }).then(resp => {
              console.log(resp);
               this.city.arr = resp.data.results
               loading(false)
            })
        },
        secondLevel:function(search,loading){
            loading(true)
            this.$http.get('/static/data/list.json', {
               q: search
            }).then(resp => {
              console.log(resp);
               this.city.arr = resp.data.results
               loading(false)
            })
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
        },
      treeview_click:function(param){
            console.log(param);
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
