import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);
  const product = items.find((p) => p.id === Number(id));

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === 'idle' || status === 'loading') return <p>Đang tải sản phẩm...</p>;
  if (!product) {
    return (
      <p>
        Không tìm thấy sản phẩm. <Link to="/">Về trang chủ</Link>
      </p>
    );
  }

  return (
    <section className="detail">
      <img src={product.image} alt={product.title} className="detail-img" />
      <div>
        <h1>{product.title}</h1>
        <p className="muted">{product.category}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button type="button" className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
          Thêm vào giỏ
        </button>{' '}
        <Link to="/" className="btn">Quay lại</Link>
      </div>
    </section>
  );
}
