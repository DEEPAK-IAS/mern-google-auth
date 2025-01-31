import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "../styles/UsersPage.css";
import { EffectCards } from "swiper/modules";

const users = [
  { id: 1, name: "Alice Johnson", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "John Doe", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Emma Smith", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Michael Brown", image: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Sophie Turner", image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: 6, name: "James Lee", image: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 7, name: "Olivia Harris", image: "https://randomuser.me/api/portraits/women/5.jpg" },
  { id: 8, name: "David White", image: "https://randomuser.me/api/portraits/men/6.jpg" },
  { id: 9, name: "Sophia Brown", image: "https://randomuser.me/api/portraits/women/6.jpg" },
];

export default function App() {
  const [bgImage, setBgImage] = useState(users[0].image); 

  return (
    <>
      <div
        className="background"
        style={{
          backgroundImage: `url(${bgImage})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // width: "100%",
          // height: "92.5vh",
          // transition: "background 0.5s ease-in-out",
          zIndex: -1,
        }}
      />
      
      <div className="content">
        <h1>Meet Our Users</h1>

        
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
          onSlideChange={(swiper) => setBgImage(users[swiper.activeIndex].image)}
          slidesPerView={1} 
          centeredSlides={true} 
        >
          {users.map((user) => (
            <SwiperSlide key={user.id}>
              <div className="user-card">
                <img src={user.image} alt={user.name} />
                <h3>{user.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}