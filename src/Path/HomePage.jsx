import React, { useEffect, useState, lazy, Suspense } from "react";
import HomePageNavBar from "../Components/HomePageNavBar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getListings, getListingsCount, getListingsBySearch } from "../Services/listingsApi";
import { getCities } from "../Services/cities";
import Footer from "../Components/Footer";
import PrivacyPolicyPopup from "./PrivacyPolicyPopup";
import ListingsCard from "../Components/ListingsCard";
import SearchBar from "../Components/SearchBar";
// import { getCategory } from "../Services/CategoryApi";

import CITYIMAGE from "../assets/City.png";
import CITYDEFAULTIMAGE from "../assets/CityDefault.png";
import ONEIMAGE from "../assets/01.png";
import TWOIMAGE from "../assets/02.png";
import THREEIMAGE from "../assets/03.png";
const LazyMostPopulatCategories = lazy(() =>
  import("../Components//MostPopulatCategories")
);

const HomePage = () => {
  const { t } = useTranslation();
  const [cityId, setCityId] = useState();
  const [cities, setCities] = useState([]);
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listingsCount, setListingsCount] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  useEffect(() => {
    const hasAcceptedPrivacyPolicy = localStorage.getItem(
      "privacyPolicyAccepted"
    );

    if (!hasAcceptedPrivacyPolicy) {
      setShowPopup(true);
    }
    const urlParams = new URLSearchParams(window.location.search);
    getCities().then((citiesResponse) => {
      setCities(citiesResponse.data.data);
    });
    const cityId = parseInt(urlParams.get("cityId"));
    if (cityId) {
      setCityId(cityId);
    }
    getListingsCount().then((response) => {
      const data = response.data.data;
      const sortedData = data.sort(
        (a, b) => parseInt(b.totalCount) - parseInt(a.totalCount)
      );

      setListingsCount(sortedData);
    });

    document.title = process.env.REACT_APP_REGION_NAME + " " + t("home");
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken =
      window.localStorage.getItem("accessToken") ||
      window.sessionStorage.getItem("accessToken");
    const refreshToken =
      window.localStorage.getItem("refreshToken") ||
      window.sessionStorage.getItem("refreshToken");
    if (accessToken || refreshToken) {
      setIsLoggedIn(true);
    }
    const params = { pageSize: 12, statusId: 1, pageNo: 1 };
    if (cityId) {
      params.cityId = cityId;
    } else {
      urlParams.delete("cityId");
    }
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
    getListings(params).then((response) => {
      const data = response.data.data;
      setListings(data);
    });
  }, [cities, cityId]);

  function goToAllListingsPage(category) {
    let navUrl = `/AllListings?categoryId=${category}`;
    if (cityId)
      navUrl = `/AllListings?categoryId=${category}` + `&cityId=${cityId}`;
    navigateTo(navUrl);
  }

  const navigate = useNavigate();
  const navigateTo = (path) => {
    if (path) {
      navigate(path);
    }
  };
  const onCityChange = (e) => {
    const selectedCityId = e.target.value;
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = cities.find(
      (city) => city.id.toString() === selectedCityId
    );
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity.name);
      window.location.href = `?cityId=${selectedCityId}`;
    } else {
      localStorage.setItem("selectedCity", t("allCities"));
      urlParams.delete("cityId");
      setCityId(0);
    }
  };

  function handleSortOptionChange(event) {
    setSelectedSortOption(event.target.value);
  }

  const handleSearch = async (searchQuery) => {
    console.log("Search term:", searchQuery);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const params = { statusId: 1 };

      const cityId = urlParams.get('cityId');
      if (cityId && parseInt(cityId)) {
        params.cityId = parseInt(cityId);
      }

      const categoryId = urlParams.get('categoryId');
      if (categoryId && parseInt(categoryId)) {
        params.categoryId = parseInt(categoryId);
      }
      const response = await getListingsBySearch({
        searchQuery,
        ...params
      });
      console.log("API Response:", response.data.data);
      setListings(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function goToCitizensPage() {
    let navUrl = `/CitizenService`;
    if (cityId) navUrl = `/CitizenService?cityId=${cityId}`;
    navigateTo(navUrl);
  }

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAcceptedPrivacyPolicy = localStorage.getItem(
      "privacyPolicyAccepted"
    );

    if (!hasAcceptedPrivacyPolicy) {
      setShowPopup(true);
    }
  }, []);

  const handlePrivacyPolicyAccept = () => {
    localStorage.setItem("privacyPolicyAccepted", "true");
    setShowPopup(false);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <HomePageNavBar />
      {showPopup && <PrivacyPolicyPopup onClose={handlePrivacyPolicyAccept} />}

      <div className="container-fluid py-0 mr-0 ml-0 mt-0 w-full flex flex-col relative">
        <div className="w-full mr-0 ml-0">
          <div className="h-[40rem] lg:h-full overflow-hidden px-0 py-0 relative">
            <div className="relative h-[40rem]">
              <img
                alt="ecommerce"
                className="object-cover object-center h-full w-full"
                src={process.env.REACT_APP_BUCKET_HOST + "admin/Homepage.jpg"}
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col gap-4 items-start justify-center bg-gray-800 bg-opacity-50 text-white z--1">
                <div className="flex flex-col items-start max-w-[80%] md:max-w-[70%] lg:max-w-[60%] lg:px-20 md:px-5 sm:px-0 px-2 py-6">
                  <h1
                    className="font-sans mb-8 lg:mb-12 text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {t("homePageHeading")}
                  </h1>
                  <div className="relative w-full px-0 mb-0 md:w-80">
                    <div className="relative">
                      <select
                        id="city"
                        name="city"
                        autoComplete="city-name"
                        onChange={onCityChange}
                        value={cityId || 0}
                        className="bg-white h-10 border-2 border-gray-500 px-5 pr-10 rounded-full text-sm focus:outline-none w-full text-gray-600"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        <option className="font-sans" value={0} key={0}>
                          {t("allCities", {
                            regionName: process.env.REACT_APP_REGION_NAME,
                          })}
                        </option>
                        {cities.map((city) => (
                          <option
                            className="font-sans"
                            value={city.id}
                            key={city.id}
                          >
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyMostPopulatCategories
              listingsCount={listingsCount}
              t={t}
              goToAllListingsPage={goToAllListingsPage}
            />
          </Suspense>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="text-blue-800 lg:px-20 md:px-5 sm:px-0 px-2 py-6 text-2xl md:text-3xl mt-10 lg:text-4xl title-font text-start font-sans font-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          <h2>
            {t("recentListings")}
          </h2>
        </div>

        <div className="grid mt-10 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-4 gap-2 relative justify-center place-items-center lg:px-20 md:px-5 sm:px-0 px-2 py-6">
          <div className="col-span-6 sm:col-span-1 mt-0 mb-0 px-0 mr-0 w-full">
            <select
              id="country"
              name="country"
              value={selectedSortOption}
              onChange={handleSortOptionChange}
              autoComplete="country-name"
              className="bg-white h-10 border-2 border-gray-500 px-5 pr-10 rounded-full text-sm focus:outline-none w-full text-gray-600"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <option value="">{t("sort")}</option>
              <option value="titleAZ">{t("atoztitle")}</option>
              <option value="titleZA">{t("ztoatitle")}</option>
              <option value="recent">{t("recent")}</option>
              <option value="oldest">{t("oldest")}</option>
            </select>
          </div>

          <SearchBar onSearch={handleSearch} searchBarClassName="w-full" />
        </div>
      </div>

      {listings && listings.length > 0 ? (
        <div className="bg-white lg:px-20 md:px-5 sm:px-0 px-2 py-6 mt-0 mb-10 space-y-10 flex flex-col">
          <div className="relative place-items-center bg-white mt-4 mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-10 justify-start">
            {listings &&
              listings.map((listing, index) => (
                <ListingsCard listing={listing} key={index} />
              ))}
          </div>
          <button
            type="submit"
            onClick={() => {
              localStorage.setItem("selectedItem", t("chooseOneCategory"));
              navigateTo("/AllListings");
            }}
            className="w-full rounded-xl sm:w-80 mt-10 mx-auto bg-blue-800 px-8 py-2 text-base font-semibold text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer font-sans"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("viewMore")}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center">
            <h1
              className=" m-auto mt-20 text-center font-sans font-bold text-2xl text-black"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("currently_no_listings")}
            </h1>
          </div>
          <div className="m-auto mt-10 mb-40 text-center font-sans font-bold text-xl">
            <span
              className="font-sans text-black"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("to_upload_new_listing")}
            </span>
            <a
              className="m-auto mt-20 text-center font-sans font-bold text-xl cursor-pointer text-blue-400"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => {
                localStorage.setItem("selectedItem", "Choose one category");
                isLoggedIn
                  ? navigateTo("/UploadListings")
                  : navigateTo("/login");
              }}
            >
              {t("click_here")}
            </a>
          </div>
        </div>
      )}

      <h2
        className="text-blue-800 lg:px-20 md:px-5 sm:px-0 px-2 py-6 text-2xl md:text-3xl mt-10 lg:text-4xl title-font text-start font-sans font-bold"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {t("discoverMorePlaces")}
      </h2>

      <div className="bg-white lg:px-20 md:px-5 sm:px-0 px-2 py-6 mt-0 mb-10 space-y-10 flex flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 relative mb-4 justify-center place-items-center">
          {cities.map((city) => {
            if (city.id !== Number(cityId)) {
              return (
                <div
                  key={city.id}
                  onClick={() => {
                    const scrollPosition = window.scrollY;
                    localStorage.setItem("selectedCity", city.name);
                    navigateTo(`/AllListings?cityId=${city.id}`);
                    window.addEventListener("popstate", function () {
                      window.scrollTo(0, scrollPosition);
                    });
                  }}
                  className="h-80 w-full rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
                >
                  <div className="relative h-80 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center h-full w-full hover:scale-125 transition-all duration-500"
                      src={
                        city.image
                          ? process.env.REACT_APP_BUCKET_HOST + city.image
                          : CITYIMAGE
                      }
                      onError={(e) => {
                        e.target.src = CITYDEFAULTIMAGE; // Set default image if loading fails
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end text-white z--1" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' }}>
                      <h1 className="text-xl pb-5 md:text-3xl font-sans font-bold mb-0 ml-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {city.name}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="my-4 bg-gray-200 h-[1px]"></div>

      <div className="bg-white lg:px-20 md:px-5 sm:px-0 py-6 mt-10 mb-10 space-y-10 flex flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 relative mb-4 justify-center gap-4 place-items-center">
          <div className="pb-10 w-full mb-4 bg-gray-100 rounded-xl cursor-pointer">
            <div className="relative h-96 rounded overflow-hidden w-auto">
              <img
                alt="ecommerce"
                className="object-cover object-center h-48 w-48 m-auto"
                src={ONEIMAGE}
              />
              <div className="p-6">
                <h2
                  className="text-gray-900 mb-5 text-2xl md:text-2xl lg:text-3xl mt-5 title-font text-start font-bold font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("createAnAccount")}
                </h2>
                <p
                  className="text-gray-900 title-font text-lg font-bold text-start font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("createAnAccountDescription")}
                </p>
              </div>
            </div>
          </div>
          <div className="pb-10 w-full mb-4 bg-gray-100 rounded-xl cursor-pointer">
            <div className="relative h-96 w-96 rounded overflow-hidden w-auto">
              <img
                alt="ecommerce"
                className="object-cover object-center h-48 w-48 m-auto"
                src={TWOIMAGE}
              />
              <div className="p-6">
                <h2
                  className="text-gray-900 mb-5 text-2xl md:text-2xl lg:text-3xl mt-5 title-font text-start font-bold font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("getVerified")}
                </h2>
                <p
                  className="text-gray-900 title-font text-lg font-bold text-start font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("getVerifiedDescription")}
                </p>
              </div>
            </div>
          </div>
          <div className="pb-10 w-full mb-4 bg-gray-100 rounded-xl cursor-pointer">
            <div className="relative h-96 w-96 rounded overflow-hidden w-auto">
              <img
                alt="ecommerce"
                className="object-cover object-center h-48 w-48 m-auto"
                src={THREEIMAGE}
              />
              <div className="p-6">
                <h2
                  className="text-gray-900 mb-5 text-2xl md:text-2xl lg:text-3xl mt-5 title-font text-start font-bold font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("start")}
                </h2>
                <p
                  className="text-gray-900 title-font text-lg font-bold text-start font-sans"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t("startDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-400 mx-auto lg:px-20 md:px-5 sm:px-0 py-6 flex justify-center lg:h-[28rem] sm:h-[35rem]">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 px-4">
            <h2
              className="text-4xl text-white font-bold mb-4 font-sans"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("citizenService")}
            </h2>
            <p
              className="mb-4 text-gray-900 text-lg font-bold font-sans"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("findBestCitizenServicesInTheCity")}
            </p>
            <a
              onClick={() => goToCitizensPage()}
              className="ml-0 w-full sm:w-48 font-sans inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-transparent bg-blue-800 px-8 py-2 text-base font-semibold text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("clickHereToFind")}
            </a>
          </div>

          <div className="w-full md:w-1/2 flex flex-wrap lg:mt-0 md:mt-6 mt-6">
            <img
              src={
                process.env.REACT_APP_BUCKET_HOST + "admin/CitizenService2.png"
              }
              alt="Image 1"
              className="w-full md:w-98 mb-2"
            />
          </div>
        </div>
      </div>

      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </section>
  );
};

export default HomePage;
