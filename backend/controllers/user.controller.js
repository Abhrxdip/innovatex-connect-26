import User from "../models/User";
import Ticket from "../models/Ticket";
import Notification from "../models/Notification";

export async function getProfileController(userId) {
  const user = await User.findById(userId).select("-password -secret");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

export async function updateProfileController(userId, updateData) {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password -secret");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

export async function getUserDashboardController(userId) {
  const user = await User.findById(userId).select("-password -secret");
  const ticket = await Ticket.findOne({
    userId
  });
  const notifications = await Notification.find({
    userId
  }).sort({
    createdAt: -1
  }).limit(5);

  return {
    user,
    ticket,
    notifications,
  };
}