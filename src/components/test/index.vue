<template>
  <div class="tab-navbar">
   <a class="track-btn pr tac" @mousemove="move">
    <span>妙用CSS变量，让你的CSS变得更心动</span>
</a>
  </div>
</template>

<script>
  export default {
    name: "track-btn",
    methods: {
        move(e) {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;
            e.target.style.setProperty("--x", `${x}px`);
            e.target.style.setProperty("--y", `${y}px`);
        }
    }
  }
</script>

<style lang="scss" scoped>
.track-btn {
    display: block;
    overflow: hidden;
    border-radius: 100px;
    width: 400px;
    height: 50px;
    background-color: #66f;
    line-height: 50px;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    span {
        position: relative;
    }
    &::before {
        --size: 0;
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);
        background-image: radial-gradient(circle closest-side, #09f, transparent);
        content: "";
        transform: translate3d(-50%, -50%, 0);
        transition: all 200ms ease;
    }
    &:hover::before {
        --size: 400px;
    }
}

</style>