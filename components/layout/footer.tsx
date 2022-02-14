import classes from './footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.footer}>
      {year} © NOMAD Store
    </div>
  );
}

export default Footer;
