import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';
import SearchPizza from '../components/Search';
import Sort from '../components/Sort';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzasAction } from '../redux/slices/pizzasSlice';

type Props = {};

const Home: FC<Props> = () => {
  const filter = useAppSelector((store) => store.filter);
  const pizzas = useAppSelector((store) => store.pizzas);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = async () => {
    const category = filter.categoryId > 0 ? `category=${filter.categoryId}` : ``;
    const searchFetch = filter.search ? `&search=${filter.search}` : '';
    dispatch(
      fetchPizzasAction({
        category,
        searchFetch,
        currentPage: filter.currentPage,
        sortProperty: filter.sortType.sortProperty,
      }),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [filter.categoryId, filter.sortType, filter.search, filter.currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: filter.sortType,
        categoryId: filter.categoryId,
        currentPage: filter.currentPage,
        search: filter.search,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [filter.categoryId, filter.sortType, filter.search, filter.currentPage]);

  const pizzaBlocks = pizzas.pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(8)].map((_, i) => <PizzaSceleton key={i} />);

  return (
    <div className="container">
      <SearchPizza />
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      {pizzas.status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка сервера <i>😕</i>
          </h2>
          <p>
            Мы пытаемя всё исправить.
            <br />
            Попробуйте перезагрузить или повторите попытку через 2 минуты.
          </p>
        </div>
      ) : (
        <>
          {' '}
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.status === 'loading' ? sceletons : pizzaBlocks}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Home;
