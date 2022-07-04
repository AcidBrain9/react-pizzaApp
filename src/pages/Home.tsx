import { FC, useEffect, useRef } from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';

import {
  Categories,
  Pagination,
  PizzaBlock,
  PizzaSceleton,
  SearchPizza,
  Sort,
} from '../components';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import {
  getFilterCategoryIdSelector,
  getFilterCurrentPageSelector,
  getFilterSearchSelector,
  getFilterSortTypeSelector,
} from '../redux/slices/filter/selecors';
import { getPizzasSelector } from '../redux/slices/pizzas/selecors';
import { fetchPizzasAction } from '../redux/slices/pizzas/slice';
import { FilterStateType } from '../redux/slices/filter/types';
import { setFilters } from '../redux/slices/filter/slice';

const Home: FC = () => {
  const navigate = useNavigate();

  const search = useAppSelector(getFilterSearchSelector);
  const categoryId = useAppSelector(getFilterCategoryIdSelector);
  const sortType = useAppSelector(getFilterSortTypeSelector);
  const currentPage = useAppSelector(getFilterCurrentPageSelector);

  const pizzas = useAppSelector(getPizzasSelector);
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const searchFetch = search ? `&search=${search}` : '';
    dispatch(
      fetchPizzasAction({
        category,
        searchFetch,
        currentPage: currentPage,
        sortProperty: sortType.sortProperty,
      }),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterStateType;

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, search, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId: categoryId,
        currentPage: currentPage,
        search: search,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, search, currentPage]);

  const pizzaBlocks = pizzas.pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(8)].map((_, i) => <PizzaSceleton key={i} />);

  return (
    <div className="container">
      <SearchPizza search={search} />
      <div className="content__top">
        <Categories categoryId={categoryId} />
        <Sort sortType={sortType} />
      </div>

      {pizzas.status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка сервера 😕</h2>
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
