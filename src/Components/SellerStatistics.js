import React from 'react';
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const SellerStatistics = ({ percentItemsSold , totalIncome , totalOwedAmount}) => {
  const { t } = useTranslation();
  return (
    <section className="text-gray-600 body-font bg-slate-600">
      <div className="bg-slate-600 mt-4 p-0 space-y-0 overflow-x-auto">
        <div className="w-full text-sm text-left lg:mt-[0rem] mt-[0rem] text-gray-500 p-0 space-y-10 rounded-lg">
          <dl className="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-3">

            <div className="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500" id="item-1">
                {t("items")}{" "}{t("youSold")}
              </dt>
              <dd className="order-1 text-5xl font-extrabold leading-none text-purple-700 truncate" aria-describedby="item-1">
                <svg
                  className="h-8 w-12 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                </svg>
                {percentItemsSold}%
              </dd>
            </div>

            <div
                className="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                  {t("youMade")}
              </dt>
              <dd className="order-1 text-5xl font-extrabold leading-none text-blue-700 truncate">
                <svg
                    className="h-8 w-12 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path d="M117.9 62.4c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l113 37.7C265 15.8 290.7 0 320 0c44.2 0 80 35.8 80 80c0 3-.2 5.9-.5 8.8l122.6 40.9c16.8 5.6 25.8 23.7 20.2 40.5s-23.7 25.8-40.5 20.2L366.4 145.2c-4.5 3.2-9.3 5.9-14.4 8.2V480c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-21-9.2-37.2-27-44.2-49l-125.9-42zM200.4 288L128 163.8 55.6 288H200.4zM128 384C65.1 384 12.8 350 2 305.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C243.2 350 190.9 384 128 384zm382.8-92.2L438.4 416H583.3L510.8 291.8zm126 141.3C626 478 573.7 512 510.8 512s-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1z"/>
                  </svg>
                €{totalIncome}
              </dd>
            </div>

            <div className="flex flex-col p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                  {t("youOwe")}
              </dt>
              <dd className="order-1 text-5xl font-extrabold leading-none text-red-700 truncate">
                <svg
                  className="h-8 w-12 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path d="M522.1 62.4c16.8-5.6 25.8-23.7 20.2-40.5S518.6-3.9 501.9 1.6l-113 37.7C375 15.8 349.3 0 320 0c-44.2 0-80 35.8-80 80c0 3 .2 5.9 .5 8.8L117.9 129.6c-16.8 5.6-25.8 23.7-20.2 40.5s23.7 25.8 40.5 20.2l135.5-45.2c4.5 3.2 9.3 5.9 14.4 8.2V480c0 17.7 14.3 32 32 32H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V153.3c21-9.2 37.2-27 44.2-49l125.9-42zM439.6 288L512 163.8 584.4 288H439.6zM512 384c62.9 0 115.2-34 126-78.9c2.6-11-1-22.3-6.7-32.1L536.1 109.8c-5-8.6-14.2-13.8-24.1-13.8s-19.1 5.3-24.1 13.8L392.7 273.1c-5.7 9.8-9.3 21.1-6.7 32.1C396.8 350 449.1 384 512 384zM129.2 291.8L201.6 416H56.7l72.4-124.2zM3.2 433.1C14 478 66.3 512 129.2 512s115.2-34 126-78.9c2.6-11-1-22.3-6.7-32.1L153.2 237.8c-5-8.6-14.2-13.8-24.1-13.8s-19.1 5.3-24.1 13.8L9.9 401.1c-5.7 9.8-9.3 21.1-6.7 32.1z"/>
                </svg>
                €{totalOwedAmount}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

SellerStatistics.propTypes = {
  percentItemsSold: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalOwedAmount: PropTypes.number.isRequired,
};

export default SellerStatistics;