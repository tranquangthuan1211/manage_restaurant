import Testimonial from './components/Testimonial';
import Feature from './components/Feature';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full bg-[url('/images/homepage_bg.jpg')] bg-cover bg-center h-96">
        <div className="relative flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <div className="absolute inset-0 bg-black bg-opacity-30">
          </div>
          <div className="relative">
            <h1 className="text-3xl text-yellow-400 font-bold text-center">
              Welcome to Baby Hippo restaurant!!!
            </h1>
            <p className="text-green-400 text-3xl">
              Here we offer a variety of delicious dishes
            </p>
          </div>
        </div>
      </div>

      <div id="about"
      className="col-span-full bg-gray-600 text-white
      flex justify-center items-center p-2
      border-solid border-y-2 border-y-gray-700">About us</div>

      <div className="col-span-full bg-gray-600 grid grid-cols-12">
        <div className="col-span-5 p-2 text-white pl-10">
          <h2 className="uppercase text-yellow-400 text-lg my-1">Baby Hippo Restaurant</h2>
          <p className="my-1">
            VietNam
          </p>
          <p>
            Baby Hippo Restaurant, founded in 2024 by five IT students,
            offers a wide variety of food and beverages in a luxurious atmosphere.
            <br />
            With its elegant setting and reasonable prices,
            it has quickly become a favorite spot for both locals and visitors.
            <br />
            Whether you're craving Western or Vietnamese cuisine,
            Baby Hippo has something to satisfy every palate.
            It's not just a place to eat - it's an experience.
            <br />
            If you're traveling in Vietnam, this is definitely a destination worth visiting.
          </p>
        </div>
        <div className="col-span-7 grid grid-cols-2 gap-2 m-2">
          <div className="relative  flex justify-end items-end">
            <div className="w-32 h-32">
              <Image className="w-full h-full object-cover rounded-xl" src="/images/lemon_dessert_1.jpg" alt="lemon dessert" width={200} height={200} />
            </div>
          </div>
          <div className="relative top-2 flex justify-start items-end">
            <div className="w-32 h-32">
              <Image className="w-full h-full object-cover rounded-xl" src="/images/restaurant_1.jpg" alt="restaurant_1" width={200} height={200} />
            </div>
          </div>
          <div className="relative  flex justify-end items-start">
            <div className="w-32 h-32">
              <Image className="w-full h-full object-cover rounded-xl" src="/images/mario_and_adrian_b_1.jpg" alt="mario_and_adrian_b_1" width={200} height={200} />
            </div>
          </div>
          <div className="relative top-2 flex justify-start items-start">
            <div className="w-32 h-32">
              <Image className="w-full h-full object-cover rounded-xl" src="/images/restaurant_chef_b_1.jpg" alt="restaurant_chef_b_1" width={200} height={200} />
            </div>
          </div>
        </div>

        <hr className="col-span-full my-2 border-gray-700" />
        
        <div className="col-span-full grid grid-cols-5 text-white text-center mx-2 py-4 rounded-t-xl shadow-inner bg-gray-500">
          <Feature icon="/images/atmosphere.png" text="Best Atmosphere"></Feature>
          <Feature icon="/images/food.png" text="High food quality"></Feature>
          <Feature icon="/images/menu.png" text="Diverse menu"></Feature>
          <Feature icon="/images/budget.png" text="Healthy on a budget"></Feature>
          <Feature icon="/images/staff.png" text="Friendly staff"></Feature>
        </div>
        <div className="col-span-full text-white mx-2 pl-2 bg-gray-400">
          <h2 className="pl-6 mt-4">Testimonials</h2>
          <div className="flex justify-center">
            <Testimonial profile="/images/profiles/men1.png" name="Nam" review="Very good"></Testimonial>
            <Testimonial profile="/images/profiles/girl.png" name="Nhi" review="The food were tasty. I will go back again"></Testimonial>
            <Testimonial profile="/images/profiles/man_face_with_beard.png" name="John" review="Best experience in Vietnam"></Testimonial>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
