	import React, { useState, useEffect, Fragment } from "react";
	import SideBar from "../Components/SideBar";
	import { useNavigate } from "react-router-dom";
	import { useTranslation } from "react-i18next";
	import "../index.css";
	import { FaBell } from "react-icons/fa";
	import Alert from "../Components/Alert";
	import { getProfile, updateProfile, deleteAccount } from "../Services/usersApi";

	const AccountSettings = () => {
	const { t, i18n } = useTranslation();
	const [alertInfo, setAlertInfo] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("");

	const [input, setInput] = useState({
		username: "",
		email: "",
		phoneNumber: "",
	});

	useEffect(() => {
		document.title = "Heidi - Account Settings";
		getProfile().then((response) => {
		setInput(response.data.data);
		});
	}, []);

	let navigate = useNavigate();
	const navigateTo = (path) => {
		if (path) {
		navigate(path);
		}
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
		...prev,
		[name]: value,
		}));
	};

	const handleSave = async (event) => {
		event.preventDefault();
		try {
		await updateProfile(input);
		setAlertInfo(true);
		setAlertType("success");
		setAlertMessage("You data has been updated");
		setTimeout(() => {
			setAlertInfo(false);
		}, 5000);
		} catch (err) {
		setAlertInfo(true);
		setAlertType("danger");
		setAlertMessage("Failed. " + err.response.data.message);
		}
	};

	const [showConfirmationModal, setShowConfirmationModal] = useState({
		visible: false,
		onConfirm: () => {},
		onCancel: () => {}
	});

	const handleDeleteAccount = () => {
		deleteAccount()
		.then(() => {
			window.localStorage.removeItem("accessToken");
			window.localStorage.removeItem("refreshToken");
			window.localStorage.removeItem("userId");
			window.sessionStorage.removeItem("accessToken");
			window.sessionStorage.removeItem("refreshToken");
			window.sessionStorage.removeItem("userId");
			window.location.href = "/";
			setShowConfirmationModal({ visible: false });
		})
		.catch((error) => {
			console.log(error);
		});
	};

	function deleteAccountOnClick() {
		setShowConfirmationModal({
		visible: true,
		onConfirm: () => handleDeleteAccount(),
		onCancel: () => setShowConfirmationModal({ visible: false }),
		});
	}

	return (
		<section className="bg-slate-600 body-font relative h-screen">
		<SideBar />
		<>
			<div class="container w-auto px-5 py-2 bg-slate-600">
			<div class="bg-white mt-4 p-6 space-y-10">
				<h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
				{t("updatePassword")}
				<div className="my-4 bg-gray-600 text-base h-[1px]">
					<label class="block px-2 py-2 text-gray-600">
					{t("Need_to_change_your_password")}
					</label>
				</div>
				</h2>
				<button
				id="finalbutton"
				class="w-full bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 mt-4 rounded-md"
				onClick={() => {
					navigateTo("/PasswordUpdate");
				}}
				>
				{t("updatePassword")}
				</button>
			</div>
			</div>
			<div class="container w-auto px-5 py-2 bg-slate-600">
			<div class="bg-white mt-4 p-6">
				<h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
				{t("personalInformation")}
				<div className="my-4 bg-gray-600 h-[1px]" />
				</h2>
				<div class="relative mb-4">
				<div class="pb-6">
					<label class="block px-2 text-sm font-medium text-gray-500">
					{t("displayed_publicly")}
					</label>
				</div>
				<div class="py-2 grid grid-cols-1 md:grid-cols-2">
					<div class="mt-1 px-2">
					<label class="block text-md font-medium text-gray-600">
						{t("emailId")}
					</label>
					<input
						type="text"
						name="email"
						value={input.email}
						id="email"
						class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						placeholder={t("enter_email")}
						onChange={onInputChange}
					/>
					</div>
					<div class="mt-1 px-2">
					<label
						htmlFor="phoneNumber"
						class="block text-md font-medium text-gray-600"
					>
						{t("phoneNumber")}
					</label>
					<input
						type="text"
						name="phoneNumber"
						value={input.phoneNumber}
						id="phoneNumber"
						class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						placeholder={t("enter_phone")}
						onChange={onInputChange}
					/>
					</div>
				</div>
				</div>
				<div className="py-2 mt-1 px-2">
				<button
					className="w-full hover:bg-slate-600 text-white font-bold py-2 px-4 rounded bg-black disabled:opacity-60"
					id="finalbutton"
					class="w-full bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 mt-4 rounded-md"
					onClick={handleSave}
				>
					{t("saveChanges")}{" "}
				</button>
				</div>
				{alertInfo && (
				<div class="py-2 mt-1 px-2">
					<Alert type={alertType} message={alertMessage} />
				</div>
				)}
			</div>
			</div>
			<div class="container w-auto px-5 py-2 bg-slate-600">
			<div class="bg-white mt-4 p-6">
				<h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
				{t("deleteAccount")}
				<div className="my-4 bg-gray-600 text-base h-[1px]">
					<label class="block px-2 py-2 text-gray-600">
					{t("need_to_delete_account")}
					</label>
				</div>
				</h2>
				<div className="py-2 mt-1 px-2">
				<button
					className="w-full hover:bg-slate-600 text-white font-bold py-2 px-4 rounded bg-black disabled:opacity-60"
					id="finalbutton"
					class="w-full bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 mt-4 rounded-md"
					onClick={deleteAccountOnClick}
				>
					{t("deleteAccount")}{" "}
				</button>
				{showConfirmationModal.visible && (
					<div className="fixed z-10 inset-0 overflow-y-auto">
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
								className="h-6 w-6 text-red-600"
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
									{t("doyoureallywanttodeleteAccount")}
								</p>
								</div>
							</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
							onClick={showConfirmationModal.onConfirm}
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
							{t("delete")}
							</button>

							<button
							onClick={showConfirmationModal.onCancel}
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
							>
							{t("cancel")}
							</button>
						</div>
						</div>
					</div>
					</div>
				)}
				</div>
			</div>
			</div>
		</>
		</section>
	);
	};

	export default AccountSettings;
