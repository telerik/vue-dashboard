<template>
  <div>
      <div class="row mb-4">
          <div class="col-sm">
              <h2>
                  <span class="small text-uppercase text-muted d-block">Statistics</span>
                  {{ rangeStart.toDateString() }} - {{ today.toDateString() }}
                  {{range}}
              </h2>

            <kendo-grid :data-source="ghData" :sortable="true" :filterable="true" :pageable-refresh="true" :pageable-page-sizes="true"
              :pageable-button-count="5" :detail-template="detailTemplate">
              <kendo-grid-column field="number" title="ID" :width="100" :filterable="false" template="<a href='#: html_url #'>\##: number #</a>">
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
          <div class="col-sm text-sm-right">
              <kendo-buttongroup @select="onSelect" :index="selectedIndex">
                  <kendo-buttongroup-button>1 Week</kendo-buttongroup-button>
                  <kendo-buttongroup-button>2 Weeks</kendo-buttongroup-button>
                  <kendo-buttongroup-button>1 Month</kendo-buttongroup-button>
              </kendo-buttongroup>
          </div>
      </div>
  </div>
</template>

<script>
 import IssuesDataSource from './IssuesDataSource.vue'
  export default {
    name: 'dashboard',
    created(){
       this.ghData = new kendo.data.DataSource({
         pageSize: 3,
        transport: {
          read: {
            url: 'https://api.github.com/repos/telerik/kendo-ui-core/issues',
            data: {
              state: 'all',
              page: 1,
              per_page: 100
            },
            beforeSend: function (req) {
              req.setRequestHeader('Authorization', 'token b95116792cba5a8169a1ec10640d8c16535c6419')
            }
          }
        },
        schema: {
          model: {
            fields: {
              created_at: { type: "Date" }
            }
          }
        }
      })
    },
    data () {
      return {
        today: new Date(),
        selectedIndex: 0
      }
    },
    computed: {
      days () {
        switch (this.selectedIndex) {
          case 0:
            return 7
          case 1:
            return 14
          case 2:
            return 30
          default:
            return 3
        }
      },
      rangeStart () {
        const since = new Date()
        since.setDate(since.getDate() - this.days)

        return since
      },
      range () {
          return {
            start: this.rangeStart,
            end: this.today
          }
      }
    },
    methods: {
      onSelect (ev) {
        this.selectedIndex = ev.index
        this.ghData.filter({ field: "created_at", operator: "gt", value: this.rangeStart })
      }
    }
  }
</script>