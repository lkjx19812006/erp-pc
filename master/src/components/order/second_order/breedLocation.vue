<template>
    <div>
        <i-select :model.sync="param.location" :style="{width:widparam+'px'}" size="large" :disabled="!show.id">
            <i-option v-for="item in initBreedDetail.locals.arr" :value="item.locationId" track-by="$index">{{ item.name }}</i-option>
        </i-select>
        <!-- 这里的show表示当前是否选中了一个品种，用到的是其属性id，表示品种存在 -->
        <button class="btn btn-defalut" @click="addNew()" v-if="!addData.ifShow" :disabled="!show.id">新增</button>
        <button class="btn btn-defalut" @click="confirm()" v-else :disabled="!show.id || !provinceParam.id">提交</button>
        <div type="text" class="edit-input" v-show="addData.ifShow">
            <v-select :debounce="250" :value.sync="provinceParam" :options="initCNProvince" placeholder="省/Province" label="cname">
            </v-select>
        </div>
    </div>
</template>
<script>
import {
    initBreedDetail,
    initCNProvince
} from '../../../vuex/getters'
import {
    addBreedLocation,

} from '../../../vuex/actions'
import vSelect from '../../tools/vueSelect/components/Select'
export default {
    components: {
        vSelect
    },
    data() {
        return {
            addData: {
                ifShow: false,
                addInfo: '新增'
            },
            provinceParam: {
                id: "",
                cname: ""
            },


        }
    },
    props: ['param', 'show', 'widparam'],
    vuex: {
        getters: {
            initBreedDetail,
            initCNProvince
        },
        actions: {
            addBreedLocation,

        }
    },
    methods: {
        addNew: function() {
            this.addData.ifShow = true
        },
        confirm: function() {
            this.addBreedLocation(this.provinceParam.id, this.show.id)
            this.addData.ifShow = false
        }
    }

}
</script>
<style scoped>
/*	.ivu-select{
		width:284px!important
	}*/

.edit-input {
    height: 36px;
    width: 75%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.ivu-select-dropdown {
    position: absolute!important
}

.edit-input:focus {
    border-color: #fa6705;
}
</style>
