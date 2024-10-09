import { Request, Response } from "express";
import imgModel from "../models/img";
import photoServicesModel from "../models/photoServices";

export const getPhotoServicesWithImages = async (
  req: Request,
  res: Response
) => {
  try {
    const photoServices = await photoServicesModel.find();
    const imageIds = photoServices.flatMap((service) => [
      ...service.column1,
      ...service.column2,
      ...service.column3,
      ...service.column4,
    ]);

    const images = await imgModel.find({ _id: { $in: imageIds } });

    const photoServicesWithImages = photoServices.map((service) => ({
      ...service.toObject(),
      column1: service.column1.map((id) =>
        images.find((img) => img._id.equals(id))
      ),
      column2: service.column2.map((id) =>
        images.find((img) => img._id.equals(id))
      ),
      column3: service.column3.map((id) =>
        images.find((img) => img._id.equals(id))
      ),
      column4: service.column4.map((id) =>
        images.find((img) => img._id.equals(id))
      ),
    }));

    res.json(photoServicesWithImages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
