import React from 'react';
import CategoriesTable from './categoriesTable/CategoriesTable';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../features/products/productsSlice';



const categories = [{
    title: 'laptops'
},
{
    title: 'phones'
},
{
    title: 'desktops'
},
{
    title: 'printers'
},
{
    title: 'accessories'
},
]
const CategoriesManagement = () => {
    const allproducts = useSelector(selectProducts)
    const categoriesStats = categories.map( (category) => {
        return {
            title:category.title,
            products: allproducts.filter(product => product.category == category.title).length
        }
    })

    return (
            <CategoriesTable categories={categoriesStats}/>
    )
}

export default CategoriesManagement