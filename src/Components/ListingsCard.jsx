import LISTINGSIMAGE from "../assets/ListingsImage.jpeg";
import PropTypes from 'prop-types';
import React from "react";

function ListingsCard({ listing, terminalView = false }) {

    return (
        <a
            href={
                listing.sourceId === 1 ? (`/HomePage/EventDetails?listingId=${listing.id}&cityId=${listing.cityId}${terminalView ? "&terminalView=true" : ""}`) : listing.website
            }
            className="w-full h-full shadow-lg rounded-lg cursor-pointer"
        >
            <div className="block relative h-64 rounded overflow-hidden">
                <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block hover:scale-125 transition-all duration-1000"
                    src={
                        listing.sourceId === 1 ?
                            (listing.logo
                                ? process.env.REACT_APP_BUCKET_HOST +
                                listing.logo
                                : LISTINGSIMAGE)
                            : listing.logo
                    }
                />
            </div>
            <div className="mt-5 px-2">
                <h2
                    className="text-gray-900 title-font text-lg font-bold text-center font-sans truncate"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {listing.title}
                </h2>
            </div>
            <div className="my-4 bg-gray-200 h-[1px]"></div>
            {listing.id && listing.categoryId === 3 ? (
                <p
                    className="text-gray-600 my-4 p-2 h-[1.8rem] title-font text-sm font-semibold text-center font-sans truncate"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {new Date(
                        listing.startDate.slice(0, 10)
                    ).toLocaleDateString("de-DE") +
                        " To " +
                        new Date(
                            listing.endDate.slice(0, 10)
                        ).toLocaleDateString("de-DE")}
                </p>
            ) : (
                <p
                    className="text-gray-600 my-4 p-2 h-[1.8rem] title-font text-sm font-semibold text-center font-sans truncate"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    dangerouslySetInnerHTML={{
                        __html: listing.description,
                    }}
                />
            )}
        </a>)
}

ListingsCard.propTypes = {
    listing: PropTypes.object.isRequired,
    terminalView: PropTypes.bool.isRequired
};

export default ListingsCard;