import React, { useState, useEffect } from "react";
import HomePageNavBar from "../../Components/HomePageNavBar";
import { getDashboarddata } from "../../Services/dashboarddata";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HOMEPAGEIMG from "../../assets/homeimage.jpg";
import LOGO from "../../assets/logo.png";
import { getListingsByCity } from "../../Services/listings";

const EventDetails = () => {
  window.scrollTo(0, 0);
  const { t, i18n } = useTranslation();

  //populate the events titles starts
  const [categoriesdata, setCategoriesdata] = useState({ categoriesListings: [] });
  useEffect(() => {
    document.title = "Event Details";
  }, []);


  const [dashboarddata, setDashboarddata] = useState({ listings: [] });
  useEffect(() => {
    getDashboarddata().then((response) => {
      setDashboarddata(response);
    });
  }, []);

  let navigate = useNavigate();
  const navigateTo = (path) => {
    if (path) {
      navigate(path);
    }
  };

  function handleCategoriesChange(event) {
    setCategoriesdata({
      ...categoriesdata,
      [event.target.name]: event.target.value,
    });
  }

  function handleDashboardChange(event) {
    setDashboarddata({
      ...dashboarddata,
      [event.target.name]: event.target.value,
    });
  }

  const [content, setContent] = useState("A");

  const handleButtonClick = (value) => {
    setContent(value);
  };

  const [customerServiceDataload, setcustomerServiceDataload] = useState(false);

  const customerServiceData = () => {
    setcustomerServiceDataload(true);
    setSelectedLink("customerService");
  };
  const onCancel = () => {
    setcustomerServiceDataload(false);
    setSelectedLink("current");
  };

  const [selectedLink, setSelectedLink] = useState("current");

  const [location, setLocation] = useState("");

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleLocationSubmit(event) {
    event.preventDefault();
  }

  const [listingsData, setListingsData] = useState([]);
  useEffect(() => {
    getListingsByCity().then((response) => {
      setListingsData(response);
    });
  }, []);

  const [selectedSortOption, setSelectedSortOption] = useState('');
  const sortedListings = [...listingsData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  }).slice(0, 3);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <section class="text-gray-600 bg-white body-font">
      <HomePageNavBar />

      <div class="mx-auto w-full grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-3 lg:px-8">

        <div className="grid grid-cols-1 gap-4 col-span-2">
          <div class="lg:w-full md:w-full h-64">
            <div class="md:grid md:gap-6 bg-white rounded-lg p-8 flex flex-col shadow-xl w-full">
              <div class="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  {/* <p class="text-xs bg-red-600 rounded-sm p-1 font-bold text-white w-24 text-center">
                    MOST POPULAR
                  </p> */}
                  <div class="flex flex-col sm:flex-row sm:items-center text-start justify-between">
                    <h1 class="text-gray-900 mb-4 text-2xl md:text-3xl mt-4 lg:text-3xl title-font text-start font-bold">
                      Book of Batman
                    </h1>
                    <div class="flex items-center">
                    <button
                      type="button"
                      class="text-gray-900 mt-2 bg-white border border-gray-900 hover:text-cyan-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 mb-2 mr-2 sm:mr-2"
                    >
                      <span class="ml-1">{t("favourites")}</span>
                    </button>

                      <button
                        type="button"
                        class="text-gray-900 mt-2 bg-white border border-gray-900 hover:text-cyan-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-500 mb-2 mr-2 sm:mr-2"
                      >
                        {t("split")}
                      </button>
                      <button type="button" class="text-gray-900 mt-0 items-center">
                        <svg
                          class="w-8 h-4 mx-1 text-[#626890]"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="ethereum"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path d="M0 256a56 56 0 1 1 112 0A56 56 0 1 1 0 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="flex justify-center space-x-6 mt-2 h-5 w-5 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </div>
                  <p class="text-start">Regional Products</p>
                </form>
              </div>
            </div>
          </div>
          <div class="container-fluid lg:w-full md:w-full">
            <div class=" mr-0 ml-0 mt-4">
              <div class="h-96 overflow-hidden px-0 py-0 shadow-xl">
                <div class="relative h-96">
                  <img
                    alt="ecommerce"
                    class="object-cover object-center h-full w-full"
                    src={HOMEPAGEIMG}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-hidden sm:p-0 mt-[5rem] px-0 py-0">
                <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">
                {t("description")}
                </h1>
                <p class="leading-relaxed text-base font-bold my-6">
                Originally introduced as a ruthless vigilante who frequently killed or maimed criminals, but evolved into a character with a stringent moral code and strong sense of justice. Unlike most superheroes, Batman does not possess any superpowers, instead relying on his intellect, fighting skills, and wealth.
                </p>
            </div>
        </div>

          <div class="w-full h-full md:ml-[6rem] lg:ml-[0rem] ml-[1rem] sm:h-96 bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-white shadow-xl dark:bg-white">
            <div >
              <div class="p-4 space-y-0 md:space-y-6 sm:p-4">
                <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">
                {t("ownerInfo")}
                </h1>
              </div>
              <div class="my-4 bg-gray-200 h-[1px]"></div>

              <div class="items-center mx-2 py-2 px-2 my-2 gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div class="flex justify-center sm:justify-start">
                  <img
                    class="h-6 w-auto"
                    src={LOGO}
                    alt="HEDI- Heimat Digital"
                    onClick={() => navigateTo("/HomePage")}
                  />
                </div>
                <div class="flex-grow text-center sm:text-left mt-6 sm:mt-0">
                  <h2 class="text-gray-900 text-lg title-font mb-2 font-bold dark:text-gray-900">
                    Christian Bale
                  </h2>
                  <p class="leading-relaxed text-base dark:text-gray-900">Uploaded 5 months ago.</p>
                </div>
              </div>

              <div class="bg-white mx-2 my-2 py-2 px-2 mt-4 mb-4 flex flex-wrap gap-1 justify-Start">
                <div class="flex justify-center py-2 px-2 sm:justify-start mx-0 my-0 gap-2">
                  <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    class="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                </div>
                <div class="flex justify-center py-2 px-2 sm:justify-start mx-0 my-0 gap-2">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  class="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                </div>
                <div class="flex justify-center py-2 px-2 sm:justify-start mx-0 my-0 gap-2">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  class="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-sky-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </button>
                </div>
                <div class="flex justify-center py-2 px-2 sm:justify-start mx-0 my-0 gap-2">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  class="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </button>
                </div>
                <div class="flex justify-center py-2 px-2 sm:justify-start mx-0 my-0 gap-2">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  class="inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                </div>
            </div>

              <div class="flex justify-center my-4">
                <button
                  onClick={() => navigateTo("/ViewProfile")}
                  type="submit"
                  class="group relative flex w-72 md:w-96 lg:mx-4 sm:mx-0 font-bold justify-center rounded-md border border-transparent text-blue-800 bg-slate-300 py-2 px-4 text-sm shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer"
                >
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {t("viewProfile")}
                </button>
              </div>
            </div>
          </div>
      </div>

      <div class="mx-auto grid max-w-2xl  gap-y-1 gap-x-8 py-8 px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-900">
        {t("smilarItems")}
        </h1>
        <div class="bg-white p-0 mt-10 mb-10 flex flex-wrap gap-10 justify-center">
            <div class="grid grid-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
              {sortedListings && sortedListings.map((listing) => (
                <div
                  onClick={() => navigateTo("/HomePage/EventDetails")}
                  class="lg:w-96 md:w-64 h-96 pb-20 w-full shadow-lg rounded-lg cursor-pointer"
                >
                  <a class="block relative h-64 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                      src={HOMEPAGEIMG}
                    />
                  </a>
                  <div class="mt-10">
                    <h2 class="text-gray-900 title-font text-lg font-bold text-center font-sans">
                    {listing.title}
                    </h2>
                  </div>
                  <div className="my-4 bg-gray-200 h-[1px]"></div>
                </div>
                ))}
            </div>
          </div>
      </div>

      <footer class="text-center lg:text-left bg-black text-white">
            <div class="mx-6 py-10 text-center md:text-left">
            <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="">
                <h6 class="
                    uppercase
                    font-semibold
                    mb-4
                    flex
                    items-center
                    justify-center
                    md:justify-start font-sans
                    ">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cubes"
                    class="w-4 mr-3" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path fill="currentColor"
                        d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z">
                    </path>
                    </svg>
                    Smart Regions
                </h6>
                <div class="uppercase font-semibold mb-4 flex justify-center md:justify-start gap-4">
                    <a href="#!" class=" text-white rounded-full bg-gray-500 p-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f"
                        class="w-2.5 text-white" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path fill="currentColor"
                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                        </path>
                    </svg>
                    </a>
                    <a href="#!" class=" text-white rounded-full bg-gray-500 p-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter"
                        class="w-4 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                        </path>
                    </svg>
                    </a>
                    <a href="#!" class=" text-white rounded-full bg-gray-500 p-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram"
                        class="w-3.5 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                        </path>
                    </svg>
                    </a>
                    <a href="#!" class=" text-white rounded-full bg-gray-500 p-2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in"
                        class="w-3.5 text-white" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="currentColor"
                        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                        </path>
                    </svg>
                    </a>
                </div>
                </div>
                <div class="">
                <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start font-sans">
                    Learn More
                </h6>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">developer community</a>
                </p>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">Contact us</a>
                </p>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">Log in</a>
                </p>
                </div>
                <div class="">
                <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start font-sans">
                    Leagal
                </h6>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">imprint</a>
                </p>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">terms and conditions</a>
                </p>
                <p class="mb-4">
                    <a href="#!" class="text-gray-600 font-sans">Data protection</a>
                </p>
                <p>
                    <a href="#!" class="text-gray-600 font-sans">Right of withdrawal</a>
                </p>
                </div>
                <div class="">
                <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start font-sans">
                Secure the APP now!
                </h6>
                </div>
            </div>
            </div>
            <div class="text-center p-6 bg-black">
            <div className="my-4 text-gray-600 h-[1px]"></div>
            <span class="font-sans">© HeidiTheme 2023. All rights reserved. Created by  </span>
            <a class="text-white font-semibold underline font-sans" href="https://heidi-app.de/">HeimatDigital</a>
            </div>
        </footer>
    </section>
  );
};

export default EventDetails;