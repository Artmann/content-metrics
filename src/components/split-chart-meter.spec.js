import SplitChartMeter from "./split-chart-meter";

let component;

describe('SplitChartMeter', () => {

  beforeEach(() => {
    component = new SplitChartMeter('Test Metrics', [
      {
        label: 'Tablet',
        color: '#a1d56d',
        data: [
          { date: '2018-01-01', value: 12300 }
        ]
      },
      {
        label: 'Smartphone',
        color: '#456425',
        data: [
          { date: '2018-01-01', value: 45600 }
        ]
      }
    ], false);
  });

  describe('getElement', () => {

    it('returns a div with the correct class', () => {
      const element = component.getElement();

      expect(element.tagName)
        .toEqual('DIV');

      expect(element.className)
        .toEqual('split-chart-meter');
    });

    it('displays the metric name', () => {
      const element = component.getElement();
      const result = element.querySelector('[data-test-metric-name]');

      expect(result.innerHTML)
        .toEqual('Test Metrics');
    });

    it('displays the sum of the data sets', () => {
      const element = component.getElement();
      const result = element.querySelector('[data-test-sum]');

      expect(result.innerHTML)
        .toEqual('57,900');
    });

  });

});