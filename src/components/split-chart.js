import {  formatEuro, formatNumber, formatPercentage } from '../helpers';
import SplitChartMeter from './split-chart-meter';

class SplitChart {

  constructor(metricName, dataSets, isMonetary) {
    this.metricName = metricName;
    this.dataSets = dataSets;
    this.isMonetary = isMonetary || false;

    this.meter = new SplitChartMeter(metricName, dataSets, isMonetary);

    this._render();
  }

  getElement() {
    return this.container;
  }

  _render() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'split-chart';
    }

    this.container.innerHTML = this._template();
  }

  _template() {
    const { label: labelA, color: colorA } = this.dataSets[0];
    const { label: labelB, color: colorB } = this.dataSets[1];

    const sums = this.dataSets.map(set => {
      return set.data
        .map(d => d.value)
        .reduce((carry, value) => carry + value, 0);
    });
    const sum = sums[0] + sums[1];

    const meterElement = this.meter.getElement().outerHTML;

    return `
      ${ meterElement }
      <div class="split-chart__details">
        <div class="split-chart__detail">
          <div class="split-chart__label" style="color: ${ colorA };">
            ${ labelA }
          </div>
          <div class="split-chart__values">
            <div class="split-chart__percentage">
              ${ formatPercentage(sums[0], sum) }
            </div>
            <div class="split-chart__value">
              ${ this.isMonetary ? formatEuro(sums[0]) : formatNumber(sums[0]) }
            </div>
          </div>
        </div>
        <div class="split-chart__detail">
          <div class="split-chart__label split-chart__label--right" style="color: ${ colorB };">
            ${ labelB }
          </div>
          <div class="split-chart__values split-chart__values--right">
            <div class="split-chart__percentage">
              ${ formatPercentage(sums[1], sum) }
            </div>
            <div class="split-chart__value split-chart__value--right">
              ${ this.isMonetary ? formatEuro(sums[1]) : formatNumber(sums[1]) }
            </div>
          </div>
        </div>
      </div>
    `;
  }

}

export default SplitChart;