import Testimonial from 'src/pages/customer/Testimonial'
import RootLayout from 'src/layouts/customer/layout';

const HomePage = () => {
  return (
    <RootLayout>
    <div>
      <Testimonial name="Anna" stars={4}>
        <div>
          <p>"It's good!"</p>
          <p>This additional content is passed as children.</p>
        </div>
      </Testimonial>
    </div>
    </RootLayout>

  );
};

export default HomePage;