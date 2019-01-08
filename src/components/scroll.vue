<template>
  <div class="wrapper" ref="wrapper">
    <div ref="list">
      <ul class="bscroll-container">
        <li style="width: 100%; height: 50px; line-height: 50px; text-align: left; overflow: hidden; border-bottom: 1px solid #aaa;" v-for="(item, index) in songLists" :key="index">
          <span>第<span style="color: red;">{{index}}</span>条</span>
          <span>{{item.sheetName}}</span>
        </li>
      </ul>
      <div v-if="pullDownState" class="loadMore pullDown" style="text-algin: center;">{{refreshTip}}</div>
      <div v-if="enableReload" class="loadMore" style="text-algin: center;">{{reloadTip}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getList} from '../api/resource.js'
import BScroll from "better-scroll";
export default {
  name: 'HelloWorld',
  data () {
    return {
      songLists: [],
      page: 1,
      pageSize: 20,
      refreshTip: '下拉刷新',
      reloadTip: '加载更多',
      enableReload: false,
      pullDownState: false,
      judgeSongListLen: null,
      scroll: {}
    }
  },
  watch: {
    reloadTip(a) {
      console.log(a)
    }
  },
  created() {
    this.getSongListFun()
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        click: true
      })
      this.scroll.on('scroll', (pos) => {
        // 下拉刷新
        if (pos.y > 30) {
          this.pullDownState = true
          this.refreshTip = '松开刷新'
        }
        // 上拉加载
        const maxScrollHeight = this.$refs.wrapper.clientHeight - this.$refs.list.clientHeight
        if (pos.y <= 0) {
          this.enableReload = true
          this.reloadTip = '加载更多'
        }
        if (pos.y < maxScrollHeight - 60) {
          if (this.judgeSongListLen) {
            this.page ++
            // 显示文字
            this.reloadTip = '加载中...'
            this.getSongListFun(true)
          } else {
            this.reloadTip = '到底了'
          }
        } else { 
          this.reloadTip = '加载更多'
        }
        // 手指离开
        this.scroll.on('touchend', (e) => {
          console.log('touchend') 
          if (e.y >= 30) {
            this.pullDownState = false
          }
          this.enableReload = false
        })
      })
    },
    refresh() {
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.scroll.refresh()
    },
    getSongListFun(judgePullMotion) {
      getList(this.page, this.pageSize).then( res => {
        console.log(res)
        this.reloadTip = '加载更多'
        this.judgeSongListLen = res.data.data.lists.length
        this.songLists = this.songLists.concat(res.data.data.lists)
        this.$nextTick(() => {
          if (judgePullMotion) {
            this.refresh()
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #000;
  }
  .loadMore {
    position: absolute;
    bottom: -40px;
    width: 200px;
    left: 50%;
    margin-left: -100px;
  }
  .pullDown {
    top: -30px;
  }
  ul,li {
    list-style: none;
  }
</style>
