<template>
  <div class="tips-mark">
    <slot></slot>
    <div class="tips-tit">
        <slot name="tips"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tips-mark {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: relative;
  &:hover .tips-tit {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  .tips-tit {
    z-index: 1000;
    position: absolute;
    white-space: nowrap;
    font-size: 12px;
    background: #ef6d57;
    color: #fff;
    bottom: 100%;
    left: 100%;
    border-radius: 20px;
    padding: 0 10px;
    height: 24px;
    line-height: 26px;
    margin-bottom: 6px;
    transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    transform-origin: left bottom;
    transform: scale(0);
    opacity: 0;
    visibility: hidden;
    z-index: 999;
    &::before {
      content: "";
      border: 10px solid transparent;
      border-right-width: 10px;
      border-right-color: #ef6d57;
      border-bottom-width: 0px;
      position: absolute;
      left: 10px;
      top: 22px;
      transform: rotate(188deg);
    }
  }
  &::before {
    content: "";
    height: 6px;
    width: 6px;
    background: #f16339;
    border-radius: 50%;
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 0 4px rgba(241, 99, 57, 0.1);
    margin: 2px 8px;
    animation: flash 8s infinite;
  }
}
@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}
</style>