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
                {percentItemsSold}%
              </dd>
            </div>
            <div
                className="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                  {t("youMade")}
              </dt>
              <dd className="order-1 text-5xl font-extrabold leading-none text-blue-700 truncate">
                €{totalIncome}
              </dd>
            </div>
            <div className="flex flex-col p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l">
              <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                  {t("youOwe")}
              </dt>
              <dd className="order-1 text-5xl font-extrabold leading-none text-red-700 truncate">
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