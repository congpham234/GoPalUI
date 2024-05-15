import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.scss';
import { FiDollarSign } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';

interface Item {
  image: string;
  name: string;
  rating: number;
  reviews: string;
  price: string;
  distance: string;
}

const data: Item[] = [
  {
    image:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1',
    name: 'Ameritania at Times Square',
    rating: 8.9,
    reviews: '1,681 reviews',
    price: 'From 416 CAD per night',
    distance: '0.5km from centre',
  },
  {
    image:
      'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg',
    name: 'NH Collection Madison',
    rating: 8.6,
    reviews: '3,989 reviews',
    price: 'From 581 CAD per night',
    distance: '1km from centre',
  },
  {
    image:
      'https://www.belroy.es/wp-content/uploads/sites/1658/nggallery/content//header-home-mobile.jpg',
    name: 'Royal York Centre',
    rating: 8.5,
    reviews: '1,279 reviews',
    price: 'From 479 CAD per night',
    distance: '0.2km from centre',
  },
];

interface CarouselProps {
  items: Item[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    // slidesToShow: 1.2,
    // slidesToScroll: 1,
    rows: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          // initialSlide: 2
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="Carousel">
      {items.map((item, index) => (
        <div className="CarouselCard" key={index}>
          <div className="Photo">
            <img src={item.image} alt={item.name} />
          </div>
          <h3>{item.name}</h3>
          <div className="Review">
            <div className="Rating">{item.rating}</div>
            <p>{item.reviews}</p>
          </div>
          <div className="Price">
            <FiDollarSign />
            <p>{item.price}</p>
          </div>
          <div className="Distance">
            <FiMapPin />
            <p>{item.distance}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Carousel items={data} />
    </div>
  );
};

export default App;
