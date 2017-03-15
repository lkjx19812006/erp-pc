<template>
    <div>
        <select class="form-control edit-input" v-model="language" style="width:100px">
            <option value="zh_CN">中文</option>
            <option value="en">English</option>
        </select>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data() {
            return {
                language: ''
            }
        },
        watch: {
            'language': function(val) {
                if (!val) {
                    val = 'zh_CN';
                }
                Vue.config.lang = val;
                localStorage.lang = val;
                this.$dispatch('lang', val);
            }
        },
        created() {
            if (localStorage.lang) {
                this.language = localStorage.lang;
            } else {
                this.language = 'zh_CN';
            }
        }
}
</script>
<style scoped>
</style>
