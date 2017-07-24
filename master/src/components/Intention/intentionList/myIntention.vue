<template>
    <bigintention :param="myParam"></bigintention>
</template>
<script type="text/javascript">
import bigintention from '../BigIntention.vue'

export default {
    data() {
            return {
                myParam: {
                    url: '/intention/employee/list',
                    id: 1,
                    key: 'myIntentionList'
                }

            }
        },
        components: {
            bigintention
        }
}
</script>
<style type="text/css"></style>
