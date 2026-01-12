import { NextApiRequest, NextApiResponse } from "next";
import { IReservation } from "../../types/typings";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_APP_URL or VERCEL_URL environment variable is required");
  }
  // Ensure URL has protocol
  return url.startsWith("http") ? url : `https://${url}`;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const appUrl = getAppUrl();
    const {
      hotelId,
      title,
      description,
      img,
      location,
      startDate,
      endDate,
      price,
      total,
      userEmail,
      long,
      lat,
      star,
      cityId,
    } = req.body;

    const transformedItems : IReservation[] = [
      {
        price_data: {
          currency: "cad",
          unit_amount: total * 100,
          product_data: {
            name: title,
            description: description,
            images: [img],
          },
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [{ shipping_rate: "shr_1M86JTEXNZK6Is4blwjE8jYF" }],
      shipping_address_collection: {
        allowed_countries: ["CA", "US", "GB"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${appUrl}/success`,
      cancel_url: `${appUrl}/details`,
      metadata: {
        email: userEmail,
        images: JSON.stringify([img]),
        hotelId: hotelId,
        description: description,
        img: img,
        location: location,
        lat: lat,
        long: long,
        price: price,
        star: star,
        title: title,
        total: total,
        userEmail: userEmail,
        cityId: cityId,
        startDate: startDate,
        endDate: endDate,
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message || "Failed to create checkout session" });
  }
};
