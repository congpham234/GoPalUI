import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HotelCarousel.scss';
import { FiDollarSign } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import { formatNumberWithCommas, formatPrice } from 'utils/NumberUtils';

interface Item {
  name: string;
  imageUrl1024x768?: string;
  reviewScore?: number;
  reviewCount?: number;
  suggestedPrice?: number;
  currency?: string;
  distanceFromCenter?: string;
}

interface HotelCarouselProps {
  items: Item[];
}

function HotelCarousel(props: HotelCarouselProps) {
  const { items } = props;
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
        breakpoint: 1920,
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
    <div className="WhereToStay">
      <h2>Where to stay</h2>
      <Slider {...settings} className="Carousel">
        {items.map((item, index) => (
          <div className="CarouselCard" key={index}>
            <div className="Photo">
              <img src={item.imageUrl1024x768} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <div className="Review">
              <div className="Rating">{item.reviewScore}</div>
              <p>{formatNumberWithCommas(item.reviewCount ?? 0)} reviews</p>
            </div>
            <div className="Price">
              <FiDollarSign />
              <p>
                {formatPrice(item.suggestedPrice ?? 0)} {item.currency}
              </p>
            </div>
            {item.distanceFromCenter && (
              <div className="Distance">
                <FiMapPin />
                <p>{item.distanceFromCenter}</p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HotelCarousel;
