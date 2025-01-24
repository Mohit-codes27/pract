import React, { useState } from "react";
import "./style.css";

const Modal = ({ internship, onClose }) => {
    if (!internship) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl overflow-hidden transform transition-all duration-1000">
                {/* Top Section with Gradient */}
                <div className={`h-20 bg-gradient-to-r ${internship.bgColor} flex items-center justify-center`}>
                    <h2 className="text-white text-3xl font-bold">{internship.title}</h2>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">{internship.organization}</h3>
                    <p className="text-gray-700 mb-3">{internship.description}</p>

                    {/* Metadata Section */}
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                        {/* Left Section: Internship Details */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold mb-4">{internship.organization}</h3>
                            <p className="text-gray-700 mb-3">{internship.description}</p>

                            {/* Metadata Section */}
                            <div className="flex flex-col gap-2 text-sm text-gray-600 mb-5">
                                <div className="flex items-center gap-2">
                                    <span className="text-purple-500">📍</span>
                                    <p>{internship.location}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500">🕒</span>
                                    <p>{internship.duration}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">💰</span>
                                    <p>{internship.stipend}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-teal-500">🏢</span>
                                    <p>{internship.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-500">🎓</span>
                                    <p>{internship.eligible}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Image */}
                        <div className="flex-shrink-0">
                            <div className="w-40 h-40">
                                <img
                                    src={internship.img}
                                    alt="Internship Image"
                                    className="w-full h-full object-cover rounded-full shadow-lg"
                                />
                            </div>
                        </div>
                    </div>


                    {/* Actions Section */}
                    <div className="flex justify-between items-center">
                        <button
                            className="px-4 py-2 bg-[#0a66c2] text-white rounded-md hover:bg-blue-600 transition"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button className="px-4 py-2 bg-[#0a66c2] text-white rounded-md hover:bg-[#064a91] transition">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;