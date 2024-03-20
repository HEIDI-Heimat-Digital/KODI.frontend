import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ListingsCard from "../../Components/ListingsCard";
import { useNavigate, useLocation } from "react-router-dom";
// import {
//     sortByTitleAZ,
//     sortByTitleZA,
//     sortLatestFirst,
//     sortOldestFirst,
// } from "../../Services/helper";
import { useTranslation } from "react-i18next";
import { getListings } from "../../Services/listingsApi";
import { getCities } from "../../Services/cities";
import LoadingPage from "../../Components/LoadingPage";
import { getCategory } from "../../Services/CategoryApi";
import './Iframe.css'

const IFrame = ({ cityId }) => {
    const navigate = useNavigate();
    const location = useLocation();

    window.scrollTo(0, 0);
    const pageSize = 12;
    const iFrame = true;
    const { t } = useTranslation();
    const [categoryId, setCategoryId] = useState(0);
    // const [selectedCategory, setCategoryName] = useState(t("allCategories"));
    // const [selectedCity, setSelectedCity] = useState({})
    // const [selectedSortOption, setSelectedSortOption] = useState("");
    const [listings, setListings] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [, setCategories] = useState([]);

    const fetchData = async (params) => {
        params.showExternalListings = "false";
        params.cityId = cityId;
        try {
            const response = await getListings(params);
            setListings(response.data.data);
        } catch (error) {
            setListings([]);
            console.error("Error fetching listings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     const fetchCity = async () => {
    //         try {
    //             const cityResp = await getCities({ cityId });
    //             const city = cityResp.data.data.find(c => c.id === cityId);
    //             if (city) {
    //                 setSelectedCity(city);
    //             } else {
    //                 setError('City not found');
    //             }
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchCity();
    // }, [cityId]);

    useEffect(() => {
        document.title = process.env.REACT_APP_REGION_NAME + " " + t("allEvents");
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken =
            window.localStorage.getItem("accessToken") ||
            window.sessionStorage.getItem("accessToken");
        const refreshToken =
            window.localStorage.getItem("refreshToken") ||
            window.sessionStorage.getItem("refreshToken");
        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        }
        setIsLoading(true);
        Promise.all([getCities(), getCategory()]).then((response) => {
            const catList = {};
            response[1]?.data.data.forEach((cat) => {
                catList[cat.id] = cat.name;
            });
            setCategories(catList);
            const params = { pageSize, statusId: 1 };
            const pageNoParam = parseInt(urlParams.get("pageNo"));
            if (pageNoParam > 1) {
                params.pageNo = pageNoParam;
                urlParams.set("pageNo", pageNo);
                setPageNo(pageNoParam);
            } else {
                urlParams.delete("pageNo");
            }
            const categoryIdParam = urlParams.get("categoryId");
            if (categoryIdParam) {
                const categoryId = parseInt(categoryIdParam);
                if (catList[categoryId]) {
                    setCategoryId(categoryId);
                    params.categoryId = categoryId;
                    if (categoryId === 3) {
                        params.sortByStartDate = true;
                    }
                } else urlParams.delete("categoryId");
            }
            setTimeout(() => {
                fetchData(params);
            }, 1000);
        });
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const params = { pageSize, statusId: 1 };
            if (parseInt(categoryId)) {
                params.categoryId = parseInt(categoryId);
                urlParams.set("categoryId", parseInt(categoryId));
            } else {
                urlParams.delete("categoryId");
            }
            if (pageNo > 1) {
                params.pageNo = pageNo;
                urlParams.set("pageNo", pageNo);
            } else {
                params.pageNo = 1;
                urlParams.delete("pageNo");
            }
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState({}, "", newUrl);
            if (parseInt(categoryId) === 3) {
                params.sortByStartDate = true;
            }
            setTimeout(() => {
                fetchData(params);
            }, 1000);
        }
    }, [categoryId, pageNo]);

    // useEffect(() => {
    //     switch (selectedSortOption) {
    //         case "titleAZ":
    //             setListings([...sortByTitleAZ(listings)]);
    //             break;
    //         case "titleZA":
    //             setListings([...sortByTitleZA(listings)]);
    //             break;
    //         case "recent":
    //             setListings([...sortLatestFirst(listings)]);
    //             break;
    //         case "oldest":
    //             setListings([...sortOldestFirst(listings)]);
    //             break;
    //         default:
    //             break;
    //     }
    // }, [selectedSortOption, listings]);

    if (isLoading) return <div><LoadingPage /></div>;


    // function handleSortOptionChange(event) {
    //     setSelectedSortOption(event.target.value);
    // }
    const navigateTo = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const handleOfficialNotificationButton = () => {
        setCategoryId(16)
        navigateTo("/AllListings?terminalView=true&categoryId=16")
    };


    const searchParams = new URLSearchParams(location.search);
    const terminalViewParam = searchParams.get("terminalView");
    // const mtClass = terminalViewParam === "true" ? "mt-0" : "mt-20";
    // const pyClass = terminalViewParam === "true" ? "py-0" : "py-1";
    // const [showNavBar, setShowNavBar] = useState(true);
    // useEffect(() => {
    //     if (terminalViewParam === "true") {
    //         setShowNavBar(false);
    //     } else {
    //         setShowNavBar(true);
    //     }
    // }, [terminalViewParam]);

    // const handleSearch = async (searchQuery) => {
    //     console.log("Search term:", searchQuery);

    //     try {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const params = { statusId: 1 };
    //         params.cityId = cityId;

    //         const categoryId = urlParams.get('categoryId');
    //         if (categoryId && parseInt(categoryId)) {
    //             params.categoryId = parseInt(categoryId);
    //         }
    //         const response = await getListingsBySearch({
    //             searchQuery,
    //             ...params
    //         });
    //         console.log("API Response:", response.data.data);
    //         setListings(response.data.data);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    return (
        <section className="text-gray-600 body-font relative custom-scroll">
            <div className="mt-2 mb-20 customproview py-6">
                {terminalViewParam && (<div className="text-center mt-4 mb-4">
                    <button
                        onClick={handleOfficialNotificationButton}
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {t("officialnotification")}
                    </button>
                </div>
                )}
                <style>
                    {`
							@media (min-height: 1293px) {
							.customproview {
								margin-bottom: 10rem;
							}
							}
						`}
                </style>
                {isLoading ? (
                    <LoadingPage />
                ) : (
                    <div>
                        {listings && listings.length > 0 ? (
                            <div className="bg-white lg:px-10 md:px-5 sm:px-0 px-2 py-6 mt-5 mb-10 space-y-10 flex flex-col">
                                <div className="relative place-items-center bg-white mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-start">
                                    {listings &&
                                        listings.map((listing, index) => (
                                            <ListingsCard
                                                listing={listing}
                                                terminalView={terminalViewParam}
                                                iFrame={iFrame}
                                                key={index}
                                            />
                                        ))}
                                </div>
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
                                <div
                                    className="m-auto mt-10 mb-40 text-center font-sans font-bold text-xl"
                                    style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                    <span className="font-sans text-black">
                                        {t("to_upload_new_listing")}
                                    </span>
                                    <a
                                        className="m-auto mt-20 text-center font-sans font-bold text-xl cursor-pointer text-blue-400"
                                        style={{ fontFamily: "Poppins, sans-serif" }}
                                        onClick={() => {
                                            localStorage.setItem(
                                                "selectedItem",
                                                "Choose one category"
                                            );
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
                    </div>
                )}
                <div className="mt-20 mb-20 w-fit mx-auto text-center text-white whitespace-nowrap rounded-md border border-transparent bg-blue-800 px-8 py-2 text-base font-semibold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer">
                    {pageNo !== 1 ? (
                        <span
                            className="text-lg px-3 hover:bg-blue-400 cursor-pointer rounded-lg"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                            onClick={() => setPageNo(pageNo - 1)}
                        >
                            {"<"}{" "}
                        </span>
                    ) : (
                        <span />
                    )}
                    <span
                        className="text-lg px-3"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        {t("page")} {pageNo}
                    </span>
                    {listings.length >= pageSize && (
                        <span
                            className="text-lg px-3 hover:bg-blue-400 cursor-pointer rounded-lg"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                            onClick={() => setPageNo(pageNo + 1)}
                        >
                            {">"}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
};

IFrame.propTypes = {
    cityId: PropTypes.number.isRequired,
};

export default IFrame;