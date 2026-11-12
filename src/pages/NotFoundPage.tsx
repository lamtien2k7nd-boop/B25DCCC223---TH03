import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 – Không tìm thấy trang</h1>
      <Link to="/" className="btn btn-primary">Về trang chủ</Link>
    </section>
  );
}
