import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeidiLogo from "../assets/HEIDI_Logo.png";
import { useTranslation } from "react-i18next";
import { register } from "../Services/usersApi";
import Alert from "../Components/Alert";

const Register = () => {
	const { t } = useTranslation();
	const [alertInfo, setAlertInfo] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("");

	useEffect(() => {
		document.title = "Register";
	}, []);

	const navigate = useNavigate();
	const routeChangeToLogin = () => {
		const path = `/login`;
		navigate(path);
	};

	const navigateTo = (path) => {
		if (path) {
			navigate(path);
		}
	};

	const [isChecked, setIsChecked] = useState(false);

	const [input, setInput] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
		validateInput(e);
	};

	input.role = 3;

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await register(input);
			setAlertInfo(true);
			setAlertType("success");
			setAlertMessage(
				"Registration Successfull. A mail has been sent to your email Id. Please verify to continue. \nRedirecting to login page in 10s"
			);
			setTimeout(() => {
				routeChangeToLogin();
			}, 10000);
		} catch (err) {
			setAlertInfo(true);
			setAlertType("danger");
			setAlertMessage("Failed. " + err.response.data.message);
		}
	};

	const validateInput = (e) => {
		const { name, value } = e.target;
		setError((prev) => {
			const stateObj = { ...prev, [name]: "" };

			switch (name) {
				case "username":
					if (!value) {
						stateObj[name] = t("pleaseEnterUsername");
					} else if (value.length < 6) {
						stateObj[name] = t("userNameTooShort");
					} else if (value.length > 15) {
						stateObj[name] = t("userNameTooLong");
					} else if (
						value[0] === value[0].toUpperCase() ||
						/\s/.test(value) ||
						/^_/.test(value) ||
						/^[^a-z_]/.test(value) ||
						/[&='+,;<>.]/.test(value)
					) {
						stateObj[name] = t("userNameValidation");
					}
					break;
				case "email":
					if (!value) {
						stateObj[name] = t("pleaseEnterEmailAddress");
					}
					break;
				case "password":
					if (!value) {
						stateObj[name] = t("pleaseEnterPassword");
					} else if (
						!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&]).{8,}/.test(value)
					) {
						stateObj[name] = t("passwordValidation");
					} else if (input.confirmPassword && value !== input.confirmPassword) {
						stateObj.confirmPassword = t("passwordsDoNotMatch");
					} else if (value.includes(input.username)) {
						stateObj[name] = t("passwordContainsUsername");
					} else {
						stateObj.confirmPassword = input.confirmPassword
							? ""
							: error.confirmPassword;
					}
					break;

				case "confirmPassword":
					if (!value) {
						stateObj[name] = t("pleaseConfirmPassword");
					} else if (input.password && value !== input.password) {
						stateObj[name] = t("passwordsDoNotMatch");
					}
					break;

				default:
					break;
			}

			return stateObj;
		});
	};

	return (
		<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<img
						onClick={() => navigate("/")}
						className="mx-auto h-20 w-auto cursor-pointer"
						src={HeidiLogo}
						alt="HEDI- Heimat Digital"
					/>
					<h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						{t("createAccount")}
					</h3>
				</div>
				<div className="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" value="true" />
					<div className="space-y-2 rounded-md shadow-sm">
						<div>
							<span className="grid grid-cols-2 gap-2">
								<label htmlFor="firstname" className="sr-only">
									{t("firstName")}
								</label>
								<input
									name="firstname"
									value={input.firstname}
									type="text"
									required
									onChange={onInputChange}
									onBlur={validateInput}
									autoComplete="on"
									placeholder={t("pleaseEnterFirstName") + "*"}
									className="appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								></input>
								<label htmlFor="lastname" className="sr-only">
									{t("lastName")}
								</label>
								<input
									name="lastname"
									value={input.lastname}
									type="text"
									required
									onChange={onInputChange}
									onBlur={validateInput}
									autoComplete="on"
									placeholder={t("pleaseEnterLastName") + "*"}
									className="appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								></input>
							</span>
						</div>
						<div>
							<label htmlFor="username" className="sr-only">
								{t("username") + "*"}
							</label>
							<input
								id="username"
								name="username"
								value={input.username}
								type="text"
								autoComplete="on"
								onChange={onInputChange}
								onBlur={validateInput}
								required
								className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder={t("pleaseEnterUsername") + "*"}
							></input>
							{error.username && <span className="err">{error.username}</span>}
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								{t("email") + "*"}
							</label>
							<input
								id="emailaddress"
								name="email"
								type="email"
								value={input.email}
								onChange={onInputChange}
								onBlur={validateInput}
								autoComplete="email"
								required
								className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder={t("pleaseEnterEmailAddress") + "*"}
							></input>
							{error.email && <span className="err">{error.email}</span>}
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								{t("password") + "*"}
							</label>
							<input
								name="password"
								type="password"
								value={input.password}
								onChange={onInputChange}
								onBlur={validateInput}
								required
								className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder={t("pleaseEnterPassword") + "*"}
							></input>
							{error.password && <span className="err">{error.password}</span>}
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								{t("confirmPassword")}
							</label>
							<input
								name="confirmPassword"
								type="password"
								value={input.confirmPassword}
								onChange={onInputChange}
								onBlur={validateInput}
								required
								className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 hover:scale-102 hover:border-sky-800 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder={t("pleaseConfirmPassword") + "*"}
							></input>
							{error.confirmPassword && (
								<span className="err">{error.confirmPassword}</span>
							)}
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								name="remember-me"
								type="checkbox"
								onChange={() => setIsChecked(!isChecked)}
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900"
							>
								{t("i_hereby_accept_the")}
								<a
									onClick={() => {
										navigateTo("/PrivacyPolicy");
									}}
									target="_blank"
									rel="noopener noreferrer"
									className="text-red-500 hover:text-red-300"
								>
									{t("privacy_policy")}
								</a>
								{t("and_the")}
								<a
									onClick={() => {
										navigateTo("/ImprintPage");
									}}
									className="text-red-500 hover:text-red-300"
								>
									{t("terms_conditions")}
								</a>
							</label>
						</div>
					</div>

					<div>
						<button
							type="submit"
							onClick={handleSubmit}
							disabled={!isChecked}
							id="finalbutton"
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white  hover:text-slate-400 focus:outline-none focus:ring-2 focus:text-gray-400 focus:ring-offset-2"
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-gray-50 group-hover:text-slate-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							{t("register")}
						</button>
					</div>
					{alertInfo && (
						<div className="py-2 mt-1 px-2">
							<Alert type={alertType} message={alertMessage} />
						</div>
					)}
					<div className="text-sm">
						{t("accountPresent")}
						<span
							onClick={routeChangeToLogin}
							className="font-medium cursor-pointer text-black hover:text-gray-500"
						>
							{t("loginHere")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Register;
