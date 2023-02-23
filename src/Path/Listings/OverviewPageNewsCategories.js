import React, { useState, useRef, useEffect } from "react";
import SideBar from "../../Components/SideBar";
import "./bodyContainer.css";
import { useNavigate } from "react-router-dom";
import NEWSFLASH from "../../Resource/NewsFlash.jpg";
import ALERTS from "../../Resource/alert.jpg";
import POLITICS from "../../Resource/politics.jpg";
import ECONOMY from "../../Resource/economy.jpg";
import SPORTS from "../../Resource/sports.jpg";
import TOPIC from "../../Resource/topicoftheday.jpg";
import LOCAL from "../../Resource/localnews.jpg";
import CLUB from "../../Resource/club.jpg";

function OverviewPageNewsCategories() {
  window.scrollTo(0, 0);
  useEffect(() => {
    document.title = "News Categories";
  }, []);

  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [date, setDate] = useState();

  let navigate = useNavigate();
  const navigateTo = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <section class="bg-slate-600 body-font relative">
        <SideBar />
      <div class="container w-auto px-5 py-2 bg-slate-600 h-screen">
        <div class="bg-white p-20 mt-4 mb-4 flex flex-wrap gap-20 justify-center">
          <div onClick={() => navigateTo("/ListingsPageNewsflash")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={NEWSFLASH}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  NEWSFLASH
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageAlert")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={ALERTS}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  ALERTS
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPagePolitics")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={POLITICS}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  POLITICS
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageEconomy")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={ECONOMY}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  ECONOMY
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageSports")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={SPORTS}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  SPORTS
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageTopicOfTheDay")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={TOPIC}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  TOPIC OF THE DAY
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageLocal")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={LOCAL}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  LOCAL
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
            <div onClick={() => navigateTo("/ListingsPageClubNews")} class="lg:w-64 md:w-1/2 h-80 pb-20 w-full shadow-2xl rounded-lg cursor-pointer">
              <a class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-500"
                  src={CLUB}
                />
              </a>
              <div class="mt-4">
                <h2 class="text-gray-900 title-font text-lg font-medium text-center">
                  CLUB NEWS
                </h2>
              </div>
              <div className="my-4 bg-gray-200 h-[1px]"></div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewPageNewsCategories;
