<template>
  <div class="issues">
    <issues-data-source ref="ghDataSourceComponent"
      url="https://api.github.com/repos/telerik/kendo-ui-core/issues"
      pagingSettings="{state: 'all', page: 1, per_page: 100}"
      pageSize="10">
    </issues-data-source>
    <kendo-grid ref="issuesGrid" :sortable="true" :filterable="true" :pageable-refresh="true" :pageable-page-sizes="true"
      :pageable-button-count="5" :detail-template="detailTemplate">
      <kendo-grid-column field="number" title="ID" :width="100" :filterable="false" template="<a href='#: html_url #'>\##: number #</a>">
      </kendo-grid-column>
      <kendo-grid-column field="title" title="Title" :filterable="true" template="
        <span class='issue-status
          #if (state === 'open') {#
            issue-open
            # } else { #
              issue-closed
            # } #'></span>
          #:title#">
      </kendo-grid-column>
      <kendo-grid-column field="labels" title="Labels" :width="200" :filterable="false" template="
        #for (var i = 0; i < labels.length; i++) {#
          <span class='badge' style='background-color: #: getColor(labels[i].name) #'>#: labels[i].name #</span>
        #}#">
      </kendo-grid-column>
      <kendo-grid-column field="milestone" title="Milestone" :width="150" :filterable="false" template="#: milestone ? milestone.title : '' #">
      </kendo-grid-column>
      <kendo-grid-column field="assignee" title="Assignee" :width="150" :filterable="false" template="
        #if (assignee)  { # <img  src='#: assignee.avatar_url#'' style='width: 30px; height: 30px' class='img-circle' /> #}#
        #: assignee ? assignee.login : '' #">
      </kendo-grid-column>
    </kendo-grid>
  </div>
</template>

<script>
  import marked from 'marked'
  import IssuesDataSource from './IssuesDataSource.vue'
  window.mdConverter = marked.setOptions({});

  const DETAIL_TEMPLATE = `
        <div class="row my-4">
            <div class="col-sm-12">
                <span class="badge
                        #if (state === 'open') {#
                          badge-success
                        #}#

                        #if (state === 'closed') {#
                          badge-danger
                        #}#
                      ">
                  #: state #
                </span>
                <h3 class="h1">
                    #: title #
                    <span class="text-muted">\\##: number #</span>
                </h3>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-sm-2">
                <span class="small d-block text-muted">Created on</span>
                #: (new Date(created_at)).toDateString() #
            </div>
            #if(closed_at){#
            <div class="col-sm-2">
                <span class="small d-block text-muted">Closed on</span>
                #: (new Date(closed_at)).toDateString() #
            </div>
            #}#
            <div class="col-sm-2">
                <span class="small d-block text-muted">Milestone</span>
                #: milestone ? milestone.title : '' #
            </div>
            <div class="col-sm-2">
                <span class="small d-block text-muted">Author</span>
                #: user.login #
            </div>
            #if(assignee){#
            <div class="col-sm-2">
                <span class="small d-block text-muted">Assignee</span>
                #if (assignee)  { #
                  <img  src='#: assignee.avatar_url#'' style='width: 30px; height: 30px' class='img-circle' />
                #}#
                #: assignee ? assignee.login : '' #
            </div>
            #}#
        </div>
        <div class="row my-4">
            <div class="col-sm-2">
                <h4 class="small text-muted">Labels</h4>
                #for (var i = 0; i < labels.length; i++) {#
                  <span class='badge' style='background-color: #: getColor(labels[i].name) #'>#: labels[i].name #</span>
                #}#
            </div>
            <div class="col-sm-8">
                <h4 class="small text-muted">Description</h4>
                <div>
                  #= window.mdConverter.parse(body) #
                </div>
            </div>
        </div>`

  /* global kendo */
  export default {
    name: 'issues',
    components: {IssuesDataSource},
    mounted(){
      this.ghData = this.$refs["ghDataSourceComponent"].ghData
      this.$refs["issuesGrid"].kendoWidget().setDataSource(this.ghData)
    },
    created() {
      this.detailTemplate = DETAIL_TEMPLATE;

      //use :data-source="ghData" on the grid component if you use this approach
      //which does not allow code reuse for the data source component
      //with this, the mounted() code and the issues data source components are not needed
      // this.ghData = new kendo.data.DataSource({
      //   pageSize: 10,
      //   transport: {
      //     read: {
      //       url: 'https://api.github.com/repos/telerik/kendo-ui-core/issues',
      //       data: {
      //         state: 'all',
      //         page: 1,
      //         per_page: 100
      //       },
      //       beforeSend: function (req) {
      //         req.setRequestHeader('Authorization', 'token b95116792cba5a8169a1ec10640d8c16535c6419')
      //       }
      //     }
      //   }
      // })
    }
  }

  window.getColor = (label) => {
    var colors = {
      'SEV: LOW': '#ff9800',
      'SEV: MEDIUM': '#ff5d2a',
      'SEV: HIGH': '#d50000',
      'ENHANCEMENT': '#00c853',
      'FEATURE': '#2e7d32',
      'OTHER': '#1ca8dd',
      'PASSED QA': '#57b45b',
      'BUG': '#cf3257',
      'NEEDS QA': '#bc007c',
      'DOCUMENTATION': '#455a64',
      'DEMO': '#673ab7',
      'DELETED': '#f44336',
      'IN PROGRESS': '#ffd600'
    }
    var color = colors[label.toUpperCase()] || colors.OTHER
    return color
  }
</script>