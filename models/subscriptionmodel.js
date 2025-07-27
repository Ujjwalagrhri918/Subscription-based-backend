import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['INR', 'USD', 'EUR', 'GBP', 'JPY'],
      default: 'USD',
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['credit_card', 'debit_card', 'upi', 'paypal', 'net_banking', 'other'],
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'cancelled', 'paused', 'expired'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator : (value) => value <= new Date();,
        message: 'start date msut be in past',
      }
    },
    renewalDate: {
      type: Date,
      required: [true, 'Renewal date is required'],
      validate: {
        validator: function(value) {
            return value > this.startDate;
        },
        message: "Renewal Date must be in future",
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // get the ID for the user by refering to the user schema
      ref: 'User',
      required: [true, 'Associated user is required'],
      index : true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Pre-save middleware to calculate renewalDate and update status if needed
subscriptionSchema.pre('save', function (next) {
  // If renewalDate is missing, calculate it based on frequency and startDate
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    // Clone startDate and add days based on the frequency
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // If the calculated or provided renewalDate is in the past, mark subscription as expired
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  // Continue to the next middleware or save operation
  next();
});




const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
