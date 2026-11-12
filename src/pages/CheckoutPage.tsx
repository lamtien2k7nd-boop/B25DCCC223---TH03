import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const { user } = useAuth();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section>
        <p className="success">Đặt hàng thành công! Cảm ơn {user?.username}.</p>
        <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <p>
        Không có gì để thanh toán. <Link to="/">Chọn sản phẩm</Link>
      </p>
    );
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>Người đặt: <strong>{user?.username}</strong></p>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.title} × {i.quantity} — ${(i.price * i.quantity).toFixed(2)}</li>
        ))}
      </ul>
      <p className="total">Tổng tiền: ${total.toFixed(2)}</p>
      <button type="button" className="btn btn-primary" onClick={handleOrder}>Đặt hàng</button>
    </section>
  );
}
