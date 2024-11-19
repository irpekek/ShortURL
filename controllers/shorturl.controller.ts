// @deno-types="@types/express"
import { Request, Response } from 'npm:express';
import { generateText } from '../utils/randomUtils.ts';
import { Shorturl } from '../models/Shorturl.model.ts';
import { Types } from 'mongoose';
import { Model } from 'mongoose';

export interface IUrlData {
  _id: Types.ObjectId;
  url: string;
  shortCode: string;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUrlModel extends Model<IUrlData> {
  incrementAccessCount(shortCode: string): Promise<IUrlData | null>;
}

async function generateShortCode(): Promise<string> {
  let result;
  const shortCode = generateText();
  try {
    result = await Shorturl.find({ shortCode: shortCode });
  } catch (_error) {
    throw new Error('Error while generate short code');
  }
  return result.length === 0 ? shortCode : generateShortCode();
}

export async function findByShortcode(
  request: Request,
  response: Response
): Promise<void> {
  const { shortCode } = request.params;
  try {
    const result = await Shorturl.find({ shortCode });
    result.length
      ? response.status(200).json(result)
      : response.sendStatus(404);
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}

export async function createShorturl(
  request: Request,
  response: Response
): Promise<void> {
  const { url } = request.body;
  if (url) {
    let shortCode, result;
    try {
      shortCode = await generateShortCode();
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
    try {
      const shortUrl = new Shorturl({ url, shortCode });
      result = await shortUrl.save();
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
    response.status(201).json(result);
  } else response.sendStatus(400);
}

export async function updateShorturl(
  request: Request,
  response: Response
): Promise<void> {
  const { shortCode } = request.params;
  const { url } = request.body;
  let result;
  if (!url || !shortCode) response.sendStatus(400);
  try {
    result = await Shorturl.findOneAndUpdate(
      { shortCode },
      { url, shortCode },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
  result ? response.status(200).json(result) : response.sendStatus(404);
}

export async function deleteShorturl(
  request: Request,
  response: Response
): Promise<void> {
  const { shortCode } = request.params;
  let result;
  try {
    result = await Shorturl.findOneAndDelete({ shortCode });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
  result ? response.sendStatus(204) : response.sendStatus(404);
}

export async function getUrlStatistics(request: Request, response: Response): Promise<void> {
  const {shortCode} = request.params
  try {
    const urlStats = await Shorturl.findOne({shortCode})
    urlStats ? response.status(200).json(urlStats) : response.sendStatus(404)
  } catch (error) {
    console.log(error)
    response.sendStatus(500)
  }
}

export async function redirectToUrl(
  request: Request,
  response: Response
): Promise<void> {
  const { shortCode } = request.params;
  let result;
  try {
    result = await Shorturl.findOne({ shortCode });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
  result
    ? response.redirect(result.url)
    : response.status(404).send('<h1>404 Not Found</h1>');
}
