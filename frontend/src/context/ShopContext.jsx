import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const ShopContextProvider = (props) => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ email: "" });
  const currency = "₹";

  const addToCart = async (itemId) => {
    setCartItems((prev = {}) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Failed to add to cart:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev = {}) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Failed to remove from cart:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    if (!cartItems || typeof cartItems !== "object") return 0;

    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.warn(`Item with ID ${itemId} not found in food_list`);
        }
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    if (!cartItems || typeof cartItems !== "object") return 0;

    let count = 0;
    for (let key in cartItems) {
      count += cartItems[key];
    }
    return count;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const foodData = response.data.data;

      // No need to modify image URLs anymore, they are already full URLs from Cloudinary
      setFoodList(foodData);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const localToken = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
      if (email) {
        setUser({ email });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    getCartCount,
    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ShopContextProvider;
