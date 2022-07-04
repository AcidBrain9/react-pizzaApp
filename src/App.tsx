import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza"*/ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="/react-pizzaApp/" element={<Navigate to="/" />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
