import Link from "next/link";

import CartIcon from '../cart-icon/cart-icon';
import classes from './header.module.scss';
import {FC, useContext} from "react";
import {CartContext} from "../../context/cart-context";

const Header: FC = () => {
  const {itemCount} = useContext(CartContext);

  return (
    <nav className={`${classes.navMenu} container`}>
      <div className={classes.logo}>
        <Link href='/'>NOMAD</Link>
      </div>
      <ul>
        <li>
          <Link href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/shop'>
            Shop
          </Link>
        </li>
      </ul>
      <CartIcon itemCount={itemCount} />
    </nav>
  );
}

export default Header;
