import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/thunkFunctions";

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

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">나의 장바구니</h2>
      </div>

      {Array.isArray(cartDetail) && cartDetail.length > 0 ? (
        <>
          <div className="mt-10">
            <p>
              <span className="font-bold">합계:</span> {total} 원
            </p>
            <button className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">
              결제하기
            </button>
          </div>
        </>
      ) : (
        <p>장바구니가 비었습니다.</p>
      )}
    </section>
  );
};
export default CartPage;
