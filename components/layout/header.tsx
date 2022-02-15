import Link from "next/link";

import CartIcon from '../cart-icon/cart-icon';
import classes from './header.module.scss';
import {FC} from "react";
import {useSession, signIn, signOut } from "next-auth/react";
import {useRouter} from "next/router";

const Header: FC = () => {
  const { data: session } = useSession();
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
          !session &&
            <li onClick={() => signIn("auth0")}>
                Sign In
            </li>
        }
        {
          session &&
            <li onClick={() => signOut({
              callbackUrl: "/api/auth/logout-auth0",
            })}>
                Sign Out
            </li>
        }
      </ul>
      <CartIcon />
    </nav>
  );
}

export default Header;
