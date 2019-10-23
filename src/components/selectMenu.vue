<template>
    <div>
        <div class="allSelBox" :class="isAllSelected ? 'allSel' : 'notAllSel'" @click="allSelectFun">全选</div>
        <div class="menuList">
            <div class="menuItem" :class="item.selected ? 'selectedd' : 'notSel'" v-for="(item, index) in menuList" :key="index" @click="selectedMenuFun(item)">{{item.name}}</div>
        </div>
        <div>
            已选择菜单：
            <div v-for="(item, index) in allSelected" :key="index">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [
                {name: '菜单一', id: 1, selected: false},
                {name: '菜单二', id: 2, selected: false},
                {name: '菜单三', id: 3, selected: false},
                {name: '菜单四', id: 4, selected: false},
            ],
            isAllSelected: false,
            selectedList: []
        }
    },
    computed: {
        allSelected() {
            this.selectedList = []
            this.menuList.forEach(item => {
                if (item.selected) {
                    this.selectedList.push(item)
                }
            })
            return this.selectedList
        }
    },
    methods: {
        selectedMenuFun(item) {
            item.selected = !item.selected
            this.isAllSelected = this.menuList.every( item => {
                return item.selected
            })
        },
        allSelectFun() {
            this.isAllSelected = !this.isAllSelected
            console.log(this.isAllSelected)
            this.menuList.filter( item => {
                if (this.isAllSelected) {
                    item.selected = true
                } else {
                    item.selected = false
                }
            })
        },
    }
}
</script>

<style scoped>

    .allSelBox {
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #483D8B;
        margin: 20px 0px;
    }
    .notAllSel {
        background: #A9A9A9;
    }
    .allSel {
        background:#DC143C;
    }
    .menuList {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .menuItem {
        width: 20%;
        text-align: center;
        color: #483D8B;
    }
    .selectedd {
        background:#DC143C;
    }
    .notSel{
        background: #A9A9A9;
    }
</style>
