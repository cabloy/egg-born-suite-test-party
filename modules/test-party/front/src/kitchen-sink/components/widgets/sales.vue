<template>
  <f7-card>
    <f7-card-header>
      <div>{{ $text('Fruit Sales') }}</div>
      <div>
        <eb-button :outline="rotate" :onPerform="onPerformRotateSwitch">
          {{ this.$text('WidgetSalesTitleRotate') }}
        </eb-button>
      </div>
    </f7-card-header>
    <f7-card-content>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th class="label-cell"></th>
              <th v-for="(col, index) of dataSource.cols" :key="index" class="numeric-cell">
                <f7-link :class="col === fruit ? 'selected' : ''" @click="onClickFruit(col)">{{ col }}</f7-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) of dataSource.rows" :key="index">
              <th class="label-cell">
                <f7-link :class="row === season ? 'selected' : ''" @click="onClickSeason(row)">{{ row }}</f7-link>
              </th>
              <td v-for="(col, colIndex) of dataSource.cols" :key="colIndex" class="numeric-cell">
                {{ dataSource.dataset[index][colIndex] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </f7-card-content>
    <f7-card-footer>
      <span></span>
      <span></span>
      <span>Amount: {{ getAmount() }}</span>
    </f7-card-footer>
  </f7-card>
</template>
<script>
import dataSource from './data/sales.js';

const propsSchema = {
  type: 'object',
  properties: {
    rotate: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'WidgetSalesTitleRotate',
    },
  },
};
const attrsSchema = {
  type: 'object',
  properties: {
    dataSource: {
      ebTitle: 'Data Source',
      ebWidget: {
        clue: 'salesDataSource',
      },
    },
    fruit: {
      ebTitle: 'Fruit',
      ebWidget: {
        clue: 'salesFruit',
      },
    },
    season: {
      ebTitle: 'Season',
      ebWidget: {
        clue: 'salesSeason',
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
  return {
    meta: {
      widget: {
        schema: {
          props: propsSchema,
          attrs: attrsSchema,
        },
      },
    },
    mixins: [ebDashboardWidgetBase],
    props: {
      rotate: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        dataSource,
        fruit: 'All',
        season: 'Spring',
        rotates: [],
        rotateIndex: 0,
        rotateIntervalId: 0,
      };
    },
    watch: {
      rotate() {
        this.__checkRotate();
      },
    },
    created() {
      this.__init();
    },
    beforeDestroy() {
      this.__stopRotate();
      this.rotates = [];
    },
    methods: {
      __init() {
        this.__prepareRotate();
        this.__checkRotate();
      },
      __prepareRotate() {
        for (const item of dataSource.cols) {
          this.rotates.push({
            handler: () => {
              this.onClickFruit(item);
            },
          });
        }
        for (const item of dataSource.rows) {
          this.rotates.push({
            handler: () => {
              this.onClickSeason(item);
            },
          });
        }
      },
      __checkRotate() {
        if (this.rotate) {
          this.__startRotate();
        } else {
          this.__stopRotate();
        }
      },
      __startRotate() {
        this.__stopRotate();
        this.rotateIntervalId = window.setInterval(() => {
          const rotate = this.rotates[++this.rotateIndex % this.rotates.length];
          rotate.handler();
        }, 3000);
      },
      __stopRotate() {
        if (this.rotateIntervalId) {
          window.clearInterval(this.rotateIntervalId);
          this.rotateIntervalId = 0;
        }
      },
      getAmount() {
        return this.dataSource.dataset.reduce((total, row) => {
          return total + row[2];
        }, 0);
      },
      onClickFruit(fruit) {
        this.fruit = fruit;
      },
      onClickSeason(season) {
        this.season = season;
      },
      async onPerformRotateSwitch() {
        return await this.widget.setPropertyValue('rotate', {
          type: 1,
          value: !this.rotate,
        });
      },
    },
  };
}
</script>
<style lang="less" scoped>
.data-table {
  th,
  td {
    padding: 0 6px;
  }

  th {
    .link.selected {
      color: orange;
      &:after {
        content: '';
        position: absolute;
        height: 2px;
        background: var(--f7-tabbar-link-active-border-color, var(--f7-theme-color));
        left: 0;
        width: 100%;
        bottom: -4px;
      }
    }
  }
}
</style>
