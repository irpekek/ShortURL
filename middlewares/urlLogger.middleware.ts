//@deno-types="npm:@types/express"
import { Request, Response, NextFunction } from 'npm:express';
import { Shorturl } from '../models/Shorturl.model.ts';

export async function urlLogger(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { shortCode } = request.params;
  try {
    const dataUrl = await Shorturl.incrementAccessCount(shortCode);
    console.log('accessCount :>> ', dataUrl?.accessCount);
    dataUrl ? next() : response.sendStatus(404);
  } catch (_error) {
    console.log('Error While incrementing Access Count');
  }
}
