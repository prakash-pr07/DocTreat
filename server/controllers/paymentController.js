import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/userModel.js";
import { sendThankYouEmail } from "../utils/sendThankYouEmail.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // ₹10 in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    console.log("🔵 Order Created:", order.id);

    return res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error(" Razorpay Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

//  Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 🛡 Check for authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    //  Validate Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay signature",
      });
    }

    //  Fetch and update user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  Update user's premium status only if not already premium
    if (!user.isPremium) {
      user.isPremium = true;
      await user.save();

      //  Send Thank You email
      await sendThankYouEmail(user.email);
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and premium activated",
    });
  } catch (error) {
    console.error(" Razorpay Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

