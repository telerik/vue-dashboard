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
      <!-- <kendo-grid :data-source="issues.active">

            </kendo-grid> -->
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
                      :series-defaults="{color: 'rgb(136, 136, 136)'}"
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
                <kendo-chart :chart-area="activeIssuesOptions.chartArea"
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
                  <strong >{{ Math.round(issues.closeRate.average * 100, 2) }}%</strong>
                  <small>Close rate</small>
                </span>
                <p class="m-0 small text-uppercase text-muted">
                                Highest:
                              {{Math.round(issues.closeRate.highest.close_rate * 100, 2) }}%
                                on {{new Date(parseInt(issues.closeRate.highest.created_at)).toDateString()}}
                            </p>
                            <p class="m-0 small text-uppercase text-muted">
                                Lowest:
                                {{Math.round(issues.closeRate.lowest.close_rate* 100, 2) }}%
                                on {{ new Date(parseInt(issues.closeRate.lowest.created_at)).toDateString() }}
                            </p>
                            <kendo-chart
                              :legend-visible="false"
                              :data-source="[{target: 70, current: Math.round(issues.closeRate.average* 100)}]"
                              :series="[{
                                type: 'bullet',
                                target: {color: '#fff'},
                                currentField: 'current',
                                targetField: 'target'
                              }]"
                              :value-axis-min="0"
                              :value-axis-max="100"
                              :chart-area-margin-left="0"
                              :chart-area-margin-top="-20"
                              :value-axis-major-ticks-visible="false"
                              :value-axis-minor-ticks-visible="false"
                              :value-axis-major-grid-lines-visible="false"
                              :value-axis-labels-visible="false"
                              :value-axis-line-visible="false"
                              :value-axis-plot-bands="[{from:0, to:100, color: '#35C473'}]"
                              :category-axis-line-visible="false"
                              :category-axis-major-grid-lines-visible="false"
                              :category-axis-major-ticks-visible="false"
                              :chart-area-height="50"
                              :tooltip-visible="false"
                            ></kendo-chart>
                            <!-- <kendo-chart style="height: 20px;" [chartArea]="{margin: -20}">
                                <kendo-chart-series>
                                    <kendo-chart-series-item type="bullet"
                                        [data]="bulletData"
                                        [target]="{color: '#FFF'}"
                                        currentField="current"
                                        targetField="target"
                                        color="#CC3458"
                                    ></kendo-chart-series-item>
                                </kendo-chart-series>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item
                                        [plotBands]="[{from:0, to:100, color: '#35C473'}]"
                                        [visible]="false"
                                        [majorGridLines]="{visible: false}">
                                    </kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>
                            </kendo-chart> -->
              </div>

            </div>


            <h3>All issues</h3>
            <kendo-chart
              :chart-area-height="400"
              :series-defaults-type="'column'"
              :series-defaults-stack="true"
              :series-defaults-gap="0.6"
              :series-defaults-overlay="false"
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
              :category-axis-base-unit="'days'"
              :category-axis-major-ticks-visible="false"
              :category-axis-major-grid-lines-visible="false"
              :category-axis-line-visible="false"
              :category-axis-labels-rotation="'auto'"
              :category-axis-labels-margin-top="8"

              :value-axis-line-visible="false"
              :value-axis-labels-step="2"
              :value-axis-labels-skip="2"
              :value-axis-labels-margin-right="4"
              :value-axis-major-grid-lines-step="2"
              :value-axis-major-grid-lines-skip="2"
              :value-axis-major-grid-lines-color="'#F0F2F2'">
            </kendo-chart>
            <!-- <kendo-chart>
                        <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.06" [overlay]="false"></kendo-chart-series-defaults>
                        <kendo-chart-series>
                            <kendo-chart-series-item [opacity]="0.3" [border]="{color: '#35C473', opacity: 0.3}" [color]="'#35C473'" [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                            <kendo-chart-series-item [opacity]="0.3" [border]="{color: '#CC3458', opacity: 0.3}" [color]="'#CC3458'" [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                        </kendo-chart-series>
                        <kendo-chart-category-axis>
                            <kendo-chart-category-axis-item
                                [baseUnit]="baseUnit"
                                [majorTicks]="{visible: false}"
                                [line]="{visible: false}"
                                [majorGridLines]="{visible: false}"
                                [labels]="{rotation: 'auto', margin: { top: 8 }}"
                            ></kendo-chart-category-axis-item>
                        </kendo-chart-category-axis>
                        <kendo-chart-value-axis>
                            <kendo-chart-value-axis-item [line]="{visible: false}" [labels]="{step: 2, skip: 2, margin: { right: 4 }}" [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
                            </kendo-chart-value-axis-item>
                        </kendo-chart-value-axis>
                    </kendo-chart> -->

          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card issue-types">
          <h4 class="card-header">Issue Types</h4>
          <div class="card-block">
            <!-- <kendo-chart (seriesHover)="onHover($event)">
                        <kendo-chart-series>
                            <kendo-chart-series-item
                                [holeSize]="100"
                                [data]="issues"
                                type="donut"
                                field="value"
                                categoryField="type"
                                [overlay]="false"
                            ></kendo-chart-series-item>
                        </kendo-chart-series>
                        <kendo-chart-legend position="bottom" [labels]="{font: '0.65em Roboto, Arial, sans-serif'}">
                        </kendo-chart-legend>
                    </kendo-chart> -->
            <div class="comp-label chart-label">
              <!-- <div class="comp-label chart-label" [style.color]="hoverColor"> -->
              <!-- <strong>{{donutPercent}}</strong>
                        <small>{{donutLabel}}</small> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <h4 class="card-header">Types Distribution</h4>
          <div class="row card-block small">
            <!-- <a *ngFor="let button of seriesColors" (click)="addSeries(button, true)"
                          [style.color]="button.active ? button.value : initialGrey"
                          class="col-xs-4 col-sm-3 col-md comp-label">
                          <strong>{{data[button.label].length}}</strong>
                          <small>{{button.label}}</small>
                      </a> -->
          </div>
          <div class="card-block">
            <!-- <kendo-chart style="height: 300px;" [transitions]="false">
                          <kendo-chart-series-defaults type="line" [overlay]="false"></kendo-chart-series-defaults>
                          <kendo-chart-category-axis>
                              <kendo-chart-category-axis-item
                                  baseUnit="months"
                                  [majorTicks]="{visible: false}"
                                  [labels]="{step: 4, skip: 2}"
                                  [majorGridLines]="{visible: false}"
                                  [line]="{visible: false}"
                              ></kendo-chart-category-axis-item>
                          </kendo-chart-category-axis>
                          <kendo-chart-series>
                              <kendo-chart-series-item *ngFor="let series of visibleSeries"
                                  [data]="series.data"
                                  [markers]="series.markers"
                                  [color]="series.color"
                                  style="smooth"
                                  aggregate="count"
                                  categoryField="date"
                              ></kendo-chart-series-item>
                          </kendo-chart-series>
                          <kendo-chart-value-axis>
                              <kendo-chart-value-axis-item [line]="{visible: false}" [labels]="{step: 2, skip: 2}" [majorGridLines]="{step: 2, skip: 2, color: '#F0F2F2'}">
                              </kendo-chart-value-axis-item>
                          </kendo-chart-value-axis>
                      </kendo-chart> -->
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
                    format: "ddd MM"
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

        that.allIssuesSeries = [{
              name: 'closed',
              color: 'green',
              field: 'count',
              aggregate: 'count',
              categoryField: 'dateClosed',
           //   data: issues.groupedIssues.closed
           data: [{'closed': 1, 'date': new Date()},{'closed': 1, 'date': new Date()}]

            },
            {
              name: 'open',
              color: 'red',
              field: 'count',
              aggregate: 'count',
              categoryField: 'created_at',
             //field: issues.groupedIssues.open,
              data: [{'open': 1, 'date': new Date()},{'open': 1, 'date': new Date()}]
            }
            ]

      that.ghData.read()
    },
    data() {
      return {
        today: new Date(),
        selectedIndex: 2,
        response: []
      }
    },
    watch:{
      issues (val) {
        console.log(val)
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
      }
    },
    methods: {
      onSelect(ev) {
        this.selectedIndex = ev.index
      }
    }
  }
</script>