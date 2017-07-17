<template>
  <ul class='pagination'>

    <li v-if="this.combination.cur>1" ><a v-on:click="combination.cur-- ,pageClick()"><span> {{$t('static.previous_page')}} </span></a></li>
    <li v-else class='disabled'><a><span> {{$t('static.previous_page')}} </span></a></li>

    <li v-if="indexs[0]>1" ><a v-on:click="combination.cur=1,pageClick()"><span> 1 </span></a></li>
    <li class="disabled" v-if="indexs[0]>2"><a>...</a></li>
    <li v-for="index in indexs"  v-bind:class="{'active': combination.cur === index }">
      <a v-on:click="btnClick(index)">{{ index }}</a>
    </li>
    <li class="disabled" v-if="indexs[6]&&(indexs[6]<=combination.all-1)"><a>...</a></li>
    <li v-if="(indexs.length==7)&&(indexs[6]!=combination.all)" ><a v-on:click="combination.cur=combination.all,pageClick()"><span> {{combination.all}} </span></a></li>

    <li v-if="this.combination.cur != this.combination.all" ><a v-on:click="combination.cur++,pageClick()"><span> {{$t('static.next_page')}} </span></a></li>
    <li v-else class="disabled"><a><span> {{$t('static.next_page')}} </span></a></li>
    <li class="disabled"><a>{{$t('static.altogether')}}<i>{{ combination.total }}</i></a></li>
    <li>
      <p style="float:left;line-height:1.42857143;color:#777;margin:8px 10px 0 10px" v-if="combination.pageCallback">本页显示条数：
        <select v-model="numbers" style="border:1px solid #ccc;border-radius: 5px;height:30px;margin-top:-10px; " @change="combination.pageCallback(numbers)">
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="60">60</option>
          <option value="100">100</option>
        </select>
      </p>
      <p style="float:left;line-height:1.42857143;color:#777;margin:8px 10px 0 10px">{{$t('static.jump_to')}}:</p>
      <input  type="text"  v-model="inpage" :value="page" style="position: relative;width:60px;margin:0 10px;float: left;padding: 6px 12px;margin-left: -1px;line-height: 1.42857143;color: #337ab7;text-decoration: none; background-color: #fff;border: 1px solid #ddd;border-radius: 5px;"/>
      <a v-on:click="combination.cur=page,pageClick()" class="btn">{{$t('static.click_jump')}}</a>
    </li>
  </ul>
  <div style="float:left"></div>
</template>

<style>
  .pagination{
    margin-bottom:5px;
  }
</style>
<script>
  module.exports = {
    props: {
      'combination':{
          cur:'',
          total:'',
          all:'',
          pageCallback:''
      },
    },
    data(){
      return{
        inpage:1,
        numbers:15
      }
    },
    computed: {
      indexs: function(){
        this.combination.cur=parseInt(this.combination.cur);

        var left = 1;

        if(this.combination.all==0){
          this.combination.all=1;
        }
        var right = this.combination.all;

        var ar = [];
        if(this.combination.all>= 7){
          if(this.combination.cur > 5 && this.combination.cur < this.combination.all-4){
            left = this.combination.cur - 3;
            right = this.combination.cur + 3;

          }else{
            if(this.combination.cur<=5){
              left = 1;
              right = 7;
            }else{
              right = this.combination.all;
              left = this.combination.all - 6;
            }
          }
        }

        while (left <= right){
          ar.push(left);
          left ++;
        }
        return ar;
      },
      page:function(){
        if(!this.inpage){
          this.inpage=1;
        }
          if(parseInt(this.inpage)>this.combination.all){
            this.inpage=this.combination.all;
            return this.combination.all;
          }else if(parseInt(this.inpage)<1){
          this.inpage=1;
          return 1;
        }else{
            this.inpage=parseInt(this.inpage);
            return parseInt(this.inpage);
          }
      }
    },

    methods: {
      btnClick: function (value) {
        if(value != this.combination.cur){
           this.combination.cur = value;
           this.$dispatch("fresh",this.combination.cur);
        }
        // this.$http.get('/'+this.combination.type+'/page'+this.combination.cur, function (data) {
        //   this.combination = data;
        //});
        console.log('现在在'+this.combination.cur+'页');

      },
      pageClick: function () {
        console.log('现在在'+this.combination.cur+'页');
        this.$dispatch("fresh",this.combination.cur);
        // this.$http.get('/'+this.combination.type+'/page'+this.combination.cur, function (data) {
        //   this.combination = data;
        //});
      },
    },
    created(){
      console.log(this.combination.pageCallback)
    }
  };
</script>
