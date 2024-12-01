import React, { useContext, useEffect } from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocallStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app,.context'
function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocallStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocallStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
