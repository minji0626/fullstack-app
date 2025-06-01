import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem } from "../../store/thunkFunctions";
import CartTable from "../CartPage/Sections/CartTable"

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);

  console.log(cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userData?.cart?.length > 0) {
      const cartItemIds = userData.cart.map((item) => item.id);
      dispatch(getCartItems({ cartItemIds, userCart: userData.cart }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (Array.isArray(cartDetail)) {
      calculateTotal(cartDetail);
    }
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    if (!Array.isArray(cartItems)) return;

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId))
  }

return (
  <section className="max-w-4xl mx-auto p-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold">🛒 장바구니</h2>
    </div>

    {Array.isArray(cartDetail) && cartDetail.length > 0 ? (
      <>
        <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />

        <div className="mt-10 flex flex-col items-end">
          <div className="p-4 bg-gray-100 rounded shadow w-full sm:w-[300px] flex items-center justify-between">
            <p className="text-[1rem]">
              <span className="font-bold">총 금액 :</span> {total.toLocaleString()} 원
            </p>
            <button className="w-[100px] px-4 py-2 text-white bg-black rounded hover:bg-gray-700 cursor-pointer transition">
              결제하기
            </button>
          </div>
        </div>
      </>
    ) : (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-xl">🛍️ 장바구니가 비었습니다.</p>
      </div>
    )}
  </section>
)

};
export default CartPage;
