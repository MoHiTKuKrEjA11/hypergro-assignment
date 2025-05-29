import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { Property } from '../models/Property';
import dotenv from 'dotenv';

dotenv.config();

const importCSV = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    const properties: any[] = [];

    // Read and parse CSV file
    fs.createReadStream('impp.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Transform CSV data to match our schema
        const property = {
          title: data.title || 'Untitled Property',
          description: `${data.title} - ${data.type} in ${data.city}, ${data.state}`,
          price: Number(data.price) || 0,
          location: `${data.city}, ${data.state}`,
          bedrooms: Number(data.bedrooms) || 0,
          bathrooms: Number(data.bathrooms) || 0,
          area: Number(data.areaSqFt) || 0,
          propertyType: data.type || 'Apartment',
          status: data.listingType === 'rent' ? 'Available' : 'For Sale',
          features: data.amenities ? data.amenities.split('|') : [],
          images: [] // No images in the CSV
        };
        properties.push(property);
      })
      .on('end', async () => {
        try {
          // Insert all properties
          await Property.insertMany(properties);
          console.log(`Successfully imported ${properties.length} properties`);
          process.exit(0);
        } catch (error) {
          console.error('Error inserting properties:', error);
          process.exit(1);
        }
      });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

importCSV(); 