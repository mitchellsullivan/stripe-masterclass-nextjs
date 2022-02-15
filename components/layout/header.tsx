import Link from "next/link";

import CartIcon from '../cart-icon/cart-icon';
import classes from './header.module.scss';
import {FC} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../../context/auth-context";

const Header: FC = () => {
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();

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
        {
          !user &&
            <li>
                <Link href={"/sign-in"}>
                    Sign In
                </Link>
            </li>
        }
        {
          !user &&
            <li>
                <Link href={"/sign-up"}>
                    Sign Up
                </Link>
            </li>
        }
        {
          user &&
            <li onClick={() => signOut()}>
                Sign Out
            </li>
        }
      </ul>
      <CartIcon />
    </nav>
  );
}

export default Header;
