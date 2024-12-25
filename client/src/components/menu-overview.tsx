import React, { useState, useEffect } from "react";
import RootLayout from "src/layouts/customer/layout";

const cuisines = [
  // List of cuisines with titles, descriptions, and dish images
  {
    title: "Western cuisine",
    description:
      "Our restaurant is a perfect place for you to enjoy a delicious western-style meal with your family and friends.",
    mainDish: "/images/dish_1.jpg",
    smallerDishes: ["/images/dish_2.jpg", "/images/dish_3.jpg", "/images/dish_4.jpg"],
  },
  {
    title: "Vietnam cuisine",
    description:
      "Experience the authentic flavors of Vietnam with our expertly crafted dishes, combining tradition and creativity for a delightful culinary journey.",
    mainDish: "/images/dish_2.jpg",
    smallerDishes: ["/images/dish_1.jpg", "/images/dish_3.jpg", "/images/dish_4.jpg"],
  },
  {
    title: "Desserts",
    description:
      "Indulge in our exquisite selection of desserts, where every bite is a celebration of sweetness and artistry.",
    mainDish: "/images/dish_3.jpg",
    smallerDishes: ["/images/dish_1.jpg", "/images/dish_2.jpg", "/images/dish_4.jpg"],
  },
  {
    title: "Refreshing drinks",
    description:
      "Quench your thirst with our refreshing drinks, perfectly crafted to complement your dining experience.",
    mainDish: "/images/dish_4.jpg",
    smallerDishes: ["/images/dish_1.jpg", "/images/dish_2.jpg", "/images/dish_3.jpg"],
  },
];

const MenuOverview = () => {
  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);
  const [fade, setFade] = useState(false); // Track fade-in/out state
  const DISPLAY_INTERVAL = 3000;
  const FADE_DURATION = 500;
  const FADE_OFFSET = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fading out
      setTimeout(() => {
        setCurrentCuisineIndex((prevIndex) => (prevIndex + 1) % cuisines.length);
      }, FADE_DURATION); // Matches fade-out duration
      setTimeout(() => setFade(false), FADE_DURATION + FADE_OFFSET); // Slightly after fade-out
    }, DISPLAY_INTERVAL + FADE_DURATION); // Total delay = fade durations + display time

    return () => clearInterval(interval);
  }, []);

  const currentCuisine = cuisines[currentCuisineIndex];

  return (
    <div>
      {/* Hero Start */}
      <div className="col-span-full bg-[url('/images/customer_bg2.jpg')] lg:bg-[url('/images/customer_bg1.jpg')] bg-cover bg-center h-[36rem] grid grid-cols-12">
        {/* Left Panel: Title and Description */}
        <div className="col-span-full order-last lg:order-first lg:col-span-6 pl-10 flex flex-col justify-center items-start">
          <p
            className={`font-[Satisfy] text-6xl mb-4 transition-opacity duration-${FADE_DURATION} ${fade ? "opacity-0" : "opacity-100"}`}
            key={currentCuisine.title}
          >
            {currentCuisine.title}
          </p>
          <p
            className={`text-xl mb-10 transition-opacity duration-${FADE_DURATION} ${fade ? "opacity-0" : "opacity-100"}`}
            key={currentCuisine.description}
          >
            {currentCuisine.description}
          </p>
        </div>

        {/* Right Panel: Main and Smaller Dishes */}
        <div className="col-span-full lg:col-span-6 flex justify-center lg:justify-start px-8 lg:pl-8 items-center">
          <div className="relative w-full h-56 lg:w-96 lg:h-96">
            {/* Main Dish */}
            <img
              className={`object-center object-cover w-full h-full transition-all duration-${FADE_DURATION} ${fade ? "opacity-0 scale-90" : "opacity-100 scale-100"
                } ${
                // Rectangular on <= lg, circular on > lg
                "rounded-md lg:rounded-full lg:p-10"
                }`}
              src={currentCuisine.mainDish}
              key={currentCuisine.mainDish}
              alt="Main Dish"
            />
            {/* Smaller Dishes */}
            <div className="hidden lg:block">
              {currentCuisine.smallerDishes.map((dish, index) => {
                const totalDishes = currentCuisine.smallerDishes.length;
                const angle = 120 + 30 * index;
                const radius = 12; // Radius of the circle (rem)
                const centerX = "50%"; // Horizontal center of the main dish
                const centerY = "50%"; // Vertical center of the main dish

                const xPosition = `calc(${centerX} + ${radius * Math.cos((-angle * Math.PI) / 180)}rem)`;
                const yPosition = `calc(${centerY} + ${radius * Math.sin((-angle * Math.PI) / 180)}rem)`;

                return (
                  <img
                    key={dish}
                    className={`absolute w-16 h-16 rounded-full object-cover transition-opacity duration-${FADE_DURATION} ${fade ? "opacity-0" : "opacity-100"
                      }`}
                    src={dish}
                    alt={`Smaller Dish ${index + 1}`}
                    style={{
                      top: yPosition,
                      left: xPosition,
                      transform: "translate(-50%, -50%)", // Adjust for exact centering
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
      {/* Hero End */}
    </div>
  );
};


export default MenuOverview;

