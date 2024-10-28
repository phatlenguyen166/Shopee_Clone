import { useContext } from 'react'
import { AppContext } from '../../contexts/app,.context'

export default function ProdctList() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)

  return <div className='flex h-10 w-10 flex-col text-red-400'>ProdctList</div>
}
