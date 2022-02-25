module.exports = {
    services: [
        {
            name: 'NASA',
            icon: 'mdi-rocket-launch',
            widgets: [
                { name: 'Picture of the day', icon: 'mdi-image-filter-hdr' },
                { name: 'Picture of rover', icon: 'mdi-robot' },
                { name: 'Close asteroid data', icon: 'mdi-space-station' },
            ]
        },
        {
            name: 'RSS',
            icon: 'mdi-rss-box',
            widgets: [
                { name: 'Rss feed', icon: 'mdi-rss-box' },
            ]
        },
        {
            name: 'WEATHER',
            icon: 'mdi-weather-cloudy',
            widgets: [
                { name: 'Pollution', icon: 'mdi-molecule-co2' },
                { name: 'Weather', icon: 'mdi-thermometer' },
            ]
        },
    ]
}