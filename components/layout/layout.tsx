import Header from './header';
import Footer from './footer';
import {Fragment} from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
        <main>
          {
            children
          }
        </main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
