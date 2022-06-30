import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

interface AppContextItfs {
  search: string;
  setSearch: (title: string) => void;
}
export const AppContext = createContext<AppContextItfs>({} as AppContextItfs);

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
  const [search, setSearch] = useState('');
  return (
    <AppContext.Provider value={{ search, setSearch }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
