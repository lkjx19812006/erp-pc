import Vue from 'vue'

Vue.filter('twoWays', {
    read: function(val){
        return 'read ' + val;
    },
    write: function(newVal, oldVal){
        console.log(newVal, oldVal);
        return oldVal + ' write';
    }
});