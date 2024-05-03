class Database {
  static async loadCarsFilter(filter) {
    const response = await fetch(
      'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json'
    )
      .then((response) => response.json())
      .then((data) => {
        let dataFilter = [];
        // Checking Filter TypeDriver
        if (filter.typeDriver) {
          if (filter.typeDriver == 'Dengan Sopir') {
            dataFilter = data.filter((i) => i.available == true);
          } else {
            dataFilter = data.filter((i) => i.available == false);
          }
        }
        // Chekcing Filter Date
        if (filter.date) {
          // Checking Tahun
          if (parseInt(filter.date.slice(0, 4)) > 2022) {
            dataFilter = [];
            // Checking Tahun 2022
          } else if (parseInt(filter.date.slice(0, 4)) == 2022) {
            // Checking Bulan
            if (parseInt(filter.date.slice(5, 7)) > 3) {
              dataFilter = [];
              // Checking Bulan 3
            } else if (parseInt(filter.date.slice(5, 7)) == 3) {
              // Checking Tanggal lebih dari 23
              if (parseInt(filter.date.slice(8, 10)) >= 24) {
                dataFilter = [];
              }
            }
          }
        }
        // Checking Filter Passenger
        if (filter.passenger) {
          dataFilter = dataFilter.filter(
            (i) => i.capacity >= parseInt(filter.passenger)
          );
        }
        return dataFilter;
      })
      .catch((error) => console.log('Error loading JSON file', error));

    return response;
  }
}
