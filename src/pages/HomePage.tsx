import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return k ? items.filter((p) => p.title.toLowerCase().includes(k)) : items;
  }, [items, keyword]);

  return (
    <section>
      <input
        className="search"
        type="search"
        placeholder="Tìm sản phẩm theo tên..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {status === 'loading' && <p>Đang tải sản phẩm...</p>}
      {status === 'failed' && (
        <p className="error">
          {error} <button type="button" className="btn" onClick={() => void dispatch(fetchProducts())}>Thử lại</button>
        </p>
      )}
      {status === 'succeeded' && filtered.length === 0 && <p>Không có sản phẩm nào khớp “{keyword}”.</p>}
      <div className="grid">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
