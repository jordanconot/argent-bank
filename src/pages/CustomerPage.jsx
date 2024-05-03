import Account from '../componants/Account';
import Footer from '../componants/Footer';
import Navbar from '../componants/Navbar';

const CustomerPage = () => {
  return (
    <>
      <Navbar isPageCustomer />
      <Account />
      <Footer />
    </>
  );
};

export default CustomerPage;
