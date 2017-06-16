<template>
    <Checkbox-group :model.sync="mock" class="mark_box">
	    <p v-for="item in qualityData" >
	    	<Checkbox :value="item" @change="choose()">
	            <span>{{item}}</span>
	        </Checkbox>
            <!-- <input type="checkbox" id="jack" :value="item" v-model="mock">{{item}} -->
	    </p>
</template>

<script>
    export default {
        data () {
            return {
                //qualityData:[{no:'1',text:'时间紧'},{no:'2',text:'价格合适立即合作'},{no:'3',text:'现款无账期'},{no:'4',text:'常年需求可合作'}],
                qualityData:['时间紧','价格合适立即合作','现款无账期','常年需求,可建立稳固渠道'],
                mock:[],
            }
        },
        props:['param'],
        methods:{
            choose:function(){
                if(this.param.comment!=undefined){
                    this.param.comment = this.mock.join()
                }
                if(this.param.description!=undefined){
                    this.param.description = this.mock.join()
                    console.log("dasd")
                }
                console.log(this.param)
            }
        },
        computed:{

        }
    }
</script>

<style scoped>
	.mark_box{
		width:100%;
		border:1px solid #ccc;
		border-radius: 5px;
		padding: 5px;
	}
</style>