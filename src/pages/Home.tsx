import React, { FC } from 'react';
import { PizzaType } from '../App';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';
import Sort from '../components/Sort';

type Props = {
  isLoading: boolean;
  pizzas: PizzaType[];
};

const Home: FC<Props> = ({ isLoading, pizzas }) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaSceleton key={i} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
