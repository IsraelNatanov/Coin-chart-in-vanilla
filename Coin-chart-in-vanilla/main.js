document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    const chartElement = document.querySelector("#chart");
    const rangeInput = document.getElementById('marketCapRange');
    const marketCapValue = document.getElementById('marketCapValue');
    const toggleContainer = document.getElementById('toggle-container');
    const contentContainer = document.getElementById('content');
    const errorMessage = document.getElementById('error-message');
    let chart;
    let largestMarketCapCoin;
    let allDataBySelect;
    let isCoinVisible = {};

    // API call and data processing
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            const allData = response.data;
            console.log(`GET`, allData);
            allDataBySelect = allData;
            initializeToggles(allData); // Creating a checkbox for each name and listening to their toggles
            largestMarketCapCoin = getLargestMarketCap(allData); //Name of the currency with the highest market capitalization
            const maxMarketCap = Math.max(...allData.map(coin => coin.market_cap)); // Keeping the highest market_cap among all currencies
            rangeInput.max = maxMarketCap; // Max definition of input
            marketCapValue.textContent = maxMarketCap; // Value definition of input

            createChart(allData); // Calling this function to create a chart

            //  Add an event listener for the range input
            rangeInput.addEventListener('input', (event) => {
                const valueCap = event.target.value;
                marketCapValue.textContent = valueCap;
                const filteredData = allData.filter(coin => coin.market_cap >= valueCap);
                allDataBySelect = filteredData;
                updateChart(filteredData, isCoinVisible); // Calling the function to update the Chart according to the filtering of the input
            });

            // Show the content container if data is successfully fetched
            contentContainer.style.display = 'block';
        } catch (error) {
            console.error('Error fetching data:', error);
            errorMessage.textContent = 'Error fetching data: ' + error.message;
            // Hide the content container if there's an error
            contentContainer.style.display = 'none';
        }
    };

    // A function that returns the name of the currency with the highest market capitalization
    const getLargestMarketCap = (data) => {
        if (data.length === 0) return null;
        let maxMarketCap = data[0].market_cap;
        let coinWithMaxMarketCap = data[0].name;
        for (let i = 1; i < data.length; i++) {
            if (data[i].market_cap > maxMarketCap) {
                maxMarketCap = data[i].market_cap;
                coinWithMaxMarketCap = data[i].name;
            }
        }
        return coinWithMaxMarketCap;
    };

    // Creating a chart and displaying it on the screen
    const createChart = (data) => {
        const names = data.map(coin => coin.name);
        const marketCaps = data.map(coin => coin.market_cap);
        const options = {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: '50%',
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 0
            },
            grid: {
                row: {
                    colors: ['#fff', '#f2f2f2']
                }
            },
            noData: {
                text: 'There is no data to display'
            },
            annotations: {
                xaxis: [
                    {
                        x: largestMarketCapCoin, //The name of the currency with the highest market value
                        borderColor: '#00E396',
                        label: {
                            borderColor: '#00E396',
                            orientation: 'horizontal',
                            text: 'the highest market cap'
                        }
                    }
                ]
            },
            series: [{
                name: 'Market Cap',
                data: marketCaps
            }],
            xaxis: {
                categories: names,
                labels: {
                    rotate: -45
                },
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'Market Cap in USD',
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val.toLocaleString();
                    }
                }
            }
        };

        if (chart) {
            chart.destroy();
        }

        chart = new ApexCharts(chartElement, options);
        chart.render();
    };

    // Updating a diagram in the DOM
    const updateChart = (data, visibilityState) => {
        const visibleData = data.filter(coin => visibilityState[coin.name]);
        const names = visibleData.map(coin => coin.name);
        const marketCaps = visibleData.map(coin => coin.market_cap);
        chart.updateOptions({
            series: [{
                name: 'Market Cap',
                data: marketCaps
            }],
            xaxis: {
                categories: names,
                labels: {
                    rotate: -45
                },
                tickPlacement: 'on'
            },
        });
    };

    // Creating a checkbox for each name and listening to their toggles
    const initializeToggles = async (data) => {
        toggleContainer.innerHTML = '';
        data.forEach(coin => {
            isCoinVisible[coin.name] = true;

            const label = document.createElement('label');
            label.innerText = coin.name;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = true;
            input.dataset.coinName = coin.name;  // Store the coin name in a data attribute
            input.addEventListener('change', (event) => {
                const coinName = event.target.dataset.coinName;
                isCoinVisible[coinName] = event.target.checked;
         
                updateChart(allDataBySelect, isCoinVisible); // Call to update the chart according to isCoinVisible (toogle of all coins)
            });
            label.appendChild(input);
            toggleContainer.appendChild(label);
        });
    };

    fetchData();
});
