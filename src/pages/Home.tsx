import { FC, useContext, useEffect, useState } from 'react';

import { AppContext, PizzaType } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';
import SearchPizza from '../components/Search';
import Sort from '../components/Sort';

type Props = {};

const Home: FC<Props> = () => {
  const { search } = useContext(AppContext);

  const [pizzas, setPizzas] = useState<PizzaType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating&order=desc',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const searchFetch = search ? `&search=${search}` : '';

    fetch(
      `https://62a8befbec36bf40bdad383f.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}${searchFetch}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, search, currentPage]);

  return (
    <div className="container">
      <SearchPizza />
      <div className="content__top">
        <Categories setCategory={(i) => setCategoryId(i)} activeCategory={categoryId} />
        <Sort setSort={(i) => setSortType(i)} sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <PizzaSceleton key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
