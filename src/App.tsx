import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import PizzaSceleton from './components/PizzaBlock/PizzaSceleton';
import Sort from './components/Sort';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export interface PizzaType {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
}

function App() {
  const [pizzas, setPizzas] = useState<PizzaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://62a8befbec36bf40bdad383f.mockapi.io/pizzas')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} pizzas={pizzas} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
