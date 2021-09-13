import express from 'express';
import {
  getAlerts,
  getSmartControlData,
} from '../controllers/ubicSmartController.js';
import { getToken } from '../middleware/auth.js';

const router = express.Router();

router.route('/ubic').get(getToken, getSmartControlData);
router.route('/ubic/alerts').get(getToken, getAlerts);

export default router;
