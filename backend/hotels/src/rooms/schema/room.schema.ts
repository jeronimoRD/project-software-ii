import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MoongooseSchema } from 'mongoose';
import { RoomType } from '../dto/room.dto';
import { Hotel } from '../../hotels/schema/hotel.schema';
export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, type: MoongooseSchema.Types.ObjectId, ref: 'Hotel' })
  hotel: Hotel;

  @Prop({ required: true })
  capacity: number;

  @Prop({
    type: String,
    enum: Object.values(RoomType),
    defaults: RoomType.STANDARD,
  })
  type: RoomType;

  @Prop({ required: true, min: 0, default: 0 })
  price: number;

  @Prop({ required: true, default: false })
  isOccupied: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
