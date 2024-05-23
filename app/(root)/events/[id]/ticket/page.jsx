"use client";
import React, { useRef } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Ticket() {
  const searchParams = useSearchParams();
  const ticketRef = useRef();

  let eventName = searchParams.get("eventName");
  let price = searchParams.get("price");
  let location = searchParams.get("location");
  let id = searchParams.get("id");
  let img = searchParams.get("img");
  let date = searchParams.get("date");
  let time = searchParams.get("time");
  let etime = searchParams.get("etime");
  let organizer = searchParams.get("organizer");
  const orderId = searchParams.get("orderId");

  const qrtext = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderId}`;

  const downloadTicket = async () => {
    const ticketElement = ticketRef.current;

    const canvas = await html2canvas(ticketElement, {
      useCORS: true, // Allow cross-origin images
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ticket.pdf");
  };

  const downloadTicketAsImage = async () => {
    const ticketElement = ticketRef.current;

    const canvas = await html2canvas(ticketElement, {
      useCORS: true, // Allow cross-origin images
    });

    const imgData = canvas.toDataURL("image/png");

    // Create a link element to download the image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "ticket.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body,
        html {
          height: 100vh;
          display: grid;
          font-family: "Staatliches", cursive;
          background: #d83565;
          color: black;
          font-size: 14px;
          letter-spacing: 0.1em;
        }

        .ticket {
          margin: auto;
          width: auto;
          margin-top: 100px;
          display: flex;
          justify-content: center;
          background: white;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
        }

        .left {
          display: flex;
        }

        .image {
          height: 330px;
          width: 250px;
          background-image: url(${img});
          background-size: cover;
          opacity: 0.85;
        }

        .admit-one {
          position: absolute;
          color: darkgray;
          height: 250px;
          padding: 0 10px;
          letter-spacing: 0.15em;
          display: flex;
          text-align: center;
          justify-content: space-around;
          writing-mode: vertical-rl;
          transform: rotate(-180deg);
        }

        .admit-one span:nth-child(2) {
          color: white;
          font-weight: 700;
        }

        .left .ticket-number {
          height: 250px;
          width: 250px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding: 5px;
        }

        .ticket-info {
          padding: 10px 30px;
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: space-between;
          align-items: center;
        }

        .date {
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          padding: 5px 0;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .date span {
          width: 200px;
          text-align: center;
        }

        .date span:first-child {
        }

        .date span:last-child {
          // text-align: right;
        }

        .date .june-29 {
          color: #d83565;
          font-size: 20px;
        }

        .show-name {
          font-size: 32px;
          font-family: "Nanum Pen Script", cursive;
          color: #d83565;
        }

        .show-name h1 {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #4a437e;
        }

        .time {
          padding: 10px 0;
          color: #4a437e;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-weight: 700;
        }

        .time span {
          font-weight: 400;
          color: gray;
        }

        .left .time {
          font-size: 16px;
        }

        .location {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          padding-top: 8px;
          border-top: 1px solid gray;
        }

        .location .separator {
          font-size: 20px;
        }

        .right {
          width: 180px;
          border-left: 1px dashed #404040;
        }

        .right .admit-one {
          color: darkgray;
        }

        .right .admit-one span:nth-child(2) {
          color: gray;
        }

        .right .right-info-container {
          height: 250px;
          padding: 10px 10px 10px 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }

        .right .show-name h1 {
          font-size: 18px;
        }

        .barcode {
          height: 100px;
        }

        .barcode img {
          height: 100%;
          width: 100%; /* Add width for better scaling */
        }

        .right .ticket-number {
          margin-right: 30px;
          color: gray;
        }
      `}</style>
      <div
        ref={ticketRef}
        id="ticket"
        className="ticket created-by-anniedotexe"
      >
        <div className="left">
          <div className="image">
            <p className="admit-one">
              <span>ADMIT ONE</span>
              <span>ADMIT ONE</span>
              <span>ADMIT ONE</span>
            </p>
            <div className="ticket-number ">
              <p>#{orderId}</p>
            </div>
          </div>
          <div className="ticket-info">
            <p className="date">
              <span>{date}</span>
              {/* <span>2024</span> */}
            </p>
            <div className="show-name">
              <h1>{eventName}</h1>
              <h2>Uni-Connect</h2>
            </div>
            <div className="time">
              <p>
                {time} <span>TO</span> {etime}
              </p>
              <p>
                Price <span>@</span> {price}
              </p>
            </div>
            <p className="location">
              <span>{location}</span>
              <span className="separator">
                <i className="far fa-smile"></i>
              </span>
              <span> UOG Gujrat, Punjab</span>
            </p>
          </div>
        </div>
        <div className="right">
          <div className="right-info-container">
            <div className="show-name">
              <h1>{eventName}</h1>
            </div>
            <div className="time">
              <p>
                {time} <span>TO</span> {etime}
              </p>
              <p>
                Price <span>@</span> {price}
              </p>
            </div>
            <div className="barcode">
              <img src={qrtext} alt="QR code" crossOrigin="anonymous" />
            </div>
            <p className="ticket-number">#{orderId}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={downloadTicket}
          style={{
            marginTop: "20px",
            display: "block",
            margin: "auto",
            padding: "10px 20px",
            background: "#d83565",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Download Ticket as PDF
        </button>
        <button
          onClick={downloadTicketAsImage}
          style={{
            marginTop: "20px",
            display: "block",
            margin: "auto",
            padding: "10px 20px",
            background: "#d83565",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Download Ticket as Image
        </button>
      </div>
    </div>
  );
}

export default Ticket;
