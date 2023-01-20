import React, { useState , useRef , useEffect } from "react";
import SideBar from '../Components/SideBar';
import JoditEditor from 'jodit-react';
import './bodyContainer.css';


function ListingsPage() {

  useEffect(() => {
    document.title = "Submit -Listings";
  }, []);

  const editor = useRef(null);
	const [content, setContent] = useState('');

  const [date, setDate] = useState();

    return (
      <section class="bg-slate-600 body-font relative">
        <SideBar/>
        <div class="container w-auto px-5 py-2 bg-slate-600">
            <div class="bg-white mt-4 p-6 space-y-10">
            <h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
              Information
              <div className="my-4 bg-gray-600 h-[1px]"></div>
            </h2>
            <div class="relative mb-4">
              <label
                for="category"
                class="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="category"
                  id="category"
                  class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="all your selection categories"
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <select
                    id="currency"
                    name="currency"
                    class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Germany</option>
                    <option>Spain</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="relative mb-4">
              <label for="title" class="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="enter your title"
              />
            </div>
            <div class="relative mb-4">
              <label for="date" class="block text-sm font-medium text-gray-600">
                Date
              </label>
              <div class="relative">
                <div class="flex absolute inset-y-0 right-1 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  </svg>
                </div>
                <input
                  onChange={e=>setDate(e.target.value)}
                  type="date"
                  id="date"
                  name="date"
                  class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="dd-mm-yyyy"
                />
              </div>
            </div>
            <div class="relative mb-4">
              <label for="time" class="block text-sm font-medium text-gray-600">
                Time
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Select a time"
              />
              <button tabindex="0" type="button" class="timepicker-toggle-button" data-mdb-toggle="timepicker">
                <i class="fas fa-clock timepicker-icon"></i>
              </button>
            </div>
            <div class="relative mb-4">
              <label for="place" class="block text-sm font-medium text-gray-600">
                Place
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="enter your place"
              />
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-600"
              >
                Description
              </label>

              <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent)}
              />

            </div>
          </div>
        </div>

        <div class="container w-auto px-5 py-2 bg-slate-600">
          <div class="bg-white mt-4 p-6 space-y-10">
          <h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
            Personal Information
            <div className="my-4 bg-gray-600 h-[1px]"></div>
          </h2>
          <div class="relative mb-4">
            <label
              for="category"
              class="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="category"
                id="category"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="ainfo@heidi-app.de"
              />
            </div>
          </div>
          <div class="relative mb-4">
            <label for="title" class="block text-sm font-medium text-gray-600">
              Telefon
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Telephone number"
            />
          </div>
          <div class="relative mb-4">
            <label for="date" class="block text-sm font-medium text-gray-600">
              Website
            </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="https://heidi-app.de"
              />
          </div>
        </div>
      </div>

      <div class="container w-auto px-5 py-2 bg-slate-600">
          <div class="bg-white mt-4 p-6 space-y-10">
          <h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
            Social Media
            <div className="my-4 bg-gray-600 h-[1px]"></div>
          </h2>
          <div class="relative mb-4">
            <label
              for="category"
              class="block text-sm font-medium text-gray-600"
            >
              Link your social media accounts here
            </label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="category"
                id="category"
                class="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="ainfo@heidi-app.de"
              />

              <div class="flex justify-center space-x-4 mt-7 border-white">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-up" class="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-right" class="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-down" class="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-down" class="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-down" class="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="container w-auto px-5 py-2 bg-slate-600">
          <div class="bg-white mt-4 p-6 space-y-10">
          <h2 class="text-gray-900 text-lg mb-4 font-medium title-font">
            Media
            <div className="my-4 bg-gray-600 h-[1px]"></div>
          </h2>

          <div>
              <label class="block text-sm font-medium text-gray-700">Upload here</label>
              <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 bg-slate-200">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-lg text-gray-600 ">
                    <p class="pl-1">Drag & Drop</p>
                  </div>
                  <p class="text-xs text-gray-500">or</p>
                  <button class="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
                    Choose file
                  </button>
                </div>
              </div>
            </div>
            <div class="relative mb-4 mt-8 border-white">
            <button class="w-full bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
          </div>

      </div>
      </section>
    );
}

export default ListingsPage;
