import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { menu_list } from "../assets/assets";
import Menu_Card from "../components/Menu_Card";
import Food_Card from "../components/Food_Card";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Home = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food/getFood");
        setFoodData(res.data.food);
      } catch (error) {
         alert(error);
      }
    };
    fetchData()
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="m-10 mt-20">
        <Hero />
      </div>

      {/* Menu Section */}
      <section id="menu" className="mt-16 px-10">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
          data-aos="fade-up"
        >
          🍽️ Explore Our Menu
        </h2>

        <div className="w-full overflow-x-auto scroll-smooth">
          <div className="flex w-max gap-8">
            {menu_list.map((menu, idx) => (
              <Menu_Card key={idx} menu={menu} />
            ))}
          </div>
        </div>
      </section>

      {/* Food List Section */}
      <section className="mt-20 px-10">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
          data-aos="fade-up"
        >
          🍕 Popular Dishes
        </h2>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          data-aos="fade-up"
        >
          {foodData.map((food, idx) => (
            <Food_Card key={idx} food={food} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
