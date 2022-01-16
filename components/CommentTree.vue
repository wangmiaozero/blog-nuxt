<template>
     <!-- comment box -->
      <div class="comment-child-list" >
                <transition-group name="comment-child">
                  <div
                    class="comment-child-item"
                    v-for="items in treeData"
                    :key="items.id"
                    :data-id="items.id"
                  >
                    <div class="head">
                      <div class="img">
                        <img :src="'/image/comment/' + items.avatarUrl" />
                      </div>
                      <div class="name">
                        <a class="admin-mark"
                          >{{ items.name
                          }}</a
                        >
                        <div class="r">
                          <div class="reply" @click="reply(items)">
                            reply ｜ 回复
                          </div>
                          <span class="time">{{
                            items.createTime
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="comment-child-content">
                      <p> {{ items.content }}</p>
                    </div>
                    <template v-if="items.children">
                      <CommentTree :treeData="items.children" v-bind="$attrs" v-on="$listeners" ></CommentTree>
                    </template>
                  </div>
                </transition-group>
              </div>
</template>

<script>
export default {
    name:"CommentTree",
    props: {
      treeData:{
        type:[Array,Object],
        default:()=>[]
      },
    },
    methods: {
        reply(row){
            this.$emit('click',row)
        }
    }
}
</script>
<style lang="scss" scoped>
.comment-list {
    padding: 0 0 80px;
    overflow: hidden;
    .comment-item {
      transition: margin 1s, opacity 2s;
      .comment-item-box {
        padding: 25px 0;
        &:hover .head .name .r .reply {
          opacity: 1;
        }
      }
      .head {
        display: flex;
        position: relative;
        .img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 12px;
          overflow: hidden;
          border: 1px solid #f1f1f1;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            font-weight: 400;
            color: #ef6d57;
            font-size: 16px;
            height: 20px;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            text-decoration: none;
            position: relative;
            &:hover {
              color: #ef2f11;
              text-decoration: underline;
            }
            &.admin-mark {
             
            }
          }
          .r {
            display: flex;
            .time {
              color: var(--color-text-4);
              font-size: 13px;
              letter-spacing: 0;
            }
            .reply {
              opacity: 0;
              font-size: 12px;
              color: #ef6d57;
              margin-right: 12px;
              cursor: pointer;
              transition: all 0.2s;
              text-decoration: underline;
              text-transform: capitalize;
              &:hover {
                font-weight: bold;
              }
            }
          }
        }
      }
      .comment-content {
        color: var(--color-text-1);
        line-height: 22px;
        padding: 0 0 0 58px;
        white-space: pre-wrap;
      }
    }
    .comment-child-list {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      border: 1px solid var(--color-border-2);
      .comment-child-item {
        //    border: 1px solid var(--color-border-2);
           transition: all 2s;
           padding-top: 15px;
        //    margin-top: 15px;
        &:hover {
          .head .name .r .reply {
            opacity: 1;
          }
        }
        .head {
          display: flex;
          align-items: center;
          position: relative;
          .img {
            width: 40px;
            height: 40px;
          }
        }
        .comment-child-content {
          color: var(--color-text-1);
          padding: 0;
          line-height: 22px;
          margin: 0 0 0 50px;
          display: flex;
          flex-wrap: wrap;
          p {
              span {
                color: var(--color-bg-primary);
                background: #a9cff3;
                display: inline-block;
                height: 18px;
                padding: 0 10px;
                line-height: 20px;
                border-radius: 10px;
                margin-right: 4px;
                font-size: 13px;
             }
             word-break: break-all;
             display: inline-block;
             
          }
        }
      }
    }
  }
  @media screen and (max-width: 820px) {
  .comment {
    width: 86%;
    .comment-list {
      padding-bottom: 100px;
    }
  }
}
@media screen and (max-width: 600px) {
  .comment .comment-list {
    .comment-item {
        box-sizing: border-box;
      .head {
        .img {
          width: 40px;
          height: 40px;
          margin-right: 15px;
        }
        .name {
          flex-direction: column;
          align-items: baseline;
          justify-content: space-evenly;
          margin-top: 2px;
          a {
            font-size: 13px;
            span {
              margin-top: -2px;
            }
          }
          .r {
            margin-top: 2px;
            .time {
              font-size: 12px;
            }
            .reply {
              opacity: 1;
              font-size: 12px;
              color: #ef6d57;
              position: absolute;
              right: 0;
              top: 13px;
              cursor: pointer;
              text-decoration: underline;
              text-transform: capitalize;
            }
          }
        }
      }
      .comment-content {
        padding: 0;
        margin-top: 1px;
      }
      .comment-child-list {
        padding-left: 15px;
        .comment-child-content {
          margin-top: 12px;
          line-height: 22px;
          margin-left: 0px;
        }
      }
    }
  }
}
</style>