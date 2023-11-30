import React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../../features/categories/categoriesSlice'

ChartJS.register(ArcElement, Tooltip, Legend);

/* helpers */

const calculateCategoriesOrders = (categories,orders) => {
    const categoriesOrders = Object.fromEntries(
        categories.map((element, index) => [element, 0])
    );
    
    orders.forEach(order => {
        order.products.forEach(product => {
            categoriesOrders[product.category] += 1
        })
    })

    return Object.values(categoriesOrders)
}

/* end helpers */

const options = {
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
};


const OrdersByCategoryPie = ({orders}) => {
    const categories = useSelector(selectCategories)
    const [data, setData] = React.useState(false) // false or data

    React.useEffect(() => {
        const categoriesOrders = calculateCategoriesOrders(categories,orders)
        setData({
            labels: categories,
            datasets: [
                {
                    label: 'Orders By Category',
                    data: categoriesOrders,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }, [])
    return (
        <Stack spacing={1}>
            <Typography variant='h6'>Orders by category</Typography>
            {data && <Pie data={data} options={options} />}
        </Stack>
    )
}

export default OrdersByCategoryPie