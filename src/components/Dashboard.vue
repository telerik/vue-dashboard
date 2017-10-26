<template>
  <div>
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
    <div class="row">
      <kendo-grid :data-source="issues.active">

            </kendo-grid>
      <div class="col-md-12">
        <div class="card">
          <h3 class="card-header">Active Issues</h3>
          <div class="card-block">

            <div class="row">

              <div class="col-sm-12 col-md-6 col-lg active-issues">
                <span class="comp-label">
                  <!-- <strong>{{ issues.open + issues.closed }}</strong> -->
                  <small>Active issues</small>
                </span>
                <!-- <kendo-chart style="height: 80px;">
                                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.5" [overlay]="false"></kendo-chart-series-defaults>
                                <kendo-chart-series>
                                    <kendo-chart-series-item [color]="'#888'" [data]="active" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                                </kendo-chart-series>
                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [baseUnit]="baseUnit"
                                        [majorTicks]="{visible: false}"
                                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                                        [majorGridLines]="{visible: false}"
                                        [line]="{visible: false}"
                                    ></kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                    </kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>
                            </kendo-chart> -->
              </div>

              <div class="col-sm-12 col-md-6 col-lg text-success closed-issues">
                <span class="comp-label">
                  <!-- <strong>{{ issues.closed }}</strong> -->
                  <small>Closed issues</small>
                </span>
                <!-- <kendo-chart style="height: 80px;">
                                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.5" [overlay]="false"></kendo-chart-series-defaults>
                                <kendo-chart-series>
                                    <kendo-chart-series-item [color]="'#35C473'" [data]="data.closed" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                                </kendo-chart-series>
                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [baseUnit]="baseUnit"
                                        [majorTicks]="{visible: false}"
                                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                                        [majorGridLines]="{visible: false}"
                                        [line]="{visible: false}"
                                    ></kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                    </kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>
                            </kendo-chart> -->
              </div>

              <div class="col-sm-12 col-md-6 col-lg text-danger open-issues">
                <span class="comp-label">
                  <!-- <strong>{{ issues.open }}</strong> -->
                  <small>Open issues</small>
                </span>
                <!-- <kendo-chart style="height: 80px;">
                                <kendo-chart-series-defaults type="column" [stack]="true" [gap]="0.5" [overlay]="false"></kendo-chart-series-defaults>
                                <kendo-chart-series>
                                    <kendo-chart-series-item [color]="'#CC3458'" [data]="data.open" field="count" categoryField="date" aggregate="count"></kendo-chart-series-item>
                                </kendo-chart-series>
                                <kendo-chart-category-axis>
                                    <kendo-chart-category-axis-item
                                        [baseUnit]="baseUnit"
                                        [majorTicks]="{visible: false}"
                                        [labels]="{step: 4, skip: 2, font: '10px sans-serif'}"
                                        [majorGridLines]="{visible: false}"
                                        [line]="{visible: false}"
                                    ></kendo-chart-category-axis-item>
                                </kendo-chart-category-axis>
                                <kendo-chart-value-axis>
                                    <kendo-chart-value-axis-item [visible]="false" [majorGridLines]="{visible: false}">
                                    </kendo-chart-value-axis-item>
                                </kendo-chart-value-axis>
                            </kendo-chart> -->
              </div>

              <div class="col-sm-12 col-md-6 col-lg close-rate">
                <span class="comp-label">
                  <!-- <strong>{{ issues.closeRate.average | percent:'2.0-0' }}</strong> -->
                  <small>Close rate</small>
                </span>
                <!-- <p class="m-0 small text-uppercase text-muted">
                                Highest:
                                {{issues.closeRate.highest.close_rate | percent: '2.0-0' }}
                                on {{issues.closeRate.highest.created_at | date}}
                            </p>
                            <p class="m-0 small text-uppercase text-muted">
                                Lowest:
                                {{issues.closeRate.lowest.close_rate | percent: '2.0-0' }}
                                on {{issues.closeRate.lowest.created_at | date}}
                            </p>
                            <kendo-chart style="height: 20px;" [chartArea]="{margin: -20}">
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
        requestEnd: (data) => {
          that.response = data.response
        }
      })

      that.ghData.read()
    },
    data() {
      return {
        today: new Date(),
        selectedIndex: 0,
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
          return this.response.length > 0 ? ghIssuesProcessor.process(this.response, this.days) : {}
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