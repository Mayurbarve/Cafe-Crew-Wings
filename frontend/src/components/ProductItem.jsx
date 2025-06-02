import React, { useContext } from 'react';
import { StoreContext } from '../context/ShopContext'; // Note: Keep the file name as it is, unless you rename it
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(StoreContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          src={image}
          className="object-cover w-full h-96 hover:scale-110 transition ease-in-out"
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
