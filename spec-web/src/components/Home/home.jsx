import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaArrowUpRightFromSquare, FaWhatsapp } from "react-icons/fa6";
import { PiHandshakeFill } from "react-icons/pi";
import ImageCarousel from './imageCarousel';
import "./home.css";
import App from "../../App";
import logo from '../../assets/specmainpic.jpeg';
import galleryPic1 from '../../assets/spec01.jpg';
import galleryPic2 from '../../assets/spec02.jpg';
import galleryPic3 from '../../assets/spec03.jpg';
import galleryPic4 from '../../assets/spec04.jpg';
import galleryPic5 from '../../assets/spec05.jpg';
import galleryPic6 from '../../assets/spec06.jpg';
import galleryPic7 from '../../assets/spec07.jpg';
import galleryPic8 from '../../assets/spec08.jpg';
import galleryPic9 from '../../assets/spec09.jpg';
import VirtualTryOn from "../TryOnFace/VirtualTryOn";
import RecommendedProducts from "../Recommended/BrowseHistory";
import Quiz from "../Quiz/quiz";
import Modal from "../../model.jsx";
import Carousel from "./carousel.jsx";
import menCategoryImg from '../../assets/spec08.jpg';
import womenCategoryImg from '../../assets/spec09.jpg';
import kidsCategoryImg from '../../assets/spec07.jpg';
import ReviewCard from "./reviewCard.jsx";

const galleryImages = [
  galleryPic1,
  galleryPic2,
  galleryPic3,
  galleryPic4,
  galleryPic5,
  galleryPic6,
  galleryPic7,
  galleryPic8,
  galleryPic9,
];

const CategoryCard = ({ title, imageUrl, link }) => (
  <div className="relative group h-[350px] w-full max-w-xs overflow-hidden rounded-lg shadow-md bg-white">
    <img
      src={imageUrl}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
    />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-4">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <Link
        to={link}
        className="bg-gradient-to-r from-[#0f90c3] to-[#06275f] text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-[#108592] transition"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <App />
      <Carousel />
      <div className="mt-20">
        {/* Use flex-wrap to allow wrapping on smaller screens */}
        <div className="h-auto w-auto bg-[#fffffffa] flex flex-wrap space-x-0 justify-center mx-2">
          <span className="text-center flex flex-col items-center mx-2 mb-4 p-3">
            <AiOutlineSafetyCertificate className="h-16 w-16 text-[#3a99bf]" />
            <h1 className="font-semibold text-[#2471c9] hover:text-black text-sm">Secure & Safe</h1>
          </span>
          <span className="text-center flex flex-col items-center mx-2 mb-4 p-3">
            <CiDeliveryTruck className="h-16 w-16 text-[#3a99bf]" />
            <h1 className="font-semibold text-[#2471c9] hover:text-[#232424] text-sm">2-7 Days Delivery</h1>
          </span>
          <span className="text-center flex flex-col items-center mx-2 mb-4 p-3">
            <PiHandshakeFill className="h-16 w-16 text-[#3a99bf]" />
            <h1 className="font-semibold text-[#2471c9] hover:text-[#1d1d1d] text-sm">10K+ Happy Customer</h1>
          </span>
        </div>
        <div className="py-12 text-center pt-16 bg-[#f5fcfdf3]">
          {/* Adjust text sizes and paddings for mobile */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl m-4 font-serif font-bold px-2 sm:px-8 lg:px-32 bg-gradient-to-r from-[#eded12] via-[#158392] to-[#e70cd8] text-transparent bg-clip-text">
            Welcome to ZOOPICEYE Where Vision Meets Style!
          </h2>
          <h2 className="text-[#5b1148] p-4 text-base sm:text-xl mx-4">
            "Welcome to ZOOPICEYE Opticals! We are a leading provider of
            comprehensive eye care services. Our team of experienced optometrists and opticians
            is dedicated to helping you achieve and maintain optimal eye health. We
            offer a wide range of services, including eye exams, contact lens fittings,
            prescription glasses, and sunglasses. Visit us today to experience the difference."
          </h2>
          <div className="mt-6">
            <button className="h-14 w-44 bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white rounded-md mx-auto flex justify-center items-center space-x-2 transition hover:bg-[#0d6990] hover:translate-x-2 cursor-pointer ">
              <Link to="/SpectacleList">Check Collections</Link>
              <FaArrowUpRightFromSquare className="text-white h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Image Carousel Section */}
      <div className="bg-[#eef3f4] py-12 mb-16">
        <h2 className="text-4xl font-bold font-sans text-center mb-6 bg-gradient-to-r from-[#eded12] via-[#158392] to-[#e70cd8] text-transparent bg-clip-text">
          Explore Our Collection
        </h2>
        <ImageCarousel images={galleryImages} />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="text-section bg-[#f6f4f3] text-[#f1f2f2] p-5 h-auto flex flex-col items-center justify-center mx-3">
          <p className="bg-gradient-to-b from-[#0e79a3] to-[#07265e] text-center font-serif rounded-lg p-6 border-2 border-green-900 mb-4 hover:translate-x-3 cursor-pointer">
            Founded in 2024, Zoopiceye was born from a passion to make eyewear accessible to all. We believe glasses are a statement of style, confidence, and personality. Our mission is to provide high-quality, affordable eyewear that helps everyone see the world more clearly.
          </p>
          <p className="bg-gradient-to-b from-[#0e79a3] to-[#07265e] text-center font-serif rounded-lg p-6 border-2 border-green-900 hover:translate-x-3 cursor-pointer">
            At Zoopiceye, our mission is simple: to combine vision and fashion with a focus on innovation and sustainability. We prioritize quality, ensuring every pair of spectacles enhances both vision and confidence.
          </p>
        </div>

        {/* Image Section */}
        <div className="image-section flex items-center justify-center h-auto w-full mt-6 lg:mt-0">
          <Link to="/">
            <img src={logo} alt="logo" className="rounded-lg" />
          </Link>
        </div>
      </div>

      {/* <RecommendedProducts /> */}

      {/* Categories Section */}
      <div className="bg-[#f3f4f6] py-16 px-4 lg:px-20">
        <h2 className="text-4xl font-bold font-sans text-center bg-gradient-to-r from-[#eded12] via-[#158392] to-[#e70cd8] text-transparent bg-clip-text mb-12">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          <CategoryCard
            title="MEN"
            imageUrl={menCategoryImg}
            link="/spectacleList"
          />
          <CategoryCard
            title="WOMEN"
            imageUrl={womenCategoryImg}
            link="/spectacleList"
          />
          <CategoryCard
            title="KIDS"
            imageUrl={kidsCategoryImg}
            link="/spectacleList"
          />
        </div>
      </div>

      {/* Book Eye Test Section */}
      <div className="bg-[#eef3f4] p-8 lg:p-20 flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full max-w-md text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#2d899c]">
            BOOK EYE TEST AT HOME
          </h2>
          <p className="text-lg mb-4">
            At ZOOPICEYE we’re passionate about eyewear that not only
            improves your vision but also elevates your style.
          </p>
          <button className="h-14 w-44 bg-gradient-to-b from-[#0f90c3] to-[#06275f] text-white text-center font-medium font-sans rounded-md transition hover:bg-[#108592]">
            <Link to="/Book-Slot">BOOK DATE</Link>
          </button>
        </div>

        <div className="w-full max-w-lg mt-8 lg:mt-0 lg:ml-12">
          <img
            className="w-full object-cover rounded-lg"
            src="https://img.freepik.com/free-photo/side-view-patients-ophthalmologist-s-office_23-2150801424.jpg?ga=GA1.2.1562222037.1716092274&semt=ais_hybrid"
            alt="Eye Test"
          />
        </div>
      </div>
      <RecommendedProducts />
      <ReviewCard />
      {/* <VirtualTryOn /> */}

      <Quiz />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Quiz />
      </Modal>

      <a
        href="https://wa.me/9452122529"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Chat with seller"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>
      <Footer />
    </>
  );
}
export default Home;