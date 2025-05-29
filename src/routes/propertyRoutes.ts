import express from 'express';
import { auth } from '../middleware/auth';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController';

const router = express.Router();

// All routes are now protected
router.get('/', auth, getProperties);
router.get('/:id', auth, getPropertyById);
router.post('/', auth, createProperty);
router.patch('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

export default router; 