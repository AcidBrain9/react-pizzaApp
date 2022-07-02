import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';

import { PizzaType } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';
import SearchPizza from '../components/Search';
import Sort from '../components/Sort';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { setFilters } from '../redux/slices/filterSlice';

type Props = {};

const Home: FC<Props> = () => {
  const store = useAppSelector((store) => store.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pizzas, setPizzas] = useState<PizzaType[]>([]);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = store.categoryId > 0 ? `category=${store.categoryId}` : ``;
    const searchFetch = store.search ? `&search=${store.search}` : '';

    axios
      .get(
        `https://62a8befbec36bf40bdad383f.mockapi.io/pizzas?page=${store.currentPage}&limit=4&${category}&sortBy=${store.sortType.sortProperty}${searchFetch}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [store.categoryId, store.sortType, store.search, store.currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: store.sortType,
        categoryId: store.categoryId,
        currentPage: store.currentPage,
        search: store.search,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [store.categoryId, store.sortType, store.search, store.currentPage]);

  return (
    <div className="container">
      <SearchPizza />
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <PizzaSceleton key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
