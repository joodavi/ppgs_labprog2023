export default {
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Produção vs Qualis',
                color: '#fff',
                weight: 500,
                font: {
                    size: 18
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        }
    }
}