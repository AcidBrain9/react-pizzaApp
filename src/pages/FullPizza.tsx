import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PizzaType } from '../redux/slices/pizzas/types';

const FullPizza: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pizza, setPizza] = useState<PizzaType>({} as PizzaType);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62a8befbec36bf40bdad383f.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
        setLoading(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          navigate('/');
        } else {
          console.log('unexpected error: ', error);
          navigate('/');
        }
      }
    }

    fetchPizza();
  }, []);

  if (!loading) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <img src={pizza.imageUrl} alt={pizza.title} style={{ width: '300px' }} />
      <h2>{pizza.title}</h2>
      <h3>Стоимость: от {pizza.price} руб.</h3>

      <Link to="/" className="button  button--add go-back-btn">
        <span>Назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
