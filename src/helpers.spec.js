import 'intl/locale-data/jsonp/en.js';
import { formatEuro, formatNumber, formatPercentage } from "./helpers";

describe('formatEuro', () => {
  it('formats number and appends euro sign', () => {
    const result = formatEuro(3000);

    expect(result)
      .toEqual('3,000 €');
  });
});

describe('formatNumber', () => {
  it('formats number', () => {
    const result = formatNumber(4000);

    expect(result)
      .toEqual('4,000');
  });
});

describe('formatPercentage', () => {
  it('returns the percentage', () => {
    const result = formatPercentage(20, 100);

    expect(result)
      .toEqual('20%');
  });
});