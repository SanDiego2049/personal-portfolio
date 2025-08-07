import Services from "../components/Services";
import Hero from "../components/Hero";
import LatestProjects from "../components/LatestProjects";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <section className="bg-white text-gray-800 dark:bg-black dark:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <LatestProjects />
      <Contact />
      <Footer />
    </section>
  );
};

export default Home;
