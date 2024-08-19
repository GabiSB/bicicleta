document.getElementById('fileInput').addEventListener('change', handleFile);

let rentalData = [];

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const csvData = event.target.result;
        rentalData = parseCSV(csvData);
    };

    reader.readAsText(file);
}

function parseCSV(csvData) {
    const rows = csvData.split("\n");
    const data = rows.map(row => {
        const [day, weather, rentals] = row.split(",");
        return {
            day: parseInt(day),
            weather: weather.trim(),
            rentals: parseInt(rentals)
        };
    });
    return data;
}

function predictRentals() {
    const weekday = parseInt(document.getElementById('weekday').value);
    const weather = document.getElementById('weather').value;

    const filteredData = rentalData.filter(record => record.day === weekday && record.weather === weather);

    if (filteredData.length === 0) {
        document.getElementById('prediction').textContent = "Nenhum dado disponível";
        return;
    }

    const totalRentals = filteredData.reduce((sum, record) => sum + record.rentals, 0);
    const averageRentals = Math.round(totalRentals / filteredData.length);

    document.getElementById('prediction').textContent = averageRentals;
}
