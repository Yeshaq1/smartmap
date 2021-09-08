import express from 'express';
import {
  getAlerts,
  getSmartControlData,
} from '../controllers/ubicSmartController.js';

const router = express.Router();

router.route('/ubic').get(getSmartControlData);
router.route('/ubic/alerts').get(getAlerts);

export default router;
