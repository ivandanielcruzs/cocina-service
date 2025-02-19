import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [
      {
        ingredientId: { type: Types.ObjectId, ref: 'Ingredient' },
        quantity: Number,
      },
    ],
    required: true,
  })
  ingredients: {
    ingredientId: { type: Types.ObjectId; ref: 'Ingredient' };
    quantity: number;
  }[];

  @Prop({ required: true })
  instructions: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
