import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import LOGO from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../Services/login";

export default function HomePageNavBar() {
	let navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	var accessToken;
	var refreshToken;

	useEffect(() => {
		accessToken = window.localStorage.getItem("accessToken");
		refreshToken = window.localStorage.getItem("refreshToken");
		//const userId = window.localStorage.getItem('userId');
		if (accessToken || refreshToken) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLoginLogout = () => {
		if (isLoggedIn) {
			logout({ accesToken: accessToken, refreshToken: refreshToken });
			window.localStorage.removeItem("accessToken");
			window.localStorage.removeItem("refreshToken");
			window.localStorage.removeItem("userId");
			setIsLoggedIn(false);
			navigateTo("/HomePage");
      alert('You have been logged out');
		} else {
			navigateTo("/");
		}
	};

	return (
		<div class="w-full fixed top-0 z-10">
			<Popover className="relative bg-white mr-0 ml-0 px-10">
				<div className="w-full">
					<div className="flex items-center justify-between border-gray-100 py-5 md:justify-start md:space-x-10">
						<div>
							<img
								class="mx-auto h-10 w-auto cursor-pointer"
								src={LOGO}
								alt="HEDI- Heimat Digital"
								onClick={() => navigateTo("/HomePage")}
							/>
						</div>
						<div className="-my-2 -mr-2 md:hidden">
							<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
								<span className="sr-only">Open menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>

						<div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-15">
							<a
								onClick={handleLoginLogout}
								className="ml-8 font-sans inline-flex items-center justify-center whitespace-nowrap rounded-md border border-bg-slate-300 px-8 py-2 text-base font-semibold text-gray-600 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer"
							>
								{isLoggedIn ? t("logOut") : t("login")}
							</a>
							<a
								onClick={() =>
									isLoggedIn ? navigateTo("/OverviewPage") : navigateTo("/")
								}
								className="ml-8 font-sans inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-800 px-8 py-2 text-base font-semibold text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] cursor-pointer"
							>
								{t("submit")}
							</a>
						</div>
					</div>
				</div>
			</Popover>
		</div>
	);
}
