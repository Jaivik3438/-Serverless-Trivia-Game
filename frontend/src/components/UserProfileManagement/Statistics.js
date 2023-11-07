import React from "react";
import CommonNavbar from "../CommonNavbar";

const Statistics = () => {
  return (
    <div>
      <CommonNavbar />
      <hr />
      <iframe
        width="100%"
        height="950"
        src="https://lookerstudio.google.com/embed/reporting/1c50bfaf-841e-4e8e-9239-6021dc5d0ba1/page/tEnnC"
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Statistics;
