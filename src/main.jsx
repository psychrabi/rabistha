import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import { router } from './router/router'
import Loading from './components/Loading'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router}/>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
