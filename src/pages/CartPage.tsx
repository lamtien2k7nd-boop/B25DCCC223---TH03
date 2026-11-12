import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <p>
        Giỏ hàng trống. <Link to="/">Chọn sản phẩm</Link>
      </p>
    );
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <ul className="cart-list">
        {items.map((i) => (
          <li key={i.id} className="cart-item">
            <img src={i.image} alt={i.title} />
            <div className="cart-info">
              <Link to={`/products/${i.id}`}>{i.title}</Link>
              <span className="price">${i.price.toFixed(2)}</span>
            </div>
            <div className="qty">
              <button type="button" className="btn" onClick={() => dispatch(updateQuantity({ id: i.id, quantity: i.quantity - 1 }))}>−</button>
              <span>{i.quantity}</span>
              <button type="button" className="btn" onClick={() => dispatch(updateQuantity({ id: i.id, quantity: i.quantity + 1 }))}>+</button>
            </div>
            <strong>${(i.price * i.quantity).toFixed(2)}</strong>
            <button type="button" className="btn" onClick={() => dispatch(removeFromCart(i.id))}>Xoá</button>
          </li>
        ))}
      </ul>
      <p className="total">Tổng tiền: ${total.toFixed(2)}</p>
      <button type="button" className="btn" onClick={() => dispatch(clearCart())}>Xoá giỏ hàng</button>{' '}
      <Link to="/checkout" className="btn btn-primary">Thanh toán</Link>
    </section>
  );
}
