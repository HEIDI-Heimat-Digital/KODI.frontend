import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import DeleteConfirmation from "../Components/DeleteConfirmation";
import { getUserListings, getProfile } from "../Services/usersApi";
import {
	getListings,
	updateListingsData,
	deleteListing,
} from "../Services/listingsApi";
import { useNavigate } from "react-router-dom";
import { sortLatestFirst } from "../Services/helper";
import { categoryById } from "../Constants/categories";
import { status, statusByName } from "../Constants/status";
import { useTranslation } from "react-i18next";
import { Select } from "@chakra-ui/react";
import { Fragment } from "react";
import LISTINGSIMAGE from "../assets/ListingsImage.jpeg";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "../Services/login";

const dashboardStyle = require("../Path/Dashboard.css");

const Dashboard = () => {
	window.scrollTo(0, 0);
	const { t } = useTranslation();
	const [listings, setListings] = useState([]);
	const [userRole, setUserRole] = useState(3);
	const [viewAllListings, setViewAllListings] = useState(null);
	const [pageNo, setPageNo] = useState(1);
	const [selectedStatus, setSelectedStatus] = useState(null);

	useEffect(() => {
		getProfile().then((response) => {
			setUserRole(response.data.data.roleId);
		});
		if (window.location.pathname == "/Dashboard") {
			setViewAllListings(false);
		} else  {
			setViewAllListings(true);
		}
		document.title = "Dashboard";
	}, [window.location.pathname]);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() =>{
		if (!isLoggedIn) {
			navigateTo("/login");
		}
	},[])

	useEffect(() => {
		if (pageNo == 1) {
			fetchListings();
		}
		else {
			// setPageNo(1);
			fetchListings();
			}
	}, [selectedStatus, viewAllListings, pageNo]);

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

	function fetchListings() {
		if (viewAllListings == true) {
			getListings({ statusId: selectedStatus, pageNo }).then((response) => {
				setListings((response.data.data));
			});
		}
		if (viewAllListings == false){
			getUserListings({ statusId: selectedStatus, pageNo }).then((response) => {
				setListings((response.data.data));
			});
		}
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

	function handleChangeInStatus(newStatusId, listing) {
		updateListingsData(listing.cityId, { statusId: newStatusId }, listing.id)
			.then((res) => {
				let tempListings = listings;
				tempListings[tempListings.indexOf(listing)].statusId = newStatusId;
				setListings([...tempListings]);
			})
			.catch((error) => console.log(error));
	}

	//Navigate to Edit Listings page Starts
	function goToEditListingsPage(listing) {
		navigateTo(
			`/UploadListings?listingId=${listing.id}&cityId=${listing.cityId}`
		);
	}

		const [showConfirmationModal, setShowConfirmationModal] = useState({
			visible: false,
			listing: null,
			onConfirm: () => {},
			onCancel: () => {}
		});

		function handleDelete(listing) {
			deleteListing(listing.cityId, listing.id)
			  .then((res) => {
				setListings(listings.filter((l) => l.cityId !== listing.cityId || l.id !== listing.id));
				setShowConfirmationModal({ visible: false }); // hide the confirmation modal
			  })
			  .catch((error) => console.log(error));
		  }

		function deleteListingOnClick(listing) {
			setShowConfirmationModal({
			visible: true,
			listing,
			onConfirm: () => handleDelete(listing),
			onCancel: () => setShowConfirmationModal({ visible: false }),
			});
		}

	function goToEventDetailsPage(listing) {
		navigateTo(
			`/HomePage/EventDetails?listingId=${listing.id}&cityId=${listing.cityId}`
		);
	}

	//Navigate to Edit Listings page Starts

	return (
		<section className="bg-slate-600 body-font relative">
			<SideBar
			/>

			<div class="container px-0 sm:px-0 py-0 w-full fixed top-0 z-10 lg:px-5 lg:w-auto lg:relative">
				<Popover className="relative bg-black mr-0 ml-0 px-10 lg:rounded-lg h-16">
					<div className="w-full">
						<div className="w-full h-full flex items-center lg:py-2 py-5 justify-end xl:justify-center lg:justify-center border-gray-100 md:space-x-10">
							<div class="hidden lg:block">
								<div class="w-full h-full flex items-center justify-end xl:justify-center lg:justify-center md:justify-end sm:justify-end border-gray-100 md:space-x-10">
									<div
										class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
										onClick={() => setSelectedStatus(null)}
									>
										{t("allListings")}
									</div>
									<div
										class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
										onClick={() => setSelectedStatus(statusByName.Active)}
									>
										{t("active")}
									</div>
									<div
										class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
										onClick={() => setSelectedStatus(statusByName.Pending)}
									>
										{t("pending")}
									</div>
									<div
										class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
										onClick={() => setSelectedStatus(statusByName.Inactive)}
									>
										{t("inactive")}
									</div>
								</div>
							</div>

							<div class="-my-2 -mr-2 lg:hidden">
								<Popover.Button class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span class="sr-only">Open menu</span>
									<Bars3Icon class="h-6 w-6" aria-hidden="true" />
								</Popover.Button>
							</div>
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
												<div
													class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
													onClick={() => setSelectedStatus(null)}
												>
													{t("allListings")}
												</div>
												<div
													class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
													onClick={() => setSelectedStatus(statusByName.Active)}
												>
													{t("active")}
												</div>
												<div
													class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
													onClick={() =>
														setSelectedStatus(statusByName.Pending)
													}
												>
													{t("pending")}
												</div>
												<div
													class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-4 text-sm font-bold cursor-pointer"
													onClick={() =>
														setSelectedStatus(statusByName.Inactive)
													}
												>
													{t("inactive")}
												</div>
											</div>
										</div>
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
				<div class="bg-white mt-10 p-0 space-y-10 overflow-x-auto">
					<table class="w-full text-sm text-left lg:mt-[2rem] mt-[2rem] text-gray-500 dark:text-gray-400 p-6 space-y-10 rounded-lg">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
							<tr>
								<th scope="col" class="px-6 sm:px-6 py-3">
									{t("listings")}
								</th>
								<th scope="col" class="px-6 sm:px-3 py-3 hidden lg:table-cell">
									{t("category")}
								</th>
								<th scope="col" class="px-6 py-3 hidden lg:table-cell">
									{t("date_of_creation")}
								</th>
								<th scope="col" class="px-6 py-3">
									{t("action")}
								</th>
								{viewAllListings && (
									<th scope="col" class="px-6 py-3">
										{t("username")}
									</th>
								)}
								<th scope="col" class="px-6 py-3 text-center">
									{t("status")}
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
												src={
													listing.logo
														? process.env.REACT_APP_BUCKET_HOST + listing.logo
														: LISTINGSIMAGE
												}
												alt="avatar"
											/>
											<div class="pl-0 sm:pl-3 overflow-hidden max-w-[20rem]">
												<div class="font-normal text-gray-500 truncate">
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
												class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer pr-2"
												onClick={() => goToEditListingsPage(listing)}
											>
												{t("edit")}
											</a>
											<a
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
											onClick={() => deleteListingOnClick(listing)}
											>
											{t("delete")}
											</a>
											{showConfirmationModal.visible && (
												<div className="fixed z-10 inset-0 overflow-y-auto">
												<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
													<div className="fixed inset-0 transition-opacity" aria-hidden="true">
													<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
													</div>
													<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
													<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
													<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
														<div className="sm:flex sm:items-start">
														<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
															<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
															</svg>
														</div>
														<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
															<h3 className="text-lg leading-6 font-medium text-gray-900">{t("areyousure")}</h3>
															<div className="mt-2">
															<p className="text-sm text-gray-500">{t("doyoureallywanttodeleteListing")}</p>
															</div>
														</div>
														</div>
													</div>
													<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
													<button onClick={showConfirmationModal.onConfirm} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
														{t("delete")}
													</button>

													<button onClick={showConfirmationModal.onCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
														{t("cancel")}
													</button>

													</div>
													</div>
												</div>
												</div>
											)}
										</td>
										{viewAllListings && (
											<td class="px-6 py-4">
												<a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
													{listing.username}
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
														onChange={(e) =>
															handleChangeInStatus(e.target.value, listing)
														}
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
				<div className="bottom-5 right-5 mt-5 px-1 py-2 text-xs font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 float-right cursor-pointer">
					{pageNo !== 1 ? (
						<span
							className="text-md px-3 hover:bg-gray-800 cursor-pointer rounded-lg"
							onClick={() => setPageNo(pageNo - 1)}
						>
							{"<"}{" "}
						</span>
					) : (
						<span />
					)}
					<span className="text-lg px-3">
						{t("page")} {pageNo}
					</span>

					{listings.length >= 9 && (
						<span
						className="text-lg px-3 hover:bg-gray-800 cursor-pointer rounded-lg"
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

export default Dashboard;
