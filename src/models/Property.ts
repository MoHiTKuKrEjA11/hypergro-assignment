import mongoose from 'mongoose';

export interface IProperty extends mongoose.Document {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  status: string;
  features: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Bungalow', 'Studio', 'Penthouse']
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Sold', 'Rented', 'For Sale']
  },
  features: [{
    type: String
  }],
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create indexes for better search performance
propertySchema.index({ title: 'text', description: 'text', location: 'text' });
propertySchema.index({ price: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ bathrooms: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ status: 1 });

export const Property = mongoose.model<IProperty>('Property', propertySchema); 