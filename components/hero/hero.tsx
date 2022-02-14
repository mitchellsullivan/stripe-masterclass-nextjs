import classes from './hero.module.scss';

const Hero = () => {
  return (
    <section className={`hero is-info is-large ${classes.heroImage}`}>
      <div className={"hero-body"}>
        <div className="container">
          <h1 className={classes.heroTitle}>
            Bags reimagined for modern life.
          </h1>
          <div className={classes.shopNowBtn}>
            <button className='button is-black' id='shop-now'>
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
