"use server";

import ImageModel from "../models/images";

export async function addImageToDatabase(payload: any) {
  try {
    const newImage = await ImageModel.create(payload);
    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    throw error;
  }
}

export async function getImageFromDatabase(imageId: string) {
  try {
    const image = await ImageModel.findById(imageId);
    const base64Image = `data:${image.contentType};base64,${image.image.toString("base64")}`;
    return base64Image;
  } catch (error) {
    throw error;
  }
}
