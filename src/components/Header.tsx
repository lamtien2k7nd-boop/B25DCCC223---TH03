import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartCount } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const count = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">ShopMini</Link>
      <nav className="header-actions">
        <button type="button" className="btn btn-ghost" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
        </button>
        <Link to="/cart" className="btn btn-ghost">Giỏ hàng ({count})</Link>
        {user ? (
          <>
            <span className="username">Xin chào, {user.username}</span>
            <button type="button" className="btn" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login" className="btn">Đăng nhập</Link>
        )}
      </nav>
    </header>
  );
}
