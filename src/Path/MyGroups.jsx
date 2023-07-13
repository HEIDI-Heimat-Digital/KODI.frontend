import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../index.css";
import { getUserForums } from "../Services/forumsApi";
import { status } from "../Constants/status";
import GROUPIMAGE from "../assets/GroupImage.avif";

const MyGroups = () => {
	const { t } = useTranslation();
	const [forums, setForums] = useState([]);
	const [, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const accessToken =
			window.localStorage.getItem("accessToken") ||
			window.sessionStorage.getItem("accessToken");
		const refreshToken =
			window.localStorage.getItem("refreshToken") ||
			window.sessionStorage.getItem("refreshToken");
		if (accessToken || refreshToken) {
			setIsLoggedIn(true);
		}
		getUserForums().then((response) => {
			setForums(response.data.data);
			console.log(response.data.data);
		});
	}, []);
	const [pageNo, setPageNo] = useState(1);

	function getStatusClass(statusId) {
		if (status[statusId] === "Active") {
			return "bg-green-400";
		}
		if (status[statusId] === "Inactive") {
			return "bg-red-400";
		}
		if (status[statusId] === "Pending") {
			return "bg-yellow-400";
		}
	}

	const navigate = useNavigate();
	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	return (
		<section className="bg-slate-600 body-font relative h-screen">
			<SideBar />

			<div className="container w-auto px-0 lg:px-5 py-2 bg-slate-600 min-h-screen flex flex-col">
				<div className="h-full">
					<div className="bg-white mt-10 p-0 space-y-10 overflow-x-auto">
						<table className="w-full text-sm text-left lg:mt-[2rem] mt-[2rem] text-gray-500 dark:text-gray-400 p-6 space-y-10 rounded-lg">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-50 dark:text-gray-700">
								<tr>
									<th
										scope="col"
										className="px-6 sm:px-6 py-3"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "16.67%",
										}}
									>
										{t("groupName")}
									</th>
									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "16.67%",
										}}
									>
										{t("members")}
									</th>
									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center hidden lg:table-cell"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "16.67%",
										}}
									>
										{t("date_of_creation")}
									</th>

									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center hidden lg:table-cell"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "16.67%",
										}}
									>
										{t("admin")}
									</th>

									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center hidden lg:table-cell"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "16.67%",
										}}
									>
										{t("privacy")}
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-center"
										style={{ fontFamily: "Poppins, sans-serif" }}
									>
										{t("status")}
									</th>
								</tr>
							</thead>
							<tbody>
								{forums.map((forum) => {
									return (
										<tr
											key={forum.id}
											className="bg-white border-b dark:bg-white dark:border-white hover:bg-gray-50 dark:hover:bg-gray-50"
										>
											<th
												scope="row"
												className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
											>
												<img
													className="w-10 h-10 rounded-full hidden sm:table-cell"
													src={
														forum.logo
															? process.env.REACT_APP_BUCKET_HOST + forum.logo
															: GROUPIMAGE
													}
													alt="avatar"
												/>
												<div className="pl-0 sm:pl-3 overflow-hidden max-w-[20rem]">
													<div
														className="font-normal text-gray-500 truncate"
														style={{ fontFamily: "Poppins, sans-serif" }}
													>
														{forum.forumName}
													</div>
												</div>
											</th>

											<td
												className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer text-center"
												style={{ fontFamily: "Poppins, sans-serif" }}
												onClick={() => navigateTo("/MyGroups/GroupMembers")}
											>
												{t("members")}
											</td>

											<td
												className="px-6 py-4 hidden lg:table-cell text-center"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												{new Date(forum.JoinedAt).toLocaleString("de")}
											</td>

											<td
												className="px-6 py-4 hidden lg:table-cell text-center"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												{forum.isAdmin === 1 ? "You are admin" : "Member"}
											</td>
											<td
												className="px-6 py-4 hidden lg:table-cell text-center"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												{forum.isPrivate === 1
													? "Private group"
													: "Public group"}
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center justify-center">
													<div
														className={`h-2.5 w-2.5 rounded-full ${getStatusClass(
															forum.statusId
														)} mr-2`}
													></div>
													<h1 style={{ fontFamily: "Poppins, sans-serif" }}>
														{status[forum.statusId]
															? t(status[forum.statusId].toLowerCase())
															: ""}
													</h1>
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
								style={{ fontFamily: "Poppins, sans-serif" }}
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
								className="text-lg px-3 hover:bg-gray-800 cursor-pointer rounded-lg"
								onClick={() => setPageNo(pageNo + 1)}
								style={{ fontFamily: "Poppins, sans-serif" }}
							>
								{">"}
							</span>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyGroups;