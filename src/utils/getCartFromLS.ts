const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : { totalPrice: 0, items: [] };
};

export default getCartFromLS;
