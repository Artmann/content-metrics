import SplitChart from "./components/split-chart";
import './styles/app.scss';
import Store from "./store";

class App {
  constructor() {
    this.app = document.createElement('div');
    this.app.className = 'app';

    this.children = [];
    const store = new Store();

    const promises = [
      store.getRevenueData().then(data => this.revenueData = data),
      store.getImpressionData().then(data => this.impressionData = data),
      store.getVisitsData().then(data => this.visitsData = data),
    ];

    Promise.all(promises).then(() => {
      this.children = [
        new SplitChart(
          'Revenue',
          this.revenueData,
          true
        ),
        new SplitChart(
          'Impressions',
          this.impressionData
        ),
        new SplitChart(
          'Visits',
          this.visitsData
        )
      ];

      this.render();
    });
  }

  render() {
    this.children.forEach((child) => {
      this.app.appendChild(child.getElement());
    });

    document.body.appendChild(this.app);
  }
}

new App();