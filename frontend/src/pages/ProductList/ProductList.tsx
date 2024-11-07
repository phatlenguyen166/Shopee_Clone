import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import AsideFilter from './components/AsideFilter'

import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
import Pagination from '../../Components/Pagination'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.api'
import SortProductList from './components/SortProductList'
import Product from './components/Product'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProdctList() {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )
  // const [page, setPage] = useState(1)
  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams as ProductListConfig),
    placeholderData: keepPreviousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
    placeholderData: keepPreviousData
  })
  // console.log(categoriesData)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              {categoriesData && <AsideFilter queryConfig={queryConfig} categories={categoriesData.data.data} />}
            </div>
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData &&
                  productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
