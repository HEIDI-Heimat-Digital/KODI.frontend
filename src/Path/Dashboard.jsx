import React, { useState, useEffect, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SideBar from "../Components/SideBar";
import {
	getUserListings,
	getProfile,
	getUserByIds,
} from "../Services/usersApi";
import { getListings, updateListingsData } from "../Services/listingsApi";
import { useNavigate } from "react-router-dom";
import { sortOldest } from "../Services/helper";
import { categoryByName, categoryById } from "../Constants/categories";
import { status } from "../Constants/status";
import { Select } from "@chakra-ui/react";

const dashboardStyle = require("../Path/Dashboard.css");

const Dashboard = () => {
	const [listings, setListings] = useState([]);
	const [userRole, setUserRole] = useState(3);
	const [viewAllListings, setViewAllListings] = useState(false);
	const [usersList, setUsersList] = useState([]);
	useEffect(() => {
		getProfile().then((response) => {
			setUserRole(response.data.data.roleId);
		});
		getUserListings().then((response) => {
			setListings([...sortOldest(response.data.data)]);
		});
		document.title = "Dashboard";
	}, []);

	useEffect(() => {
		if (viewAllListings) {
			const ids = [];
			listings.forEach((listing) => {
				if (!ids.includes(listing.userId)) {
					ids.push(listing.userId);
				}
			});
			getUserByIds(ids).then((res) => {
				setUsersList(res.data.data);
			});
		}
	}, [listings, viewAllListings]);

	let navigate = useNavigate();
	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	function handleDashboardChange(event) {
		setListings({
			...listings,
			[event.target.name]: event.target.value,
		});
	}

	function getStatusClass(statusId) {
		if (status[statusId] == "Active") {
			return "bg-green-400";
		}
		if (status[statusId] == "Inactive") {
			return "bg-red-400";
		}
		if (status[statusId] == "Pending") {
			return "bg-yellow-400";
		}
	}

	function handleChnageInStatus(e, listing) {
		listing.statusId = e.target.value;
		updateListingsData(listing.cityId, listing, listing.id).then((res) => {
			if (res.status === 200) {
				getListings().then((response) => {
					setListings([...sortOldest(response.data.data)]);
					setViewAllListings(true);
				});
			}
		});
	}

	//Navigate to Edit Listings page Starts
	function goToEditListingsPage(listing) {
		var categoryId = listing.categoryId;
		if (categoryId == categoryByName.News) {
			navigateTo(
				`/OverviewPage/NewsCategories?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.RoadWorksOrTraffic) {
			navigateTo(
				`/ListingsPage/ConstructionTraffic?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.EventsOrNews) {
			navigateTo(
				`/ListingsPage/Events?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.Associations) {
			navigateTo(
				`/Listings/PageClub?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.RegionalProducts) {
			navigateTo(
				`/ListingsPage/RegionalProducts?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.OfferOrSearch) {
			navigateTo(
				`/ListingsPage/OfferSearch?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.NewCitizenInfo) {
			navigateTo(
				`/ListingsPage/Newcitizeninfo?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.DefectReport) {
			navigateTo(
				`/ListingsPage/DefectReporter?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.LostPropertyOffice) {
			navigateTo(
				`/ListingsPage/LostPropertyOffice?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.CompanyPortraits) {
			navigateTo(
				`/ListingsPage/Companyportaits?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.News) {
			navigateTo(
				`/OverviewPage/NewsCategories?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		} else if (categoryId == categoryByName.Offers) {
			navigateTo(
				`/ListingsPage/Offers?listingId=${listing.id}&cityId=${listing.cityId}`
			);
		}
	}

	function goToEventDetailsPage(listing) {
		navigateTo(
			`/HomePage/EventDetails?listingId=${listing.id}&cityId=${listing.cityId}`
		);
	}

	function handleEditListingsClick() {
		listings.listings.forEach((listing) => goToEditListingsPage(listing));
	}

	//Navigate to Edit Listings page Starts

	return (
		<section className="bg-slate-600 body-font relative">
			<SideBar
				handleGetAllListings={() => {
					getListings().then((response) => {
						setListings([...sortOldest(response.data.data)]);
						setViewAllListings(true);
					});
				}}
				handleGetUserListings={() => {
					getUserListings().then((response) => {
						setListings([...sortOldest(response.data.data)]);
						setViewAllListings(false);
					});
				}}
			/>
			<div class="container px-0 sm:px-0 py-0 w-full fixed top-0 z-10 lg:px-5 lg:w-auto lg:relative">
				<Popover className="relative bg-black mr-0 ml-0 px-10 lg:rounded-lg h-16">
					<div className="w-full">
						<div className="flex items-center justify-end xl:justify-center lg:justify-center md:justify-end sm:justify-end border-gray-100 py-5 md:space-x-10">
							<div class="hidden lg:block">
								<div class="ml-10 flex items-baseline space-x-20">
									{userRole === 3 && (
										<a
											class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold cursor-pointer"
											aria-current="page"
										>
											All Listings
										</a>
									)}
									<a class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold cursor-pointer">
										Published
									</a>
									<a class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold cursor-pointer">
										Pending
									</a>
									<a class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold cursor-pointer">
										Expired
									</a>
								</div>
							</div>

							{/* <div class="-my-2 -mr-2 lg:hidden">
              <Popover.Button class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div> */}

							{/* <div class="hidden md:block">
                <div className="justify-end mt-0 ml-0 flex items-baseline space-x-4">
                  <select
                    id="language"
                    name="language"
                    onChange={handleLanguageChange}
                    value={selectedLanguage}
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700"
                  >
                    <option value={null} disabled selected>
                      Select a language
                    </option>
                    {languages.map((language) => (
                      <option key={language.language} value={language.language}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

							{/* <div class="hidden md:block">
                <div class="flex justify-center">
                  <div class="mb-0">
                    <div class="relative mb-0 flex w-full flex-wrap items-stretch">
                      <input
                        type="search"
                        class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />
                      <button
                        class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase bg-white leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="h-5 w-5">
                          <path
                            fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
						</div>
					</div>

					<Transition
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							className="absolute inset-x-0 top-0 origin-top-right transform p-0 transition lg:hidden"
						>
							<div className="divide-y-2 divide-gray-50 bg-black shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="space-y-6 py-6 px-5">
									<div className="-my-2 -mr-2 lg:hidden flex justify-end">
										<Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="sr-only">Close menu</span>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>

									<div class="space-y-1">
										<div
											class="lg:hidden flex justify-center text-center"
											id="mobile-menu"
										>
											<div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
												<a
													class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
													aria-current="page"
												>
													All Listings
												</a>

												<a class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer">
													Publsihed
												</a>

												<a class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer">
													Pending
												</a>

												<a class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer">
													Expired
												</a>
											</div>
										</div>

										{/* <div class="md:hidden flex justify-center px-3 py-2" id="mobile-menu">
                      <div className="flex items-center justify-end">
                        <select
                          id="language"
                          name="language"
                          onChange={handleLanguageChange}
                          value={selectedLanguage}
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700"
                        >
                          <option value={null} disabled selected>
                            Select a language
                          </option>
                          {languages.map((language) => (
                            <option key={language.language} value={language.language}>
                              {language.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}

										{/* <div class="md:hidden flex justify-center px-3 py-2" id="mobile-menu">
                      <div class="flex justify-center">
                        <div class="mb-0">
                          <div class="relative mb-0 flex w-full flex-wrap items-stretch">
                            <input
                              type="search"
                              class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                              placeholder="Search"
                              aria-label="Search"
                              aria-describedby="button-addon1" />
                            <button
                              class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase bg-white leading-tight text-blackshadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                              type="button"
                              id="button-addon1"
                              data-te-ripple-init
                              data-te-ripple-color="light">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="h-5 w-5">
                                <path
                                  fill-rule="evenodd"
                                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                  clip-rule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</div>

			<html class="h-full bg-gray-100" />
			<body class="h-full" />

			<div class="container w-auto px-0 lg:px-5 py-2 bg-slate-600 h-screen">
				<div class="bg-white mt-20 p-0 space-y-10 overflow-x-auto">
					<table class="w-full text-sm text-left lg:mt-[2rem] mt-[2rem] text-gray-500 dark:text-gray-400 p-6 space-y-10 rounded-lg">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
							<tr>
								<th scope="col" class="px-6 sm:px-6 py-3">
									Listings
								</th>
								<th scope="col" class="px-6 sm:px-3 py-3 hidden lg:table-cell">
									Category
								</th>
								<th scope="col" class="px-6 py-3 hidden lg:table-cell">
									Date of Creation
								</th>
								<th scope="col" class="px-6 py-3">
									Edit
								</th>
								<th scope="col" class="px-6 py-3">
									Action
								</th>
								{viewAllListings && (
									<th scope="col" class="px-6 py-3">
										UserName
									</th>
								)}
								<th scope="col" class="px-6 py-3 text-center">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{listings.map((listing) => {
								return (
									<tr class="bg-white border-b dark:bg-white dark:border-white hover:bg-gray-50 dark:hover:bg-gray-50">
										<th
											scope="row"
											class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
											onClick={() => goToEventDetailsPage(listing)}
										>
											<img
												class="w-10 h-10 rounded-full hidden sm:table-cell"
												src={listing.image}
												alt="avatar"
											/>
											<div class="pl-0 sm:pl-3">
												<div class="font-normal text-gray-500">
													{listing.title}
												</div>
											</div>
										</th>
										<td class="px-6 py-4 hidden lg:table-cell">
											{categoryById[listing.categoryId]}
										</td>
										<td class="px-6 py-4 hidden lg:table-cell">
											{new Date(listing.createdAt).toLocaleString("de")}
										</td>
										<td class="px-6 py-4">
											<a
												class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
												onClick={() => goToEditListingsPage(listing)}
											>
												Edit
											</a>
										</td>
										<td class="px-6 py-4">
											<a
												class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
												onClick={() => navigateTo("/OverviewPage")}
											>
												Action
											</a>
										</td>
										{viewAllListings && (
											<td class="px-6 py-4">
												<a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
													{usersList?.filter((user) => {
														return user.id === listing.userId;
													})[0]
														? usersList?.filter((user) => {
																return user.id === listing.userId;
														  })[0]["username"]
														: ""}
												</a>
											</td>
										)}
										<td class="px-6 py-4">
											<div class="flex items-center">
												<div
													class={`h-2.5 w-2.5 rounded-full ${getStatusClass(
														listing.statusId
													)} mr-2`}
												></div>
												{viewAllListings ? (
													<Select
														onChange={(e) => handleChnageInStatus(e, listing)}
														value={listing.statusId}
													>
														{Object.keys(status).map((state) => {
															return (
																<>
																	<option className="p-0" value={state}>
																		{status[state]}
																	</option>
																</>
															);
														})}
													</Select>
												) : (
													<h1>{status[listing.statusId]}</h1>
												)}
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
