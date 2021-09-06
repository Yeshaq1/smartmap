import express from 'express';
import { getSmartControlData } from '../controllers/ubicSmartController.js';

const router = express.Router();

router.route('/ubic').get(getSmartControlData);

export default router;
