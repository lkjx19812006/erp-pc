<template>
    <div>
        news
        <h3>Count is {{ counterValue }}</h3>
    </div>
    <pagination :combination="list"></pagination>
</template>
<script>
import {
    getCount
} from '../vuex/getters'
import pagination from '../components/pagination'

export default {
	 data() {
        return {
            list: {all:8,cur:1}
        }
    },
    vuex: {
        getters: {
            // note that you're passing the function itself, and not the value 'getCount()'
            counterValue: getCount
        }
    },
    components: {
        pagination
    },
    events: {
    fresh: function(input) {
     console.log(input);
    }
  }
}
</script>
