# Cryptocurrency Market Cap Chart

This project displays a bar chart of the top 10 cryptocurrencies by market capitalization. The data is fetched from the CoinGecko API. Users can filter the chart based on market capitalization using a range input and toggle the visibility of individual cryptocurrencies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Dependencies](#dependencies)


## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/IsraelNatanov/Coin-chart-in-vanilla.git
    cd Coin-chart-in-vanilla
    ```
    

2. **Open the project in your preferred code editor**.

3. **Open the `index.html` file in your web browser**:
    - You can simply double-click the `index.html` file, or
    - Serve the project using a local web server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if you are using Visual Studio Code.

## Usage

Once the project is loaded in your browser:

- API reading and data processing and error handling
- Display market cap data for the top cryptocurrencies in a bar chart.
- Adding a feature within the chart, note for the cryptocurrency with the highest market cap.
- Toggle the visibility of individual cryptocurrencies.
- Filter the chart data based on market cap using a range input.

## Project Structure

```plaintext
.
├── index.html         # Main HTML file
├── main.css           # CSS styles
├── main.js            # JavaScript to fetch data and render the chart
└── README.md          # Project documentation
```

## Features

- **Real-time Data**: Fetches the latest market cap data for the top 10 cryptocurrencies from the CoinGecko API.
- **Interactive Chart**: Displays a bar chart using ApexCharts.
- **Chart Feature**: Adding a feature within the chart, note for the cryptocurrency with the highest market cap.
- **Market Cap Filter**: Users can filter the chart based on market cap using a range input.
- **Visibility Toggles**: Users can toggle the visibility of individual cryptocurrencies on the chart using checkboxes.

## Dependencies

- **Axios**: For making HTTP requests to the CoinGecko API.
- **ApexCharts**: For rendering the bar chart.

The dependencies are loaded via CDN in the `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
```




