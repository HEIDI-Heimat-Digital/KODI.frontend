import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePageNavBar from "../../Components/HomePageNavBar";
import { useTranslation } from "react-i18next";
import LoadingPage from "../../Components/LoadingPage";
import { getAllForums } from "../../Services/forumsApi";
import { getCities } from "../../Services/cities";
import Footer from "../../Components/Footer";

const AllForums = () => {
	window.scrollTo(0, 0);
	const { t } = useTranslation();
	const [cityId, setCityId] = useState(0);
	const [cities, setCities] = useState([]);
	const [forums, setForums] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

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
		getCities({ hasForum: true }).then((citiesResponse) => {
			setCities(citiesResponse.data.data);
			const pageNoParam = parseInt(urlParams.get("pageNo"));
			if (pageNoParam) setPageNo(pageNoParam);
			const cityIdParam = urlParams.get("cityId");
			if (cityIdParam) setCityId(cityIdParam);
		});
	}, []);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const params = { pageNo, pageSize: 12 };
		setIsLoading(true);

		if (parseInt(cityId)) {
			params.cityId = cityId;
		} else {
			urlParams.delete("cityId");
		}
		if (pageNo > 1) {
			params.pageNo = pageNo;
			urlParams.set("pageNo", pageNo);
		} else {
			urlParams.delete("pageNo");
		}


		if (cityId) {
			const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
			window.history.replaceState({}, "", newUrl);
			const fetchData = async () => {
				try {
					const response = await getAllForums(cityId, params);
					const data = response.data.data;
					setForums(data);
				} catch (error) {
					console.error("Error fetching forums:", error);
				} finally {
					setIsLoading(false);
				}
			};

			const fetchDataWithDelay = () => {
				setTimeout(() => {
					fetchData();
				}, 1000);
			};

			fetchDataWithDelay();
		} else {
			setForums([]);
			setIsLoading(false);
		}
	}, [cityId, pageNo]);

	const navigateTo = (path) => {
		navigate(path);
	};

	const handleClick = async (cityId, forum) => {
		const path = `/Forum?cityId=${cityId}&forumId=${forum.id}`;
		if (isLoggedIn) {
			navigateTo(path);
		} else {
			sessionStorage.setItem("path", path);
			navigateTo("/login");
		}
	};
	const handleChange = (e) => {
		const selectedCityId = e.target.value;
		const urlParams = new URLSearchParams(window.location.search);
		const selectedCity = cities.find(
			(city) => city.id.toString() === selectedCityId
		);
		if (selectedCity) {
			localStorage.setItem("selectedCity", selectedCity.name);
			setCityId(parseInt(selectedCityId));
			urlParams.set("cityId", selectedCityId);
		}
		window.history.replaceState({}, "", `?${urlParams.toString()}`);
	};

	return (
		<section className="text-gray-600 bg-white body-font">
			<HomePageNavBar />
			<div>
				<div className="container-fluid py-0 mr-0 ml-0 mt-20 w-full flex flex-col">
					<div className="w-full mr-0 ml-0">
						<div className="h-64 overflow-hidden px-0 py-1">
							<div className="relative h-64">
								<img
									alt="ecommerce"
									className="object-cover object-center h-full w-full"
									src={process.env.REACT_APP_BUCKET_HOST + "admin/Homepage.jpg"}
								/>
								<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 text-white z--1">
									<h1 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold mb-4 font-sans">
										{t("forums")}
									</h1>
									<div>
										<div className="relative w-full px-4 mb-4 md:w-80">
											<select
												id="city"
												name="city"
												autoComplete="city-name"
												onChange={(e) => handleChange(e)}
												value={cityId}
												className="bg-gray-50 border font-sans border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
												style={{
													fontFamily: "Poppins, sans-serif",
												}}
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
									</div>
								</div>
							</div>
							{/* <div className="relative w-full px-4 mb-4 md:w-80">
								<select
									id="city"
									name="city"
									autoComplete="city-name"
									value={cityId || 0}
									className="bg-gray-50 border font-sans border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
									style={{
										fontFamily: "Poppins, sans-serif",
									}}
								>
									<option className="font-sans" value={0} key={0}>
										{t("allCities")}
									</option>
									{cities.map((city) => (
										<option className="font-sans" value={city.id} key={city.id}>
											{city.name}
										</option>
									))}
								</select>
							</div> */}
						</div>
					</div>
				</div>

				<div className="mt-5 mb-20 p-6">
					{isLoading ? (
						<LoadingPage />
					) : (
						<div>
							{forums && forums.length > 0 ? (
								<div className="bg-white lg:px-10 md:px-5 sm:px-0 px-2 py-6 mt-10 mb-10 space-y-10 flex flex-col">
									<div className="relative place-items-center bg-white mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-start">
										{forums &&
											forums.map((forum) => (
												<div
													key={forum.id}
													onClick={() => handleClick(cityId, forum)}
													className="w-full h-full shadow-lg rounded-lg cursor-pointer"
												>
													<a className="block relative h-64 rounded overflow-hidden">
														{forum.isPrivate ? (
															<>
																<img
																	alt="forumImage"
																	className="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-1000"
																	src={
																		forum.image
																			? process.env.REACT_APP_BUCKET_HOST +
																			forum.image
																			: process.env.REACT_APP_BUCKET_HOST +
																			"admin/DefaultForum.jpeg"
																	}
																/>
															</>
														) : (
															<>
																<img
																	alt="forumImage"
																	className="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-1000"
																	src={
																		forum.image
																			? process.env.REACT_APP_BUCKET_HOST +
																			forum.image
																			: process.env.REACT_APP_BUCKET_HOST +
																			"admin/DefaultForum.jpeg"
																	}
																/>
															</>
														)}
													</a>
													<div className="mt-5 px-2">
														<div
															className="flex justify-between items-center"
															style={{ fontFamily: "Poppins, sans-serif" }}
														>
															<h2 className="text-gray-900 title-font text-md font-bold font-sans truncate">
																{forum.forumName.length > 18
																	? forum.forumName.substring(0, 18) + "..."
																	: forum.forumName}
															</h2>

															{forum.isPrivate === 0 ? (
																<h2 className="text-blue-400 title-font text-md font-bold font-sans truncate">
																	{t("public")}
																</h2>
															) : (
																<h2 className="text-blue-400 title-font text-md font-bold font-sans truncate">
																	{t("private")}
																</h2>
															)}
														</div>
														<div className="my-4 bg-gray-200 h-[1px]"></div>
														<h2
															style={{ fontFamily: "Poppins, sans-serif" }}
															className="text-gray-600 my-4 p-2 h-[1.8rem] title-font text-sm font-semibold text-center font-sans truncate"
														>
															{forum.description}
														</h2>
													</div>
												</div>
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
											{t("currently_no_forums")}
										</h1>
									</div>
									<div className="m-auto mt-10 mb-40 text-center font-sans font-bold text-xl">
										<span
											className="font-sans text-black"
											style={{ fontFamily: "Poppins, sans-serif" }}
										>
											{t("to_upload_new_forum")}
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
													? navigateTo("/CreateGroup")
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
						{forums.length >= 9 && (
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
			</div>
			<div className="bottom-0 w-full">
				<Footer />
			</div>
		</section>
	);
};

export default AllForums;