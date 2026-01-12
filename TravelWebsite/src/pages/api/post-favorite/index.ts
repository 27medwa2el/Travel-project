import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

// POST /api/post-favorite
// Travel routes are public, so favorites are stored with anonymous email
// Approach: Use anonymous email for now (can be enhanced later with Clerk or deviceId)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      hotelId,
      description,
      img,
      lat,
      location,
      long,
      price,
      star,
      title,
      total,
      cityId,
    } = req.body;

    // Since travel routes are public, use anonymous email
    // Future enhancement: Could use deviceId from localStorage or Clerk user if authenticated
    const userEmail = "anonymous@user.com";

    const result = await prisma.hotel.create({
      data: {
        hotelId,
        description,
        img,
        lat,
        location,
        long,
        price,
        star,
        title,
        total,
        userEmail,
        cityId,
      },
    });
    res.json(result);
  } catch (error: any) {
    console.error("Error creating favorite:", error);
    res.status(500).json({ error: error.message || "Failed to create favorite" });
  }
}