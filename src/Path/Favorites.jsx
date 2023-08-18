import React, { useState, useEffect } from "react";
import HomePageNavBar from "../Components/HomePageNavBar";
import { useNavigate } from "react-router-dom";
import LISTINGSIMAGE from "../assets/ListingsImage.jpeg";
import { useTranslation } from "react-i18next";
import { getFavoriteListings } from "../Services/favoritesApi";
import {
	sortByTitleAZ,
	sortByTitleZA,
	sortLatestFirst,
	sortOldestFirst,
} from "../Services/helper";
import { getCities } from "../Services/cities";
import { categoryById } from "../Constants/categories";
import Footer from "../Components/Footer";

const Favorites = () => {
	window.scrollTo(0, 0);
	const { t } = useTranslation();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cityId, setCityId] = useState(null);
	const [cities, setCities] = useState([]);
	const [categoryId, setCategoryId] = useState(0);
	const [, setCategoryName] = useState("");
	const [, setCityName] = useState("");
	const [pageNo, setPageNo] = useState(1);
	const [selectedSortOption, setSelectedSortOption] = useState("");

	useEffect(() => {
		document.title = "Favourites";
		const accessToken =
			window.localStorage.getItem("accessToken") ||
			window.sessionStorage.getItem("accessToken");
		const refreshToken =
			window.localStorage.getItem("refreshToken") ||
			window.sessionStorage.getItem("refreshToken");
		if (accessToken || refreshToken) {
			setIsLoggedIn(true);
		}
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
		getCities().then((citiesResponse) => {
			setCities(citiesResponse.data.data);
			const cityIdParam = urlParams.get("cityId");
			if (cityIdParam) setCityId(cityIdParam);
			const categoryIdParam = urlParams.get("categoryId");
			if (categoryIdParam) setCategoryId(categoryIdParam);
		});
	}, []);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const params = { pageNo, pageSize: 9, statusId: 1 };
		if (parseInt(cityId)) {
			setCityName(cities.find((c) => parseInt(cityId) === c.id)?.name);
			urlParams.set("cityId", cityId);
			params.cityId = cityId;
		} else {
			setCityName(t("allCities"));
			urlParams.delete("cityId");
		}
		if (parseInt(categoryId)) {
			setCategoryName(t(categoryById[categoryId]));
			params.categoryId = categoryId;
			urlParams.set("categoryId", categoryId);
		} else {
			setCategoryName(t("allCategories"));
			urlParams.delete("categoryId");
		}


		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, "", newUrl);
		getFavoriteListings(params).then((response) => {
			const data = response.data.data;
			setFavListings(data);
		});
	}, [categoryId, cities, cityId, pageNo, t]);

	function handleSortOptionChange(event) {
		setSelectedSortOption(event.target.value);
	}

	const navigate = useNavigate();
	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	const [favListings, setFavListings] = useState([]);
	useEffect(() => {
		getFavoriteListings().then((response) => {
			setFavListings(response.data.data);
		});
	}, []);

	// Selected Items Deletion Ends

	useEffect(() => {
		switch (selectedSortOption) {
			case "titleAZ":
				setFavListings([...sortByTitleAZ(favListings)]);
				break;
			case "titleZA":
				setFavListings([...sortByTitleZA(favListings)]);
				break;
			case "recent":
				setFavListings([...sortLatestFirst(favListings)]);
				break;
			case "oldest":
				setFavListings([...sortOldestFirst(favListings)]);
				break;
			default:
				break;
		}
	}, [selectedSortOption, favListings]);

	return (
		<section className="text-gray-600 body-font relative">
			<HomePageNavBar />
			<div
				className={`container-fluid py-0 mr-0 ml-0 w-full flex flex-col mt-20`}
			>
				<div className="w-full mr-0 ml-0">
					<div className={`lg:h-64 md:h-64 h-72 overflow-hidden py-1`}>
						<div className="relative lg:h-64 md:h-64 h-72">
							<img
								alt="ecommerce"
								className="object-cover object-center h-full w-full"
								src={process.env.REACT_APP_BUCKET_HOST + "admin/Homepage.jpg"}
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 text-white z--1">
								<h1
									className="text-4xl md:text-6xl lg:text-7xl text-center font-bold mb-4 font-sans"
									style={{ fontFamily: "Poppins, sans-serif" }}
								>
									{t("favorites")}
								</h1>
								<div>
									<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-4 gap-2 relative justify-center place-items-center lg:px-10 md:px-5 sm:px-0 px-2 py-0 mt-0 mb-0">
										<div className="col-span-6 sm:col-span-1 mt-1 px-0 mr-0 w-full">
											<select
												id="city"
												name="city"
												autoComplete="city-name"
												onChange={(e) => setCityId(e.target.value)}
												value={cityId}
												className="bg-gray-50 border font-sans border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												<option className="font-sans" value={0} key={0}>
													{t("allCities")}
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
										<div className="col-span-6 sm:col-span-1 mt-1 px-0 mr-0 w-full">
											<select
												id="category"
												name="category"
												autoComplete="category-name"
												onChange={(e) => setCategoryId(e.target.value)}
												value={categoryId}
												className="bg-gray-50 border font-sans border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												<option className="font-sans" value={0} key={0}>
													{t("allCategories")}
												</option>
												{Object.keys(categoryById).map((key) => {
													return (
														<option className="font-sans" value={key} key={key}>
															{t(categoryById[key])}
														</option>
													);
												})}
											</select>
										</div>
										<div className="col-span-6 sm:col-span-1 mt-1 px-0 mr-0 w-full">
											<select
												id="country"
												name="country"
												value={selectedSortOption}
												onChange={handleSortOptionChange}
												autoComplete="country-name"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												<option value="">{t("sort")}</option>
												<option value="titleAZ">{t("atoztitle")}</option>
												<option value="titleZA">{t("ztoatitle")}</option>
												<option value="recent">{t("recent")}</option>
												<option value="oldest">{t("oldest")}</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-5 mb-20 p-6">
				<div>
					{favListings && favListings.length > 0 ? (
						<div className="bg-white lg:px-10 md:px-5 sm:px-0 px-2 py-6 mt-10 mb-10 space-y-10 flex flex-col">
							<div className="relative place-items-center bg-white mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-start">
								{favListings &&
									favListings.filter(f => f.categoryId === parseInt(categoryId)).map((favListing) => (
										<div
											key={favListing.id}
											onClick={() =>
												navigateTo(
													`/HomePage/EventDetails?listingId=${favListing.id}&cityId=${favListing.cityId}`
												)
											}
											className="w-full h-full shadow-lg rounded-lg cursor-pointer"
										>
											<a className="block relative h-64 rounded overflow-hidden">
												<img
													alt="ecommerce"
													className="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-1000"
													src={
														favListing.logo
															? process.env.REACT_APP_BUCKET_HOST +
															  favListing.logo
															: LISTINGSIMAGE
													}
												/>
											</a>
											<div className="mt-5 px-2">
												<h2
													className="text-gray-900 title-font text-lg font-bold text-center font-sans truncate"
													style={{ fontFamily: "Poppins, sans-serif" }}
												>
													{favListing.title}
												</h2>
											</div>
											<div className="my-4 bg-gray-200 h-[1px]"></div>
											{favListing.id && favListing.categoryId === 3 ? (
												<p
													className="text-gray-600 my-4 p-2 h-[1.8rem] title-font text-sm font-semibold text-center font-sans truncate"
													style={{ fontFamily: "Poppins, sans-serif" }}
												>
													{new Date(
														favListing.startDate.slice(0, 10)
													).toLocaleDateString("de-DE") +
														" To " +
														new Date(
															favListing.endDate.slice(0, 10)
														).toLocaleDateString("de-DE")}
												</p>
											) : (
												<p
													className="text-gray-600 my-4 p-2 h-[1.8rem] title-font text-sm font-semibold text-center font-sans truncate"
													style={{ fontFamily: "Poppins, sans-serif" }}
													dangerouslySetInnerHTML={{
														__html: favListing.description,
													}}
												/>
											)}
										</div>
									))}
							</div>
						</div>
					) : (
						<div>
							<div className="flex items-center justify-center">
								<h1 className=" m-auto mt-20 text-center font-sans font-bold text-2xl text-black">
									{t("currently_no_fav_listings")}
								</h1>
							</div>

							<div className="m-auto mt-10 mb-40 text-center font-sans font-bold text-xl">
								<span className="font-sans text-black">
									{t("to_upload_new_listing")}
								</span>
								<a
									className="m-auto mt-20 text-center font-sans font-bold text-xl cursor-pointer text-blue-400"
									onClick={() => {
										localStorage.setItem(
											"selectedItem",
											t("chooseOneCategory")
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
					{favListings.length >= 9 && (
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

			<div className="bottom-0 w-full">
				<Footer />
			</div>
		</section>
	);
};

export default Favorites;
