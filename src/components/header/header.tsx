import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.MarketList}>
      <div className='container'>
        <Link to='/' style={{ textDecoration: 'none', color: '#ff6a95' }}>
          <h2>Buy or Fly</h2>
        </Link>
      </div>
    </header>
  )
};

export default Header;
