// @deno-types="@types/express"
import { Router } from 'npm:express';
import {
  createShorturl,
  deleteShorturl,
  findByShortcode,
  updateShorturl,
  getUrlStatistics
} from '../controllers/shorturl.controller.ts';

const router = Router();

router.post('/', createShorturl);
router.get('/:shortCode', findByShortcode);
router.get("/:shortCode/stats", getUrlStatistics)
router.put('/:shortCode', updateShorturl);
router.delete('/:shortCode', deleteShorturl);
export default router;
