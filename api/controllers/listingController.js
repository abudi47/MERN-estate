import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    // console.log("created listing :" , listing)
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found...."));
  }
  // console.log("Listing:", listing); // Debug log
  console.log("Requesting user:", req.user.role); // Debug log
  if (req.user.role !== "admin" && req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing or you must be an admin..."));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Lisitng has been deleted successfully.....");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found...."));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listing..."));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found...."));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    } //In effect, this means "don’t filter by offer."

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    } //In effect, this means "don’t filter by furnished."

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    } //In effect, this means "don’t filter by parking."

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    } //In effect, this means "don’t filter by type."

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found...."));
  }
  try {
    const updateStatus = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updateStatus);
  } catch (error) {
    next(error);
  }
};


export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({});
    if (!listings) {
      return next(errorHandler(404, "No listings found...."));
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}