import Features from '../componants/Features';
import Footer from '../componants/Footer';
import Hero from '../componants/Hero';
import Navbar from '../componants/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
