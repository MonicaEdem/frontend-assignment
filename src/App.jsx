import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProductForm from './pages/AddProduct';
import ProductList from './components/productsList';
import DashboardLayout from './pages/dashboard/DahboardLayout';
import EditProductForm from './pages/EditProduct'; // import your edit form

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout />, // Layout with ControlBar
      children: [
        {
          index: true,
          element: <ProductList />, // Shows ControlBar + ProductList
        },
      ],
    },
    {
      path: '/add-product',
      element: <ProductForm />, // Standalone (no ControlBar)
    },
    {
      path: '/edit-product/:id',
      element: <EditProductForm />, // Standalone (no ControlBar)
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
