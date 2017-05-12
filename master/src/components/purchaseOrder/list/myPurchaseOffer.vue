<template>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMyIndentOfferList">
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initMyIndentOfferList
} from '../../../vuex/getters'
import {
    getIndentOffers
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        mglistModel
    },
    vuex: {
        getters: {
            initMyIndentOfferList
        },
        actions: {
            getIndentOffers
        }
    },
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: "",
                link: '/intention/offer/queryMyOffer',
                key: 'myIndentOfferList',
                offerEmployee: "",
                offerEmployeeName: "",
                breedId: "",
                breedName: "",
                accept: ""
            },

        }
    },
    methods: {


    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIndentOffers(this.loadParam);
        }
    },
    created() {
        this.getIndentOffers(this.loadParam);
        //changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
}

.margin_right {
    margin-right: 15px
}

.checkbox_unselect {
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.checkbox_select {
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

#table_box table th,
#table_box table td {
    width: 136px;
    min-width: 136px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

.api {
    max-width: 400px;
    color: #3399ff;
    white-space: normal;
}
</style>
