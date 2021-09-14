import express from 'express';
import {
  getAlerts,
  getSmartControlData,
  toggleLight,
} from '../controllers/ubicSmartController.js';
import { getToken } from '../middleware/auth.js';

const router = express.Router();

router.route('/ubic').get(getToken, getSmartControlData);
router.route('/ubic/alerts').get(getToken, getAlerts);
router.route('/ubic/setlight').post(getToken, toggleLight);

export default router;
