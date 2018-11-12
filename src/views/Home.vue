<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3>vue的模板</h3>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  created() {
    // 测试请求
    this.query()
  },
  methods: {
    async query() {
      const info = await this.$api.test.query({});
      console.log(info.data)
    }
  }
}
</script>
