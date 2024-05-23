// pages/api/orders.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getOrdersByEvent } from '@/lib/actions/order.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const eventId = req.query.eventId as string;
    const searchText = req.query.searchText as string;

    console.log("Received eventId:", eventId);
    console.log("Received searchText:", searchText);

    // Ensure searchText is initialized correctly
    let searchString = searchText || "";

    const orders = await getOrdersByEvent({ eventId, searchString });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
