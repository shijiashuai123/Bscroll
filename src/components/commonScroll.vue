<template>
    <div class="listBox">
        <Scroll class="scroll" ref="scroll" :data="list" :listenScroll="true" :enableReload="true" @reload="reload">
             <ul class="bscroll-container">
                <li style="width: 100%; height: 50px; line-height: 50px; text-align: left; overflow: hidden; border-bottom: 1px solid #aaa;" v-for="(item, index) in list" :key="index">
                    <span>第<span style="color: red;">{{index}}</span>条</span>
                    <span>{{item.sheetName}}</span>
                </li>
            </ul>
        </Scroll>
    </div>
</template>

<script>
import Scroll from '../common/scroll'
import {getList} from '../api/resource.js'
export default {
    data() {
        return {
            list: [],
            page: 1,
            pageSize: 20,
        }
    },
    components: {
        Scroll
    },
    created() {
        this.getSongListFun()
    },
    methods: {
        getSongListFun() {
            getList(this.page, this.pageSize).then( res => {
                this.list = this.list.concat(res.data.data.lists)
            })
        },
        reload() {
            this.page += 1
            this.getSongListFun()
        }
    }
}
</script>

<style>
    .listBox {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
</style>
