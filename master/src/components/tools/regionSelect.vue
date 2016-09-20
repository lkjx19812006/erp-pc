<template>

<div class="row">
  <div class="col-md-4">
   <v-select 
  :debounce="250"
  :value.sync="country.value"
  :on-search="cityGetOptions"
  :options="country.arr"
  placeholder="国家"
  label="category">
  </v-select> 
  </div>
  <div class="col-md-4">
  <v-select 
  :debounce="250"
  :value.sync="city.value"
  :on-search="districtGetOptions"
  :options="city.arr"
  placeholder="省/市"
  label="category">
  </v-select>
    
  </div>
  <div class="col-md-4">
  <v-select 
  :value.sync="district.value"
  :options="district.arr"
  :on-change="districtChange"
  placeholder="区/县"
  label="category">
  </v-select>
    
  </div>
</div>
 
 
</template>
<script>

import vSelect from './vueSelect/components/Select'
export default {
    components: {
    vSelect
       
    },
    data() {
        return {
         country: {
          value:'',
          arr:[]
         },
         city:{
          value:'',
          arr:[]
         },
        district:{
          value:'',
          arr:[]
        },
        
        }
    },
    methods: {
        cityGetOptions:function(search, loading) {
    loading(true)
    this.$http.get('/static/data/list.json', {
       q: search
    }).then(resp => {
      console.log(resp);
       this.city.arr = resp.data.results
       loading(false)
    })
  },

  districtGetOptions:function(search, loading) {
    loading(true)
    this.$http.get('/static/data/list.json', {
       q: search
    }).then(resp => {
      console.log(resp);
       this.district.arr = resp.data.results
       loading(false)
    })
  },

   districtChange:function(){
    console.log(this.selected);
  }

    }
  }
</script>
<style scoped>

</style>