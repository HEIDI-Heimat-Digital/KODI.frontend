import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../../Components/SideBar";
import { ProductsTest } from "../../Constants/productsForSale";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../index.css";
import { getUserForums } from "../../Services/forumsApi";

const MyProducts = () => {
  const { t } = useTranslation();
  const [forums, setForums] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 9;

  const fetchForums = useCallback(() => {
    getUserForums({
      pageNo,
      pageSize,
    }).then((response) => {
      setForums(response.data.data);
    });
  }, [pageNo]);

  useEffect(() => {
    if (pageNo === 1) {
      fetchForums();
    } else {
      fetchForums();
    }
  }, [fetchForums, pageNo]);

  const navigate = useNavigate();
  const navigateTo = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-slate-600 body-font relative h-screen">
      <SideBar />
      <div className="container w-auto px-0 lg:px-5 py-2 bg-slate-600 min-h-screen flex flex-col">
        <div className="h-full">
          <div className="bg-white mt-10 p-0 space-y-10 overflow-x-auto">
            <table className="w-full text-sm text-left lg:mt-[2rem] mt-[2rem] text-gray-500 p-6 space-y-10 rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      width: "20%",
                    }}
                  >
                    {t("productName")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-center"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      width: "20%",
                    }}
                  >
                    {t("price")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-center "
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      width: "20%",
                    }}
                  >
                    {t("stockLeft")}
                  </th>

                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-center "
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      width: "20%",
                    }}
                  >
                    {t("action")}
                  </th>

                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-center "
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      width: "20%",
                    }}
                  >
                    {t("qrCode")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {ProductsTest.map((products, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap cursor-pointer"
                      >
                        <img
                          className="w-10 h-10 object-cover rounded-full hidden sm:table-cell"
                          src={
                            products.image
                              ? process.env.REACT_APP_BUCKET_HOST +
                                products.image
                              : process.env.REACT_APP_BUCKET_HOST +
                                "admin/DefaultForum.jpeg"
                          }
                          onClick={() =>
                            navigateTo(
                              `/Forum?forumId=${products.forumId}&cityId=${products.cityId}`
                            )
                          }
                          alt="avatar"
                        />
                        <div className="pl-0 sm:pl-3 overflow-hidden max-w-[20rem] sm:max-w-[10rem]">
                          <div
                            className="font-medium text-gray-500 cursor-pointer text-center truncate"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                            onClick={() =>
                              navigateTo(
                                `/Forum?forumId=${products.forumId}&cityId=${products.cityId}`
                              )
                            }
                          >
                            {products.productName}
                          </div>
                        </div>
                      </th>

                      <td
                        className="px-6 py-4 text-center"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {products.price}
                      </td>

                      <td
                        className={`px-6 py-4 text-center ${
                          products.itemsleft < 5
                            ? "text-red-500"
                            : "text-blue-600"
                        }`}
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {products.itemsleft}
                      </td>

                      <td
                        className="px-6 py-4 text-center"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <a
                          className="font-medium text-blue-600 hover:underline cursor-pointer"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {t("edit")}
                        </a>
                      </td>

                      <td
                        className="px-6 py-4 text-center"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <div style={{ display: "inline-block" }}>
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            src={
                              products.image
                                ? process.env.REACT_APP_BUCKET_HOST +
                                  products.image
                                : process.env.REACT_APP_BUCKET_HOST +
                                  "admin/DefaultForum.jpeg"
                            }
                            onClick={handleImageClick}
                            alt="avatar"
                          />
                        </div>
                        {showModal && (
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
                                <img
                                  className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-white"
                                  src={
                                    products.image
                                      ? process.env.REACT_APP_BUCKET_HOST +
                                        products.image
                                      : process.env.REACT_APP_BUCKET_HOST +
                                        "admin/DefaultForum.jpeg"
                                  }
                                  alt="avatar"
                                />
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 text-center">
                                  <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                    {t("cancel")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bottom-5 right-5 mt-5 px-1 py-2 text-xs font-medium text-center float-left cursor-pointer">
            <button
              type="button"
              className="inline-block rounded-xl bg-black px-3 pb-2 pt-2 text-xs font-bold uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => navigateTo("/AddNewProducts")}
            >
              {t("addNewProduct")}
            </button>
          </div>

          <div className="bottom-5 right-5 mt-5 px-1 py-2 text-xs font-medium text-center float-right cursor-pointer bg-black rounded-xl">
            {pageNo !== 1 ? (
              <span
                className="inline-block bg-black px-2 pb-2 pt-2 text-xs font-bold uppercase leading-normal text-neutral-50"
                onClick={() => setPageNo(pageNo - 1)}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {"<"}{" "}
              </span>
            ) : (
              <span />
            )}
            <span
              className="inline-block bg-black px-2 pb-2 pt-2 text-xs font-bold uppercase leading-normal text-neutral-50"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("page")} {pageNo}
            </span>

            {forums.length >= pageSize && (
              <span
                className="inline-block bg-black px-2 pb-2 pt-2 text-xs font-bold uppercase leading-normal text-neutral-50"
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

export default MyProducts;
