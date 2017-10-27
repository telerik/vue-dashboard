<template>
  <div class="dashboard">
    <div class="row mb-4">
      <div class="col-sm">
        <h2>
          <span class="small text-uppercase text-muted d-block">Statistics</span>
          {{ rangeStart.toDateString() }} - {{ today.toDateString() }}
        </h2>
      </div>
      <div class="col-sm text-sm-right">
        <kendo-buttongroup @select="onSelect" :index="selectedIndex">
          <kendo-buttongroup-button>1 Week</kendo-buttongroup-button>
          <kendo-buttongroup-button>2 Weeks</kendo-buttongroup-button>
          <kendo-buttongroup-button>1 Month</kendo-buttongroup-button>
        </kendo-buttongroup>
      </div>
    </div>
    <div class="row" v-if="issues">
      <div class="col-md-12" >
        <div class="card">
          <h3 class="card-header">Active Issues</h3>
          <div class="card-block">

            <div class="row" >

              <div class="col-sm-12 col-md-6 col-lg active-issues">
                <span class="comp-label">
                  <strong>{{ issues.open + issues.closed }}</strong>
                  <small>Active issues</small>
                </span>
                <kendo-chart :chart-area="activeIssuesOptions.chartArea"
                      :series="activeIssuesOptions.series"
                      :series-defaults="{color: '#888'}"
                      :category-axis="activeIssuesOptions.categoryAxis"
                      :value-axis="activeIssuesOptions.valueAxis"
                      :data-source="issues.active">
                </kendo-chart>
              </div>

              <div class="col-sm-12 col-md-6 col-lg text-success closed-issues">
                <span class="comp-label">
                  <strong>{{ issues.closed }}</strong>
                  <small>Closed issues</small>
                </span>
                <kendo-chart v-if="issues.closeRate.highest.close_rate"
                :chart-area="activeIssuesOptions.chartArea"
                  :series="activeIssuesOptions.series"
                  :series-defaults="{color: '#27c46d'}"
                  :category-axis="activeIssuesOptions.categoryAxis"
                  :value-axis="activeIssuesOptions.valueAxis"
                  :data-source="issues.groupedIssues.closed">
               </kendo-chart>
              </div>

              <div class="col-sm-12 col-md-6 col-lg text-danger open-issues">
                <span class="comp-label">
                  <strong>{{ issues.open }}</strong>
                  <small>Open issues</small>
                </span>
                <kendo-chart :chart-area="activeIssuesOptions.chartArea"
                  :series="activeIssuesOptions.series"
                  :series-defaults="{color: '#CF3268'}"
                  :category-axis="activeIssuesOptions.categoryAxis"
                  :value-axis="activeIssuesOptions.valueAxis"
                  :data-source="issues.groupedIssues.open">
               </kendo-chart>
              </div>

              <div class="col-sm-12 col-md-6 col-lg close-rate">
                <span class="comp-label">
                  <strong >{{ calculatePercent(issues.closeRate.average) }}%</strong>
                  <small>Close rate</small>
                </span>
                <p class="m-0 small text-uppercase text-muted" v-if="issues.closeRate.highest.close_rate">
                                Highest:
                              {{ calculatePercent(issues.closeRate.highest.close_rate) }}%
                                on {{ getDate(issues.closeRate.highest.created_at) }}
                            </p>
                            <p class="m-0 small text-uppercase text-muted" v-if="issues.closeRate.highest.close_rate">
                                Lowest:
                                {{ calculatePercent(issues.closeRate.lowest.close_rate) }}%
                                on {{ getDate(issues.closeRate.lowest.created_at) }}
                            </p>
                            <kendo-chart v-if="issues.closeRate.highest.close_rate"
                              :legend-visible="false"
                              :chart-area-height="30"
                              :data-source="[{target: 70, current: Math.round(issues.closeRate.average * 100)}]"
                              :series="[{
                                type: 'bullet',
                                gap: 0,
                                color: '#CF3268',
                                target: {color: '#fff'},
                                currentField: 'current',
                                targetField: 'target'
                              }]"
                              :value-axis-min="0"
                              :value-axis-max="100"
                              :chart-area-margin-left="0"
                              :value-axis-major-ticks-visible="false"
                              :value-axis-minor-ticks-visible="false"
                              :value-axis-major-grid-lines-visible="false"
                              :value-axis-labels-visible="false"
                              :value-axis-line-visible="false"
                              :value-axis-plot-bands="[{from:0, to:100, color: '#35C473'}]"
                              :category-axis-line-visible="false"
                              :category-axis-major-grid-lines-visible="false"
                              :category-axis-major-ticks-visible="false"
                              :tooltip-visible="false"
                            ></kendo-chart>
              </div>
            </div>


            <h3>All issues</h3>
            <kendo-chart
              :chart-area-height="400"
              :series-defaults-type="'column'"
              :series-defaults-stack="true"
              :series-defaults-gap="0.6"
              :series-defaults-overlay-gradient="'none'"
              :series="[{
                  name: 'open',
                  color: '#35C473',
                  field: 'count',
                  aggregate: 'count',
                  categoryField: 'date',
                  data: issues.groupedIssues.open,
                  border: {
                    color: '#35C473',
                    opacity: 0.3
                  },
                  opacity: 0.3
                },
                {
                  name: 'closed',
                  color: '#CC3458',
                  field: 'count',
                  aggregate: 'count',
                  categoryField: 'date',
                  data: issues.groupedIssues.closed,
                  border: {
                    color: '#CC3458',
                    opacity: 0.3
                  },
                  opacity: 0.3
                }]"
              :category-axis-type="'date'"
              :category-axis-base-unit="baseUnit"
              :category-axis-major-ticks-visible="false"
              :category-axis-major-grid-lines-visible="false"
              :category-axis-line-visible="false"
              :category-axis-labels-rotation="'auto'"
              :category-axis-labels-margin-top="8"
              :category-axis-labels-format="'dd MMM'"

              :value-axis-line-visible="false"
              :value-axis-labels-step="2"
              :value-axis-labels-skip="2"
              :value-axis-labels-margin-right="4"
              :value-axis-major-grid-lines-step="2"
              :value-axis-major-grid-lines-skip="2"
              :value-axis-major-grid-lines-color="'#F0F2F2'"
              :legend-visible="false">
            </kendo-chart>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card issue-types">
          <h4 class="card-header">Issue Types</h4>
          <div class="card-block">
            <kendo-chart :theme="'bootstrap'" :series="[{
              type: 'donut',
              holeSize: 60,
              data: issues.issueTypes,
              field: 'value',
              categoryField: 'type'
            }]"
            :legend-position="'bottom'">

            </kendo-chart>
            <div class="comp-label chart-label">
              <div class="comp-label chart-label">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <h4 class="card-header">Types Distribution</h4>
          <div class="card-block">
            <kendo-chart :chart-area-height="360"
                :series-defaults-type="'line'"
                :series-defaults-line="{style: 'smooth'}"
                :series="[{
                  name: 'Enhancement',
                  data: issues.typesDistribution.Enhancement,
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                },{
                  name: 'Feature',
                  data: issues.typesDistribution.Feature,
                  visible: false,
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                },{
                  name: 'Others',
                  data: issues.typesDistribution.Others,
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                },{
                  name: 'SEV: High',
                  data: issues.typesDistribution['SEV: High'],
                  visible: false,
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                },{
                  name: 'SEV: Medium',
                  data: issues.typesDistribution['SEV: Medium'],
                  visible: false,
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                },{
                  name: 'SEV: Low',
                  data: issues.typesDistribution['SEV: Low'],
                  field: 'value',
                  categoryField: 'date',
                  aggregate: 'count',
                  markers: {
                    visible: false
                  }
                }]"
                :legend="{position: 'top', labels:{template: legendTemplate, font: '16px sans-serif', margin:{right: 40}}}"
                :category-axis-type="'date'"
                :category-axis-base-unit="baseUnit"
                :category-axis-major-ticks-visible="false"
                :category-axis-major-grid-lines-visible="false"
                :category-axis-line-visible="false"
                :category-axis-labels-format="'dd MMM'"

                :value-axis-line-visible="false"
                :value-axis-labels-step="2"
                :value-axis-labels-skip="2"
                :value-axis-labels-margin-right="4"
                :value-axis-major-grid-lines-step="2"
                :value-axis-major-grid-lines-skip="2"
                :value-axis-major-grid-lines-color="'#F0F2F2'"></kendo-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IssuesDataSource from './IssuesDataSource.vue'
  import { IssuesProcessor } from '../shared/issues-processor'
  window.ghIssuesProcessor = IssuesProcessor

  export default {
    name: 'dashboard',
    created() {
      var that = this
      that.ghData = new kendo.data.DataSource({
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
        requestEnd: (data) => {
          that.response = data.response
        }
      })


      that.activeIssuesOptions = {
           chartArea: {
            height: 80
           },
           series: [{
                type: "column",
                gap: 0.5,
                overlay: false,
                stack:true,
                field: "count",
                categoryField: "date",
                aggregate :"count",
            }],
            categoryAxis: [{
                type:"date",
                baseUnit: "days",
                labels:{
                    step: 4,
                    font: '10px sans-serif',
                    format: "dd MMM"
                },
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                },
            }],
            valueAxis: {
                visible: false,
                majorGridLines: {
                    visible: false
                },
            }
        }

      that.ghData.read()
    },
    data() {
      return {
        today: new Date(),
        selectedIndex: 2,
        response: []
      }
    },
    computed: {
      issues () {
          return this.response.length > 0 ? ghIssuesProcessor.process(this.response, this.days) : null
      },
      days() {
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
      rangeStart() {
        const since = new Date()
        since.setDate(since.getDate() - this.days)

        return since
      },
      baseUnit () {
        return this.selectedIndex > 1 ? 'weeks' : 'days'
      }
    },
    methods: {
      onSelect(ev) {
        this.selectedIndex = ev.index
      },
      legendTemplate (data) {
        var series = data.series
        var value = 0

        for (var i = 0; i < series.data.length; i++) {
          value += series.data[i].value
        }

        return value + "\n" + series.name
      },
      calculatePercent (data) {
        return Math.round(data * 100)
      },
      getDate (data) {
        return new Date(parseInt(data)).toDateString();
      }
    }
  }
</script>