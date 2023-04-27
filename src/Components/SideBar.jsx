import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Resource/HEIDI_Logo_Landscape.png";
import "./sidebar.css";
import { useTranslation } from "react-i18next";
import { getProfile } from "../Services/usersApi";

function SideBar({ handleGetAllListings, handleGetUserListings }) {
	const { t, i18n } = useTranslation();
	const [loggedIn, setLoggedIn] = useState(true);

	const handleLogout = () => {
		try {
			window.localStorage.removeItem("accessToken");
			window.localStorage.removeItem("refreshToken");
			window.localStorage.removeItem("userId");
			window.sessionStorage.removeItem("accessToken");
			window.sessionStorage.removeItem("refreshToken");
			window.sessionStorage.removeItem("userId");
			setLoggedIn(false);
			window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	};

	function openSidebar() {
		let sideBar = document.querySelector(".sidebar");
		if (sideBar) {
			sideBar.classList.toggle("visible-sidebar");
		}
	}

	let navigate = useNavigate();
	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [userRole, setUserRole] = useState(3);
	useEffect(() => {
		getProfile()
			.then((response) => {
				setFirstname(response.data.data.firstname);
				setLastname(response.data.data.lastname);
				setProfilePic(response.data.data.image);
				setUserRole(response.data.data.roleId);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<span
				className="fixed text-white top-5 left-4 z-50 bg-black cursor-pointer"
				onClick={openSidebar}
			>
				<svg
					className="h-8 p-2 fill-current cursor-pointer"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
				</svg>
			</span>
			<div className="sidebar fixed top-0 bottom-0 p-2 w-[300px] z-50 overflow-y-auto text-center bg-black">
				<div className="text-gray-100 text-xl">
					<div className="p-2.5 mt-1 flex items-center">
						<img
							onClick={() => navigateTo("/")}
							className="p-5 cursor-pointer"
							src={logo}
							alt="HEDI- Heimat Digital"
						/>
						<span
							className="text-white bg-black cursor-pointer"
							onClick={openSidebar}
						>
							<svg
								className="fixed top-0 left-[255px] sm:left-[270px] h-8 p-2 z-5 fill-current cursor-pointer close-nav-bar"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 496 512"
							>
								<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
							</svg>
						</span>
					</div>
				</div>
				<div className="my-2 bg-gray-600 h-[1px]"></div>
				<div
					className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
					onClick={() => {
						navigateTo("/Dashboard");
						handleGetUserListings();
					}}
				>
					<svg
						className="h-6 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 496 512"
					>
						<path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" />
					</svg>
					<span className="text-[15px] ml-4 text-gray-200 font-bold">
						{t("myEntries")}
					</span>
				</div>
				<div
					className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
					onClick={() => {localStorage.setItem("selectedItem", "Choose one category"); navigateTo("/UploadListings")}}
				>
					<svg
						className="h-6 w-10 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 496 512"
					>
						<path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
					</svg>
					<span className="text-[15px] ml-4 text-gray-200 font-bold">
						{t("upload")}
					</span>
				</div>
				{userRole === 1 && (
					<div
						className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
						onClick={() => {
							navigate("/Dashboard");
							handleGetAllListings();
						}}
					>
						<svg
							className="h-6 w-10 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 487.3 487.3"
						>
							<path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1 C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1 c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4 s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8 c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8 C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8 C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7 C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"></path>{" "}
						</svg>
						<span className="text-[15px] ml-4 text-gray-200 font-bold">
							{t("allListings")}
						</span>
					</div>
				)}
				<div className="fixed bottom-2 w-[280px]">
					<div
						className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
						onClick={() => navigateTo("/profilePage")}
					>
						<svg
							className="h-6 w-10 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 496 512"
						>
							<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
						</svg>
						<div>{profilePic}</div>
						<span className="text-[15px] ml-4 text-gray-200 font-bold">
						{firstname + " "+ lastname}
						</span>
					</div>
					<div
						className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
						onClick={() => navigateTo("/AccountSettings")}
					>
						<svg
							className="h-6 w-10 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 496 512"
						>
						<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>						</svg>
						<div>{profilePic}</div>
						<span className="text-[15px] ml-4 text-gray-200 font-bold">
						{t("Account_Settings")}
						</span>
					</div>
					
					<div className="my-2 bg-gray-600 h-[1px]"></div>
	
					{loggedIn && (
						<div
							className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-slate-600 text-white"
							onClick={handleLogout}
						>
							<svg
								className="h-6 w-10 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 496 512"
							>
								<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
							</svg>
							<span className="text-[15px] ml-4 text-gray-200 font-bold">
								{t("logOut")}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default SideBar;
