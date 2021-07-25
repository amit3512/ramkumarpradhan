// import React, { Component } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import logo1 from '../assets/pp1.jpg';
// import logo2 from '../assets/pp2.jpg';
// import logo3 from '../assets/pp3.jpg';

// export default class Testimonials extends Component {
//   render() {
//     return (
//       <div className="container">
//                         <Carousel
//                         showArrows={true}
//                         showItems={2}
//                         infiniteLoop={true}
//                         showThumbs={false}
//                         showStatus={false}
//                         autoPlay={true}
//                         interval={1500}
//                         >
//                             <div>
//                               <img src={logo1} alt="logo1"/>
//                               <div className="myCarousel">
//                                   <h3>Shirley Fultz</h3>
//                                   <h4>Designer</h4>
//                                   <p>
//                                     It's freeing to be able to catch up on customized news and not be
//                                     distracted by a social media element on the same site
//                                   </p>
//                               </div>
//                             </div>
//                             <div>
//                               <img src={logo2} alt="logo2"/>
//                               <div className="myCarousel">
//                                 <h3>Daniel Keystone</h3>
//                                 <h4>Designer</h4>
//                                 <p>
//                                   The simple and intuitive design makes it easy for me use. I highly
//                                   recommend Fetch to my peers.
//                                 </p>
//                               </div>
//                             </div>
//                             <div>
//                               <img src={logo3} alt="logo3"/>
//                               <div className="myCarousel">
//                                 <h3>Theo Sorel</h3>
//                                 <h4>Designer</h4>
//                                 <p>
//                                   I enjoy catching up with Fetch on my laptop, or on my phone when
//                                   I'm on the go!
//                                 </p>
//                               </div>
//                             </div>
//                          </Carousel>
//       </div>
      
//     );
//   }
// }

import React from "react";
import logo from '../assets/pp1.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import "./styles.css";


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);


export default function App() {
  
  
  
  return (
    <>
    
     <div className="container">
     <h5 className="text-center mt-3 bg-light">हाम्रा शब्दहरु</h5>
     <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper">
       
       <SwiperSlide>
        
                  <img src={logo} alt="staff1" style={{width:"1200"}}/> 
                  <p>
                     उहाको भनाई | उअस्द्गु  औस्दुओ अस्दुओ अदोअस्ग |अदास्ध अस्द्झ्झास्द जस्ध अज्स्धस्द्ज झास्द 
                 </p>
            
           
     
       </SwiperSlide>
       
   </Swiper>
     </div>
  
    </>
  )
}