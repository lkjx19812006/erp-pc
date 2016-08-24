<template>
    <div>
        业务基础数据{{$route.query.id}}
    </div>
</template>
<script>
import {
    getList
} from '../vuex/getters'
export default{
	 created() {
        if (this.$route.query.id > this.getList[1].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
        }
    }, 
    vuex: {
        getters: {
            getList
        }
    }
}

</script>
