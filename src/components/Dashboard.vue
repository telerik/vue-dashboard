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
          <div class="col-sm text-sm-right">
              <kendo-buttongroup @select="onSelect" :index="selectedIndex">
                  <kendo-buttongroup-button>3 Months</kendo-buttongroup-button>
                  <kendo-buttongroup-button>6 Months</kendo-buttongroup-button>
                  <kendo-buttongroup-button>1 Year</kendo-buttongroup-button>
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
      months () {
        switch (this.selectedIndex) {
          case 0:
            return 3
          case 1:
            return 6
          case 2:
            return 12
          default:
            return 3
        }
      },
      rangeStart () {
        var since = new Date()
        since.setMonth(since.getMonth() - this.months)

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
        var today = new Date();
        var fd = new Date();
          fd.setDate(today.getDate() - 7);
        this.ghData.filter({ field: "created_at", operator: "gt", value: fd })
      }
    }
  }
</script>