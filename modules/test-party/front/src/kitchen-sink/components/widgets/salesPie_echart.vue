<template>
  <f7-card>
    <f7-card-header>
      <div>{{ $text('Fruit Sales(Pie Chart)') }}</div>
      <div class="test-powered-by">Powered by ECharts</div>
    </f7-card-header>
    <f7-card-content>
      <div ref="chart" class="test-chart-pie"></div>
      <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
    </f7-card-content>
  </f7-card>
</template>
<script>
const propsSchema = {
  type: 'object',
  properties: {
    dataSource: {
      type: 'object',
      ebType: 'text',
      ebTitle: 'Data Source',
      ebWidget: {
        bindOnly: true,
        clue: 'salesDataSource',
      },
    },
    season: {
      type: 'string',
      ebType: 'select',
      ebTitle: 'Season',
      ebOptions: [],
      ebOptionsBlankAuto: true,
      ebWidget: {
        clue: 'salesSeason',
      },
    },
  },
};

const attrsSchema = {
  type: 'object',
  properties: {
    snapshot: {
      ebTitle: 'Snapshot',
      ebWidget: {
        clue: 'snapshot',
      },
    },
  },
};

// export
export default {
  installFactory,
};

// installFactory
function installFactory(_Vue) {
  const Vue = _Vue;
  const ebDashboardWidgetBase = Vue.prototype.$meta.module.get('a-dashboard').options.mixins.ebDashboardWidgetBase;
  const ebViewSizeChange = Vue.prototype.$meta.module.get('a-components').options.mixins.ebViewSizeChange;
  return {
    meta: {
      widget: {
        schema: {
          props: propsSchema,
          attrs: attrsSchema,
        },
      },
    },
    mixins: [ebDashboardWidgetBase, ebViewSizeChange],
    props: {
      dataSource: {
        type: Object,
      },
      season: {
        type: String,
      },
    },
    data() {
      return {
        echarts: null,
        chart: null,
        snapshot: null,
        errorMessage: null,
      };
    },
    watch: {
      dataSource() {
        this.__updateChart();
        this.$emit('widget:propsSchemaChange');
      },
      season() {
        this.__updateChart();
      },
    },
    mounted() {
      this.__init();
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
    methods: {
      getAttrsSchema() {
        const attrs = [];
        if (this.snapshot) {
          attrs.push('snapshot');
        }
        return attrs;
      },
      getPropsSchema() {
        const props = ['dataSource'];
        if (this.dataSource) {
          props.push('season');
        }
        return props;
      },
      getPropSchemaExtra(propName) {
        // season
        if (propName === 'season') {
          if (!this.dataSource) return null;
          const ebOptions = this.dataSource.rows.map(item => {
            return { title: item, value: item };
          });
          return { ebOptions };
        }
        return null;
      },
      __init() {
        const action = {
          actionModule: 'a-echarts',
          actionComponent: 'echarts',
          name: 'instance',
        };
        this.$meta.util.performAction({ ctx: this, action }).then(echarts => {
          this.echarts = echarts;
          this.__updateChart();
        });
      },
      __prepareData() {
        const seasonIndex = this.dataSource.rows.findIndex(item => item === this.season);
        if (seasonIndex === -1) throw new Error();
        const seasonData = this.dataSource.dataset[seasonIndex];
        const chartData = [];
        for (let index = 0; index < 2; index++) {
          chartData.push({
            value: seasonData[index],
            name: this.dataSource.cols[index],
          });
        }
        return chartData;
      },
      __prepareOptions() {
        const chartOptions = {
          title: {
            text: this.season,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: this.__prepareData(),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
        return chartOptions;
      },
      __createSnapshot() {
        const image = this.chart.getDataURL();
        this.snapshot = {
          title: this.$text('Fruit Sales(Pie Chart)'),
          image,
        };
      },
      __clearChart() {
        this.snapshot = null;
        if (this.chart) {
          this.chart.clear();
        }
      },
      __updateChart() {
        try {
          if (!this.echarts) return;
          if (!this.dataSource || !this.season) {
            this.__clearChart();
            this.errorMessage = this.$text('Please set data source');
            return;
          }
          if (!this.chart) {
            this.chart = this.echarts.init(this.$refs.chart);
            this.chart.on('finished', () => {
              this.__createSnapshot();
            });
          }
          const chartOptions = this.__prepareOptions();
          this.chart.setOption(chartOptions);
          this.errorMessage = null;
          return;
        } catch (err) {
          this.__clearChart();
          this.errorMessage = this.$text('There may be a binding error');
        }
      },
      onViewSizeChange() {
        if (this.chart) {
          this.chart.resize();
        }
      },
    },
  };
}
</script>
<style lang="less" scoped>
.error {
  position: absolute;
  bottom: 6px;
  right: 6px;
  font-size: smaller;
}
.test-chart-pie {
  width: 100%;
  height: 160px;
}
.test-powered-by {
  font-size: smaller;
  color: rgba(128, 128, 128, 0.6);
}
</style>
