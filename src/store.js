class Store {
  // TODO: Use async / await

 getRevenueData() {
    return new Promise((resolve) => {
      resolve([
        {
          label: 'Tablet',
          color: '#a1d56d',
          data: [
            { date: '2018-01-01', value: 50000 },
            { date: '2018-01-02', value: 20000 },
            { date: '2018-01-03', value: 30000 },
            { date: '2018-01-04', value: 10000 },
            { date: '2018-01-05', value: 10000 }
          ],
        },
        {
          label: 'Smartphone',
          color: '#456425',
          data: [
            { date: '2018-01-01', value: 10000 },
            { date: '2018-01-02', value: 20000 },
            { date: '2018-01-03', value: 30000 },
            { date: '2018-01-04', value: 10000 },
            { date: '2018-01-05', value: 10000 },
          ],
        }
      ]);
    });
  }

  getImpressionData() {
    return new Promise((resolve) => {
      resolve([
        {
          label: 'Tablet',
          color: '#87cadf',
          data: [
            { date: '2018-01-01', value: 10000000 },
            { date: '2018-01-02', value: 4000000 },
            { date: '2018-01-03', value: 3000000 },
            { date: '2018-01-04', value: 2000000 },
            { date: '2018-01-05', value: 1000000 }
          ],
        },
        {
          label: 'Smartphone',
          color: '#364f62',
          data: [
            { date: '2018-01-01', value: 15000000 },
            { date: '2018-01-02', value: 9000000 },
            { date: '2018-01-03', value: 3000000 },
            { date: '2018-01-04', value: 2000000 },
            { date: '2018-01-05', value: 1000000 }
          ],
        }
      ]);
    });
  }

  getVisitsData() {
    return new Promise((resolve) => {
      resolve([
        {
          label: 'Tablet',
          color: '#e6c64e',
          data: [
            { date: '2018-01-01', value: 170000000 },
            { date: '2018-01-02', value: 160000000 },
            { date: '2018-01-03', value: 60000000 },
            { date: '2018-01-04', value: 40000000 },
            { date: '2018-01-05', value: 50000000 }
          ],
        },
        {
          label: 'Smartphone',
          color: '#ad5d2e',
          data: [
            { date: '2018-01-01', value: 10000000 },
            { date: '2018-01-02', value: 20000000 },
            { date: '2018-01-03', value: 20000000 },
            { date: '2018-01-04', value: 30000000 },
            { date: '2018-01-05', value: 40000000 }
          ],
        }
      ]);
    });
  }

}

export default Store;