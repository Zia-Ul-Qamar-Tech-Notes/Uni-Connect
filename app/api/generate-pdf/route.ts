// pages/api/download-report.ts

import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { fetchOrders, generateHtmlContent } from '@/lib/utils'; // Import the utility functions
import { IOrderItem } from '@/lib/database/models/order.model'; // Import the OrderItem interface

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { eventId, searchText } = req.query;

    try {
      // Fetch orders based on eventId and searchText
      const orders = await fetchOrders(eventId as string, searchText as string);

      // Generate HTML content for the report
      const htmlContent = generateHtmlContent(orders);

      // Generate PDF from HTML content
      const pdfBuffer = await generatePdfFromHtml(htmlContent);

      // Set headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename="orders_report.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}
