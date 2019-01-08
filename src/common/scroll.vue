<template>
  <div ref="wrapper" class="wrapper">
    <div ref="list">
      <div class="refresh-hook" v-if="enableRefresh">
        <p>{{refreshTip}}</p>
      </div>
      <slot></slot>
      <div class="reload-hook" v-if="enableReload">
        {{reloadTip}}
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {// 可以监听一些事件  快速滚动
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      isRefresh: {
        type: Boolean,
        default: false
      },
      isReload: {
        type: Boolean,
        default: false
      },
      enableRefresh: {
        type: Boolean,
        default: false
      },
      enableReload: {
        type: Boolean,
        default: false
      },
      count: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
      setTimeout(() => {
        this.refresh()
      }, 500)
    },
    data() {
      return {
        refreshTip: '下拉刷新',
        reloadTip: '加载更多'
      }
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click

        })
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.refreshTip = '下拉刷新'
            this.reloadTip = '加载更多'
            if (pos.y > 30) {
              this.refreshTip = '松开刷新'
            }
            if (this.enableRefresh && pos.y > 30) {
              this.refreshTip = '松开刷新'

              this.scroll.on('touchend', (e) => {
                if (pos.y > 30) {
                  this.refreshTip = '正在刷新...'
                  this.$emit('refresh', e)
                }
              })
            }
            let wrapperHeight = this.$refs.wrapper.clientHeight
            let listHeight = this.$refs.list.clientHeight
            let maxScrollHeight = wrapperHeight - listHeight
           // console.log(pos.y, maxScrollHeight)
            if (this.enableReload) {
              if (pos.y < maxScrollHeight - 60) {
                this.reloadTip = '加载中...'
                this.$emit('reload')
              } else {
                this.reloadTip = '加载更多'
              }
            }
            this.$emit('scroll', pos)
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }

    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      },
      count() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }

  }
</script>
<style scoped>
  .wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .refresh-hook, .reload-hook {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .refresh-hook {
    top: -30px;
    font-size: 16px;
  }
  .reload-hook {
    bottom: -70px;
    font-size: 16px;
    color:#a9a9a9;
  }
</style>
