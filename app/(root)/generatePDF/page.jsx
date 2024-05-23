"use client";
import { useRouter, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import "jspdf-autotable";

function GeneratePDF() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orders = JSON.parse(searchParams.get("orders"));
  const eventId = searchParams.get("eventId");

  console.log(orders);

  const doc = new jsPDF();
  doc.text("Orders Report", 20, 10);

  let y = 20;

  const tableColumnHeaders = [
    { header: "Order ID", dataKey: "_id" },
    { header: "Event Title", dataKey: "eventTitle" },
    { header: "Buyer", dataKey: "buyer" },
    { header: "Created", dataKey: "createdAt" },
    { header: "Amount", dataKey: "totalAmount" },
  ];

  let data = [];
  orders.forEach((order) => {
    let rowData = [];
    tableColumnHeaders.forEach((column) => {
      rowData.push(order[column.dataKey]);
    });
    data.push(rowData);
  });

  doc.autoTable({
    head: [tableColumnHeaders.map((column) => column.header)],
    body: data,
    startY: y + 10,
  });

  doc.save("orders-report.pdf");

  router.push(`/orders?eventId=${eventId}`);
}

export default GeneratePDF;
