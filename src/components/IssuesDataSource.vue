<template>
    <div></div>
</template>

<script>
  export default {
    name: 'issues-data-source',
    props: ["url", "pagingSettings", "pageSize"],
    created () {
    this.ghData = new kendo.data.DataSource({
      pageSize: this.$props["pageSize"],
      transport: {
        read: {
          url: this.$props["url"],
          data:  this.$props["pagingSettings"] || {} ,
          beforeSend: function (req) {
            req.setRequestHeader('Authorization', 'token b95116792cba5a8169a1ec10640d8c16535c6419')
          }
        }
      }
    })
  }
  }
</script>