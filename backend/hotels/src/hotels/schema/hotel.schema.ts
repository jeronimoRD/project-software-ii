import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({
    required: true,
    default: 'https://ejemplo.com/banner-default.jpg'
  })
  banner: string;

  @Prop({
    required: true,
    default: 'https://ejemplo.com/foto-default.jpg'
  })
  photo: string;

  @Prop({
    required: true,
    default: 'Descripción no disponible',
    minlength: 20,
    maxlength: 2000
  })
  description: string;

  @Prop({ required: false, min: 0, default: 0 })
  lower_price: number;

  @Prop({ required: false, min: 0, default: 0 })
  higher_price: number;

  @Prop({ required: false, min: 0, max: 5, default: 0 })
  rating: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);