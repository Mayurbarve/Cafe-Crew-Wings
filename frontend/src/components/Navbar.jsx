import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(StoreContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='relative z-50 bg-gray-100 rounded-b-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-5 shadow-sm flex items-center justify-between font-medium'>
      {/* Logo */}
      <Link to='/'>
        <img src={assets.crew1} className='w-40 sm:w-52 md:w-64' alt='Cafe Logo' />
      </Link>

      {/* Desktop Nav */}
      <ul className='hidden sm:flex gap-6 text-sm text-gray-700 items-center'>
        {['/', '/collection', '/about', '/contact'].map((path, i) => {
          const label = ['HOME', 'MENU', 'ABOUT', 'CONTACT'][i];
          return (
            <NavLink
              key={label}
              to={path}
              className='flex flex-col items-center gap-1 hover:text-black transition'
            >
              <p>{label}</p>
              <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden group-hover:block' />
            </NavLink>
          );
        })}
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-5'>
        {/* Orders */}
        <Link to='/orders' className='relative'>
          <img src={assets.order_icon} className='w-5 min-w-5' alt='Orders' />
        </Link>

        {/* Profile Dropdown */}
        <div className='group relative'>
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            className='w-5 cursor-pointer'
            alt='Profile'
          />
          {token && (
            <div className='hidden group-hover:block absolute right-0 top-6 w-36 py-3 px-4 bg-slate-100 text-gray-600 rounded shadow-md z-50'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
          <p className='absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px] leading-none'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu Icon (Mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-6 cursor-pointer sm:hidden'
          alt='Menu'
        />
      </div>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white z-50 transform transition-transform duration-300 ${visible ? 'translate-x-0 w-3/4' : 'translate-x-full w-0'} overflow-hidden shadow-lg`}>
        <div className='flex flex-col h-full text-gray-700 pt-6'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-4 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back' />
            <p className='text-sm'>Back</p>
          </div>
          {['HOME', 'MENU', 'ABOUT', 'CONTACT'].map((label, i) => (
            <NavLink
              key={label}
              to={['/', '/collection', '/about', '/contact'][i]}
              onClick={() => setVisible(false)}
              className='py-3 px-6 border-b text-sm hover:bg-gray-100'
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
