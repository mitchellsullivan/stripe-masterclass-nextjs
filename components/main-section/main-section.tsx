import Image from "next/image";
// import { withRouter } from 'react-router-dom';

import classes from './main-section.module.scss';

const MainSection = (props) => {
  return (
    <div className={classes.mainSectionContainer}>
      <div className={classes.mainSectionMiddle}>
        <div className={classes.msMImage}>
          <img src={"/images/studio-bag.png"} alt='studio bag'/>
        </div>
        <div className={classes.msMDescription}>
          <h2>Designed for fashion. Crafted for sport.</h2>
          <p>
          We make products that effortlessly transition from day to night.
            From the board room to the fitness studio, and everywhere in between,
            each Nomads piece is thoughtfully created to be the perfect balance of
            form and function.
          </p>
          <button className='button is-black' id='shop-now'>
            STUDIO BAG
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
