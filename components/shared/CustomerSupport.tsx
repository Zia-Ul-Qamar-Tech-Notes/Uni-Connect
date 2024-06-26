"use client"; // Add this at the top to make the component client-side

import React from "react";
import { FaRegComments } from "react-icons/fa";

const CustomerSupport = () => {
  const openChatbotWindow = () => {
    window.open(
      "https://mediafiles.botpress.cloud/7a88b8ef-1fc3-4267-a4e2-3462b89eecdd/webchat/bot.html",
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={openChatbotWindow}
        className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FaRegComments className="h-8 w-8" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CustomerSupport;
