<template>
    <div class="chart col-md-3 col-sm-4 col-xs-6">
        <label>{{title}}：</label>  
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:['title'],
    data() {
        return {
           
        }
    }

}
</script>
<style scoped>
.chart {
   font-size: 14px;
   white-space: normal;
}
</style>
