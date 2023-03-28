import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./imgCarousel.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ImgCarousel({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="carousel_container">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction={"vertical"}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map(e => (
          <SwiperSlide>
            <img src={e} />
          </SwiperSlide>
        ))}       
      </Swiper>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map(e => (
          <SwiperSlide>
            <img src={e} />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
