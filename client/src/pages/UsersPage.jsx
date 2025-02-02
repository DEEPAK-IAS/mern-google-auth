import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '../styles/UsersPage.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/user/all", { method: "GET" });
        const data = await res.json();
        console.log(data);
        if (data.success === true) {
          setUsers(data.data.users);
          setBackgroundImage(data.data.users[0]?.avatar || "default.jpg"); // Set initial background safely
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleBackground = (user) => {
    setBackgroundImage(user.avatar);
  };

  const handleEdit = (user) => {

  } 

  const handleBlock = async (user) => {
    try {
      const res = await fetch(`/api/v1/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isBlocked: !user.isBlocked
        })
      });

      const data = await res.json();
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === user._id ? { ...u, isBlocked: data.data.user.isBlocked } : u
        )
      );


    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <div 
        className="background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.5
        }}
      />
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => setBackgroundImage(users[swiper.activeIndex]?.avatar || "default.jpg")}
      >
        {users.map((user, index) => (
          <SwiperSlide 
            key={index} 
            className='userSlide'
            onClick={() => handleBackground(user)} // Fixed the onClick function
          >
            <div className="userCard">
              <img src={user.avatar} alt="user-image" className='userImage'/>
              <p className='userName'>{user.username}</p>
              <div className="btn-container">
                <button 
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleBlock(user)}
                >
                  Block
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
