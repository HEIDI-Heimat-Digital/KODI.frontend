import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../bodyContainer.css";
import SideBar from "../../Components/SideBar";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	getUserForums,
	getForum,
	forumPosts,
	updateForumPosts,
} from "../../Services/forumsApi";

import { getCities } from "../../Services/cities";
import FormData from "form-data";
import Alert from "../../Components/Alert";

function UploadPosts() {
	const { t } = useTranslation();
	const editor = useRef(null);
	const [newPost, setNewPost] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [cityId, setCityId] = useState(0);
	const [cities, setCities] = useState([]);
	// Drag and Drop starts
	const [image1, setImage1] = useState(null);
	const [, setDragging] = useState(false);

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		if (initialLoad) {
			window.scrollTo(0, 0);
			setInitialLoad(false);
		} else {
			const updateInputState = async () => {
				if (image1 !== null) {
					const form = new FormData();
					form.append("image", image1);
					try {
						const filePath = await imageUpload(form);
						if (filePath?.data?.status === "success") {
							setInput((prevInput) => ({
								...prevInput,
								image: filePath?.data?.path || null,
								removeImage: false,
							}));
						} else {
							console.error("Image upload failed:", filePath?.data?.message);
						}
					} catch (error) {
						console.error("Image upload error:", error);
					}
				}
			};

			updateInputState();
		}
	}, [initialLoad, image1]);

	function handleDragEnter(e) {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	}

	function handleDragLeave(e) {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	}

	function handleDragOver(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDrop1(e) {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			setImage1(file);
		}
		setDragging(false);
	}

	function handleInputChange(e) {
		e.preventDefault();
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setImage1(file);
		}
	}

	function handleRemoveImage1() {
		setImage1(null);
		setInput((prevInput) => ({ ...prevInput, image: null, removeImage: true }));
	}

	// Sending data to backend starts
	const [input, setInput] = useState({
		title: "",
		description: "",
		image: null,
		removeImage: false,
		visibility: "public",
	});

	const [error, setError] = useState({
		title: "",
		description: "",
		cityId: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		let valid = true;
		for (const key in error) {
			const errorMessage = getErrorMessage(key, input[key]);
			const newError = error;
			newError[key] = errorMessage;
			setError(newError);
			if (errorMessage) {
				valid = false;
			}
		}

		if (valid) {
			setUpdating(true);
			try {
				var response = newPost
					? await forumPosts(cityId, forumId, input)
					: await updateForumPosts(cityId, input, forumId);

				setSuccessMessage(t("postCreated"));
				setErrorMessage(false);
				setTimeout(() => {
					setSuccessMessage(false);
					navigate(`/Forum?cityId=${cityId}&forumId=${forumId}`);
				}, 5000);
			} catch (error) {
				setErrorMessage(t("changesNotSaved"));
				setSuccessMessage(false);
				setTimeout(() => setErrorMessage(false), 5000);
			}
			setUpdating(false);
		} else {
			setErrorMessage(t("invalidData"));
			setSuccessMessage(false);
			setTimeout(() => setErrorMessage(false), 5000);
		}
	};

	useEffect(() => {
		let valid = true;
		for (let property in error) {
			if (error[property]) {
				valid = false;
			}
		}
	}, [error]);

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
		validateInput(e);
	};

	const [description, setDescription] = useState("");

	const onDescriptionChange = (newContent) => {
		const hasNumberedList = newContent.includes("<ol>");
		const hasBulletList = newContent.includes("<ul>");
		let descriptions = [];
		let listType = "";
		if (hasNumberedList) {
			const regex = /<li>(.*?)(?=<\/li>|$)/gi;
			const matches = newContent.match(regex);
			descriptions = matches.map((match) => match.replace(/<\/?li>/gi, ""));
			descriptions = descriptions.map(
				(description, index) => `${index + 1}. ${description}`
			);
			listType = "ol";
		} else if (hasBulletList) {
			const regex = /<li>(.*?)(?=<\/li>|$)/gi;
			const matches = newContent.match(regex);
			descriptions = matches.map((match) => match.replace(/<\/?li>/gi, ""));
			descriptions = descriptions.map((description) => `- ${description}`);
			listType = "ul";
		} else {
			// No list tags found, treat the input as plain text
			setInput((prev) => ({
				...prev,
				description: newContent.replace(/(<br>|<\/?p>)/gi, ""), // Remove <br> and <p> tags
			}));
			setDescription(newContent);
			return;
		}
		const listHTML = `<${listType}>${descriptions
			.map((description) => `<li>${description}</li>`)
			.join("")}</${listType}>`;
		setInput((prev) => ({
			...prev,
			description: listHTML,
		}));
		setDescription(newContent);
	};

	const getErrorMessage = (name, value) => {
		switch (name) {
			case "title":
				if (!value) {
					return t("pleaseEnterTitle");
				} else {
					return "";
				}

			case "cityId":
				if (!parseInt(value)) {
					return t("pleaseSelectCity");
				} else {
					return "";
				}

			case "description":
				if (!value) {
					return t("pleaseEnterDescription");
				} else {
					return "";
				}

			default:
				return "";
		}
	};

	const validateInput = (e) => {
		let { name, value } = e.target;
		var errorMessage = getErrorMessage(name, value);
		setError((prevState) => {
			return { ...prevState, [name]: errorMessage };
		});
	};
	//Sending data to backend ends
	const [forumId, setForumId] = useState(null);
	const [forum, setForums] = useState([]);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		var cityId = searchParams.get("cityId");
		setCityId(cityId);
		var forumId = searchParams.get("forumId");
		if (forumId && cityId) {
			setNewPost(true);
			getForum(cityId, forumId).then((forumsResponse) => {
				let forumsData = forumsResponse.data.data;
				forumsData.cityId = cityId;
				setInput(forumsData);
			});
		}
	}, []);

	useEffect(() => {
		async function fetchData() {
			try {
				const citiesResponse = await getCities({ hasForum: true });
				setCities(citiesResponse.data.data);
				const response = await getUserForums();
				setForums(response.data.data);

				const urlParams = new URLSearchParams(location.search);
				const forumIdFromUrl = Number(urlParams.get("forumId"));
				if (!isNaN(forumIdFromUrl)) {
					setForumId(forumIdFromUrl);
					setInput((prev) => ({
						...prev,
						forumId: forumIdFromUrl,
					}));
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, [location.search]);

	async function onForumChange(e) {
		const forumId = e.target.value;
		setForumId(forumId);
		setInput((prev) => ({
			...prev,
			forumId: forumId,
		}));
		validateInput(e);

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("forumId", forumId);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, "", newUrl);
	}
	async function onCityChange(e) {
		const cityId = e.target.value;
		setCityId(cityId);
		setInput((prev) => ({
			...prev,
			cityId: cityId,
			villageId: 0,
		}));
		validateInput(e);

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("cityId", cityId);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, "", newUrl);
	}

	return (
		<section className="bg-slate-600 body-font relative">
			<SideBar />

			<div className="container w-auto px-5 py-2 bg-slate-600">
				<div className="bg-white mt-4 p-6 space-y-10">
					<h2
						style={{
							fontFamily: "Poppins, sans-serif",
						}}
						className="text-gray-900 text-lg mb-4 font-medium title-font"
					>
						{t("createPost")}
						<div className="my-4 bg-gray-600 h-[1px]"></div>
					</h2>
					<div className="relative mb-4">
						<label
							for="title"
							className="block text-sm font-medium text-gray-600"
						>
							{t("title")} *
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={input.title}
							onChange={onInputChange}
							onBlur={validateInput}
							required
							className="overflow-y:scroll w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md"
							placeholder={t("enterTitle")}
						/>
						<div
							className="h-[24px] text-red-600"
							style={{
								visibility: error.title ? "visible" : "hidden",
							}}
						>
							{error.title}
						</div>
					</div>

					<div className="relative mb-4">
						<label
							for="title"
							className="block text-sm font-medium text-gray-600"
						>
							{t("city")} *
						</label>
						<select
							type="text"
							id="cityId"
							name="cityId"
							value={cityId}
							onChange={onCityChange}
							autocomplete="country-name"
							className="overflow-y:scroll w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md disabled:bg-gray-400"
						>
							<option value={0}>{t("select")}</option>
							{cities.map((city) => (
								<option value={Number(city.id)}>{city.name}</option>
							))}
						</select>
						<div
							className="h-[24px] text-red-600"
							style={{
								visibility: error.cityId ? "visible" : "hidden",
							}}
						>
							{error.cityId}
						</div>
					</div>

					<div className="relative mb-4">
						<label
							for="title"
							className="block text-sm font-medium text-gray-600"
						>
							{t("forums")} *
						</label>
						<select
							type="text"
							id="forumId"
							name="forumId"
							value={forumId}
							onChange={onForumChange}
							autoComplete="country-name"
							className="overflow-y:scroll w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md disabled:bg-gray-400"
						>
							<option value={0}>{t("select")}</option>
							{forum.map((forum) => (
								<option value={Number(forum.forumId)} key={forum.forumId}>
									{forum.forumName}
								</option>
							))}
						</select>
						<div
							className="h-[24px] text-red-600"
							style={{
								visibility: error.cityId ? "visible" : "hidden",
							}}
						>
							{error.cityId}
						</div>
					</div>

					<div className="relative mb-4">
						<label
							for="description"
							className="block text-sm font-medium text-gray-600"
						>
							{t("description")} *
						</label>
						<ReactQuill
							type="text"
							id="description"
							name="description"
							ref={editor}
							value={description}
							onChange={(newContent) => onDescriptionChange(newContent)}
							onBlur={(range, source, editor) => {
								validateInput({
									target: {
										name: "description",
										value: editor.getHTML().replace(/(<br>|<\/?p>)/gi, ""),
									},
								});
							}}
							placeholder={t("writeSomethingHere")}
							className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 px-0 leading-8 transition-colors duration-200 ease-in-out shadow-md"
						/>
						<div
							className="h-[24px] text-red-600"
							style={{
								visibility: error.description ? "visible" : "hidden",
							}}
						>
							{error.description}
						</div>
					</div>
				</div>
			</div>

			<div className="container w-auto px-5 py-2 bg-slate-600">
				<div className="bg-white mt-4 p-6 space-y-10">
					<h2 className="text-gray-900 text-lg mb-4 font-medium title-font">
						{t("uploadLogo")}
						<div className="my-4 bg-gray-600 h-[1px]"></div>
					</h2>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							{t("addLogoHere")}
						</label>
						<div
							className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-black px-6 pt-5 pb-6 bg-slate-200`}
							onDrop={handleDrop1}
							onDragOver={handleDragOver}
							onDragEnter={handleDragEnter}
							onDragLeave={handleDragLeave}
						>
							{image1 || input.image ? (
								<div className="flex flex-col items-center">
									<img
										className="object-contain h-64 w-full mb-4"
										src={
											image1
												? URL.createObjectURL(image1)
												: process.env.REACT_APP_BUCKET_HOST + input.image
										}
										alt="uploaded"
									/>
									<button
										className="w-full bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
										onClick={handleRemoveImage1}
									>
										{t("remove")}
									</button>
								</div>
							) : (
								<div className="text-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mx-auto h-12 w-12"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M6 2a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7.414l-2-2V4a1 1 0 00-1-1H6zm6 5a1 1 0 100-2 1 1 0 000 2z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="mt-1 text-sm text-gray-600">
										{t("dragAndDropImage")}
									</p>
									<div className="relative mb-4 mt-8">
										<label className="file-upload-btn w-full bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded disabled:opacity-60">
											<span className="button-label">{t("upload")}</span>
											<input
												id="image1-upload"
												type="file"
												className="sr-only"
												onChange={handleInputChange}
											/>
										</label>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="container w-auto px-5 py-2 bg-slate-600">
				<div className="bg-white mt-4 p-6">
					<div className="py-2 mt-1 px-2">
						<button
							type="button"
							onClick={handleSubmit}
							disabled={updating}
							className="w-full bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded disabled:opacity-60"
						>
							{t("createPost")}
						</button>
					</div>
					<div>
						{successMessage && (
							<Alert type={"success"} message={successMessage} />
						)}
						{errorMessage && <Alert type={"danger"} message={errorMessage} />}
					</div>
				</div>
			</div>
		</section>
	);
}

export default UploadPosts;
