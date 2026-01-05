import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {City, Offer, OfferType, UserType} from '../../types/index.js';

export class TsvFileReader implements FileReader {
  private rawData: string = '';

  constructor(
    private filename: string
  ) {}

  read() {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        postDate,
        city,
        preview,
        images,
        isPremium,
        isFavorite,
        rating,
        type,
        rooms,
        guests,
        price,
        name,
        email,
        avatar,
        isPro,
        coordinates
      ]) => {
        const [lat, lng] = coordinates.split(';');

        return {
          title,
          description,
          postDate: new Date(postDate),
          city: city as City,
          preview,
          images: images.split(';'),
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseFloat(rating),
          type: type as OfferType,
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          price: Number.parseInt(price, 10),
          author: {
            name,
            email,
            avatar,
            type: isPro === 'true' ? UserType.PRO : UserType.DEFAULT,
          },
          coordinates: {
            lat: Number.parseFloat(lat),
            lng: Number.parseFloat(lng),
          },
        };
      });
  }
}
