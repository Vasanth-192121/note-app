import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Only import Autoplay since navigation and pagination are removed

// Import Swiper styles (we still need the core styles)
import "swiper/css";

// Image imports
import desktopview from "../../public/desktopview.webp";
import loginview from "../../public/loginview.webp";
import addnoteview from "../../public/addnoteview.webp";

// Custom SVG Icons
const AiIcon = () => (
  <svg
    className="w-8 h-8 text-blue-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
  </svg>
);
const SecureIcon = () => (
  <svg
    className="w-8 h-8 text-green-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>
  </svg>
);
const DesignIcon = () => (
  <svg
    className="w-8 h-8 text-purple-600"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
  </svg>
);

// New SVGs for the "How It Works" section
const StepOneIcon = () => (
  <svg
    className="w-16 h-16 text-blue-600 mb-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const StepTwoIcon = () => (
  <svg
    className="w-16 h-16 text-green-600 mb-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

const StepThreeIcon = () => (
  <svg
    className="w-16 h-16 text-purple-600 mb-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2-7v1.7c-2.88 1.29-5 4.3-5 7.8 0 4.97 4.03 9 9 9s9-4.03 9-9c0-3.49-2.12-6.5-5-7.79V5h-2zm0 1.7L12 8l2-2.3V5h-4v1.7zM12 20c-3.87 0-7-3.13-7-7 0-2.65 1.46-4.96 3.63-6.22l1.37 1.37c-1.39.9-2.28 2.5-2.28 4.29 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.79-.89-3.39-2.28-4.29l1.37-1.37c2.17 1.26 3.63 3.57 3.63 6.22 0 3.87-3.13 7-7 7z" />
  </svg>
);

const LandingPage = () => {
  const pageTitle =
    "Keeper Notes - Smart, Secure, and Versatile Note Management App";
  const metaDescription =
    "Organize your ideas effortlessly with Keeper Notes, the smart note-taking app. Features include AI-powered auto-tagging, robust password management, and a clean, responsive design for all your devices. Get started for free today!";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://keeper-notes-nu.vercel.app/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      {/* // --- Navigation Bar - With improved responsive title and CTA --- */}
      <nav className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="font-bold text-blue-600">
          {/* Desktop view title */}
          <span className="hidden sm:block text-2xl">Keeper Notes</span>
          {/* Mobile view title */}
          <span className="sm:hidden text-xl leading-none">
            Keeper
            <br />
            Notes
          </span>
        </Link>
        <div className="space-x-4 flex items-center">
          {/* Secondary, less-prominent CTA for existing users */}
          <Link
            to="/login"
            className="text-blue-600 font-medium py-2 px-2 rounded-full transition-all duration-300 hover:bg-blue-50"
          >
            Log In
          </Link>
          {/* Primary CTA for new users */}
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-medium py-2 px-2 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- Hero Section with Swiper Slider --- */}
      <header className="bg-white pt-20 md:pt-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 animate-fade-in">
            Organize Your Thoughts. Master Your Life.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
            Keeper Notes combines AI-powered organization with robust security
            to help you capture, manage, and protect every idea.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate-pop-in"
          >
            Start Your Free Account
          </Link>

          {/* Swiper slider container */}
          <div className="mt-12 w-full max-w-5xl mx-auto">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true} // Add loop for continuous sliding
              className="rounded-lg shadow-2xl"
            >
              <SwiperSlide>
                <img
                  src={loginview}
                  alt="Keeper Notes App Interface Mockup - Slide 1"
                  width="1200" // Assumed dimensions for a large desktop image
                  height="750" // You can adjust these to your actual image size
                  className="w-full h-auto object-cover"
                  fetchpriority="high" // <-- lowercase
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={desktopview}
                  alt="Keeper Notes App Interface Mockup - Slide 2"
                  width="1200"
                  height="750"
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={addnoteview}
                  alt="Keeper Notes App Interface Mockup - Slide 3"
                  width="1200"
                  height="750"
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </header>

      {/* --- New "How It Works" Section --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Get Started in Three Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-sm">
              <StepOneIcon />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                1. Create an Account
              </h3>
              <p className="text-gray-600">
                Sign up for free and get instant access to all of our powerful
                features.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-sm">
              <StepTwoIcon />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                2. Add Your First Note
              </h3>
              <p className="text-gray-600">
                Start capturing your ideas, thoughts, and to-do lists. It's easy
                and fast.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-sm">
              <StepThreeIcon />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                3. Let AI Organize
              </h3>
              <p className="text-gray-600">
                Our smart AI will automatically tag and organize your notes for
                you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Final Call to Action --- */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of users who have found a smarter way to take notes.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Keeper Notes?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <AiIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Organization
              </h3>
              <p className="text-gray-600">
                Our smart AI automatically tags and sorts your notes so you
                never have to.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <SecureIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your ideas are encrypted and backed up, giving you peace of
                mind.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <DesignIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Clean, Responsive Design
              </h3>
              <p className="text-gray-600">
                A beautiful interface that works flawlessly on every device, big
                or small.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Professional Footer --- */}

      <footer className="bg-gray-800 text-gray-400 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Keeper Notes</h3>
            <p className="text-sm">
              Your all-in-one app for smart, secure, and effortless note-taking.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              {/* --- New: Example of a secure external link --- */}
              <li>
                <a
                  href="https://twitter.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Keeper Notes. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
