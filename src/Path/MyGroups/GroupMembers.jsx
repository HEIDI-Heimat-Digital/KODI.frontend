import React, { useState, useEffect } from "react";
import SideBar from "../../Components/SideBar";
import { useTranslation } from "react-i18next";
import "../../index.css";
import {
	getForumMembers,
	deleteForumMembers,
	adminStatusChange,
} from "../../Services/forumsApi";
import GROUPIMAGE from "../../assets/GroupImage.avif";
import { useNavigate } from "react-router-dom";
import ForumNavbar from "../../Components/ForumNavbar";
import { getUserId } from "../../Services/usersApi";

const GroupMembers = () => {
	const { t } = useTranslation();
	const [members, setMembers] = useState([]);
	const [cityId, setCityId] = useState(0);
	const [forumId, setForumId] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		document.title = "Forum Members";
		const cityIdParam = parseInt(urlParams.get("cityId"));
		const forumIdParam = parseInt(urlParams.get("forumId"));

		async function fetchData() {
			try {
				const response = await getForumMembers(cityIdParam, forumIdParam);
				const membersData = response.data.data;
				console.log(membersData);
				setMembers(membersData);

				const loggedInUserIdResponse = getUserId();
				const loggedInUserIsAdmin = membersData.filter(
					(m) =>
						m.userId === parseInt(loggedInUserIdResponse) && m.isAdmin === 1
				);

				setIsAdmin(loggedInUserIsAdmin.length > 0);

				setCityId(cityIdParam);
				setForumId(forumIdParam);
			} catch (error) {
				navigateTo("/Error");
			}
		}

		fetchData();
	}, []);

	const handleAdminToggle = async (member) => {
		const urlParams = new URLSearchParams(window.location.search);
		const cityIdParam = parseInt(urlParams.get("cityId"));
		const forumIdParam = parseInt(urlParams.get("forumId"));
		const newIsAdminValue = member.isAdmin === 1 ? 0 : 1;

		try {
			await adminStatusChange(
				cityIdParam,
				forumIdParam,
				member.memberId,
				newIsAdminValue
			);
			setMembers((prevMembers) =>
				prevMembers.map((m) =>
					m.userId === member.userId ? { ...m, isAdmin: newIsAdminValue } : m
				)
			);
		} catch (error) {
			console.error("Error changing admin status:", error);
		}
	};

	const [showConfirmationModal, setShowConfirmationModal] = useState({
		visible: false,
		members: null,
		onConfirm: () => { },
		onCancel: () => { },
	});

	function handleRemove(member) {
		const searchParams = new URLSearchParams(window.location.search);
		const cityId = searchParams.get("cityId");
		const forumId = searchParams.get("forumId");

		deleteForumMembers(cityId, forumId, member.memberId)
			.then(() => {
				setShowConfirmationModal({ visible: false });
			})
			.catch((error) => console.log(error));
	}

	function removeMemberOnClick(members) {
		setShowConfirmationModal({
			visible: true,
			members,
			onConfirm: () => handleRemove(members),
			onCancel: () => setShowConfirmationModal({ visible: false }),
		});
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
			{isAdmin && <ForumNavbar cityId={cityId} forumId={forumId} />}
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
											width: "20%",
										}}
									>
										{t("members")}
									</th>

									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "20%",
										}}
									>
										{t("date_of_joining")}
									</th>

									<th
										scope="col"
										className="px-6 sm:px-6 py-3 text-center"
										style={{
											fontFamily: "Poppins, sans-serif",
											width: "20%",
										}}
									>
										{t("admin")}
									</th>

									{isAdmin && (
										<th
											scope="col"
											className="px-6 sm:px-6 py-3 text-center"
											style={{
												fontFamily: "Poppins, sans-serif",
												width: "20%",
											}}
										>
											{t("remove")}
										</th>
									)}

									{isAdmin && (
										<th
											scope="col"
											className="px-6 sm:px-6 py-3 text-center"
											style={{
												fontFamily: "Poppins, sans-serif",
												width: "20%",
											}}
										>
											{t("action")}
										</th>
									)}
								</tr>
							</thead>
							<tbody>
								{members.map((member, index) => {
									return (
										<tr
											key={index}
											className="bg-white border-b dark:bg-white dark:border-white hover:bg-gray-50 dark:hover:bg-gray-50"
										>
											<th
												scope="row"
												className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
											>
												<img
													className="w-10 h-10 rounded-full hidden sm:table-cell"
													src={
														member.image
															? process.env.REACT_APP_BUCKET_HOST + member.image
															: GROUPIMAGE
													}
													alt="avatar"
												/>
												<div className="pl-0 sm:pl-3 overflow-hidden max-w">
													<div
														className="font-normal text-gray-500 truncate"
														onClick={() =>
															navigateTo(`/ViewProfile/${member.username}`)
														}
														style={{ fontFamily: "Poppins, sans-serif" }}
													>
														{member.firstname} {member.lastname} (@
														{member.username})
													</div>
												</div>
											</th>

											<td
												className="px-6 py-4 text-center"
												style={{ fontFamily: "Poppins, sans-serif" }}
											>
												{new Date(member.joinedAt).toLocaleString("de")}
											</td>

											<td
												className="px-6 py-4 text-center"
												style={{
													fontFamily: "Poppins, sans-serif",
													color: member.isAdmin === 1 ? "green" : "red",
												}}
											>
												{member.isAdmin === 1 ? "Admin" : "Member"}
											</td>

											{isAdmin && (
												<td className="px-6 py-4 text-center">
													<a
														className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer text-center pr-0"
														onClick={() => removeMemberOnClick(member)}
														style={{ fontFamily: "Poppins, sans-serif" }}
													>
														{t("remove")}
													</a>
													{showConfirmationModal.visible && (
														<div className="fixed z-50 inset-0 overflow-y-auto">
															<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
																<div
																	className="fixed inset-0 transition-opacity"
																	aria-hidden="true"
																>
																	<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
																</div>
																<span
																	className="hidden sm:inline-block sm:align-middle sm:h-screen"
																	aria-hidden="true"
																>
																	&#8203;
																</span>
																<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
																	<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
																		<div className="sm:flex sm:items-start">
																			<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
																				<svg
																					className="h-6 w-6 text-red-700"
																					xmlns="http://www.w3.org/2000/svg"
																					fill="none"
																					viewBox="0 0 24 24"
																					stroke="currentColor"
																					aria-hidden="true"
																				>
																					<path
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						strokeWidth="2"
																						d="M6 18L18 6M6 6l12 12"
																					/>
																				</svg>
																			</div>
																			<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
																				<h3 className="text-lg leading-6 font-medium text-gray-900">
																					{t("areyousure")}
																				</h3>
																				<div className="mt-2">
																					<p className="text-sm text-gray-500">
																						Do you really want to remove this
																						member? This action cannot be
																						reverted.
																					</p>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
																		<button
																			onClick={showConfirmationModal.onConfirm}
																			type="button"
																			className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
																		>
																			{t("remove")}
																		</button>

																		<button
																			onClick={showConfirmationModal.onCancel}
																			type="button"
																			className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
																		>
																			{t("cancel")}
																		</button>
																	</div>
																</div>
															</div>
														</div>
													)}
												</td>
											)}
											{isAdmin && (
												<td className="px-6 py-4 text-center">
													<button
														className={`font-medium hover:underline cursor-pointer text-center ${member.isAdmin === 1
															? "text-red-500"
															: "text-green-500"
															}`}
														style={{
															fontFamily: "Poppins, sans-serif",
														}}
														onClick={() => handleAdminToggle(member)}
													>
														{member.isAdmin === 1
															? "Remove admin"
															: "Make admin"}
													</button>
												</td>
											)}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<div className="bottom-5 right-5 mt-5 px-1 py-2 text-xs font-medium text-center float-left cursor-pointer">
						<button
							type="button"
							className="inline-block rounded-xl bg-black px-3 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
							style={{ fontFamily: "Poppins, sans-serif" }}
							onClick={() => navigateTo("/MyGroups")}
						>
							{t("backToMyGroups")}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GroupMembers;