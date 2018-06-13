import { arc, area, extent, line, max, scaleLinear, scaleTime, select, timeParse } from 'd3';
import { formatNumber, formatEuro } from '../helpers';

class SplitChartMeter {
  constructor(metricName, dataSets, isMonetary) {
    this.metricName = metricName;
    this.dataSets = dataSets;
    this.isMonetary = isMonetary || false;

    this._render();
  }

  getElement() {
    return this.container;
  }

  _render() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'split-chart-meter';
    }

    const { color: colorA } = this.dataSets[0];
    const { color: colorB } = this.dataSets[1];

    const sums = this.dataSets.map(set => {
      return set.data
        .map(d => d.value)
        .reduce((carry, value) => carry + value, 0);
    });

    // Note: there are better ways to do this
    const dataPoints= this.dataSets[0].data.map((set, index) => {
      return {
        date: set.date,
        value: set.value + this.dataSets[1].data[index].value
      };
    });

    const size = 162;

    const svg = select(this.container)
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g');

    const content = svg.append('g');

    this._createChart(content, size, dataPoints, colorA);
    this._createText(content, size, sums[0] + sums[1]);
    this._createMeter(svg, size, sums[0], sums[1], colorA, colorB);
  }

  _createChart(parent, size, metrics, color) {
    const areaChart = parent.append('g');

    const parseTime = timeParse('%Y-%m-%d');
    const x = scaleTime().rangeRound([0, size]);
    const y = scaleLinear().rangeRound([size, size - 65]);

    const _area = area()
      .x(d => x(d.date))
      .y0(y(0))
      .y1(d => y(d.value));

    const valueLine = line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const formattedMetrics = metrics.map(m => ({
      date: parseTime(m.date),
      value: +m.value
    }));

    x.domain(extent(formattedMetrics, m => m.date));
    y.domain([0, max(formattedMetrics, m => m.value)])

    areaChart
      .append('path')
      .data([formattedMetrics])
      .attr('style', `fill: ${ color }; opacity: 0.2;`)
      .attr('d', _area);

    areaChart
      .append('path')
      .data([formattedMetrics])
      .attr('style', `fill: none; stroke: ${ color }; stroke-width: 2px;`)
      .attr('d', valueLine);
  }

  _createMeter(parent, size, totalA, totalB, colorA, colorB) {
    const meter = parent
      .append('g')
      .attr('transform', `translate(${ size / 2 }, ${ size / 2 })`);

    const innerCircle = arc()
      .startAngle(0)
      .innerRadius(70)
      .outerRadius(size);

    const outerCircle = arc()
      .startAngle(0)
      .innerRadius(75)
      .outerRadius(size / 2);

    meter.append('path')
      .attr('style', `fill: #fff;`)
      .attr('d', innerCircle.endAngle(2 * Math.PI));

    meter.append('path')
      .attr('style', `fill: ${ colorA };`)
      .attr('d', outerCircle.endAngle(2 * Math.PI));

    const percentage = totalA / (totalA + totalB);
    meter.append('path')
      .attr('style', `fill: ${ colorB };`)
      .attr('d', outerCircle.endAngle(2 * Math.PI * percentage));
  }

  _createText(parent, size, total) {
    const text = this.isMonetary ? formatEuro(total) : formatNumber(total);

    parent
      .append('text')
      .attr('x', size / 2)
      .attr('y', size / 2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('style', "fill: #000; font-size: 22px; font-family: 'Roboto', sans-serif")
      .attr('data-test-sum', true)
      .text(text);

    parent
      .append('text')
      .attr('x', size / 2)
      .attr('y', size / 2 - 25)
      .attr('alignment-baseline', 'central')
      .attr('text-anchor', 'middle')
      .attr('style', "fill: #a8a8a8; font-size: 15px; font-family: 'Roboto', sans-serif; text-transform: uppercase;")
      .attr('data-test-metric-name', true)
      .text(this.metricName);
  }
}

export default SplitChartMeter;