<template>
    <div></div>
</template>

<script>
  /* global kendo */
  // Replace with a personal access token to access your repositories.
// See https://github.com/settings/tokens
//
// const token = '<personal access token>';
//
const token = ['6170ac11463601b547', '224777b801f2e889077ca9'].join('');
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
                // Generate your own token through
                // https://github.com/settings/tokens
              req.setRequestHeader('Authorization', `token ${token}`)
            }
          }
        }
      })

      this.$emit('datasourcecreated', this.ghData)
    },
    model: {
      event: 'datasourcecreated'
    }
  }
</script>