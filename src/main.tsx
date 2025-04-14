import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DisplayImages from './components/DisplayImages.tsx'
import ImageDetail from './components/ImageDetail.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DisplayImages/>,
  },
  {
    path: "/image-detail/:id",
    element: <ImageDetail/>
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
