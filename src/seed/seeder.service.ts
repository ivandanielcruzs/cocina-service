import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Ingredient } from '../schemas/ingredient.schema';
import { Recipe } from '../schemas/recipe.schema';
import { EncryptService } from '../infra/encrypt/encrypt.service';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    private readonly encryptService: EncryptService,
  ) {}

  async seed() {
    console.log('🌱 Checking database...');
    // count in order to avoid repeat elements
    const userCount = await this.userModel.countDocuments();
    if (userCount > 0) {
      console.log('⚠️ Users already exist. Skipping seeding.');
      return;
    }
    console.log('🌱 Seeding database...');
    const pass1 = await this.encryptService.hash('Securepass456');
    const pass2 = await this.encryptService.hash('Securepass500');
    const users = await this.userModel.insertMany([
      { username: 'chef_1', role: 'CHEF', password: pass1 },
      { username: 'gerente', role: 'GERENTE', password: pass2 },
    ]);
    console.log(`✅ Inserted ${users.length} users`);
    const ingredienstsList = [
      'tomato',
      'lemon',
      'potato',
      'rice',
      'ketchup',
      'lettuce',
      'onion',
      'cheese',
      'meat',
      'chicken',
    ];
    const ingrediensts = await this.ingredientModel.insertMany(
      ingredienstsList.map((item) => ({ name: item, stock: 5 })),
    );

    console.log(`✅ Inserted ${ingrediensts.length} ingrediensts`);

    const tomato = await this.ingredientModel.findOne({ name: 'tomato' });
    const lemon = await this.ingredientModel.findOne({ name: 'lemon' });
    const potato = await this.ingredientModel.findOne({ name: 'potato' });
    const rice = await this.ingredientModel.findOne({ name: 'rice' });
    const ketchup = await this.ingredientModel.findOne({ name: 'ketchup' });
    const onion = await this.ingredientModel.findOne({ name: 'onion' });
    const cheese = await this.ingredientModel.findOne({ name: 'cheese' });
    const meat = await this.ingredientModel.findOne({ name: 'meat' });
    const chicken = await this.ingredientModel.findOne({ name: 'chicken' });
    const lettuce = await this.ingredientModel.findOne({ name: 'lettuce' });

    const recetas = [
      {
        name: 'Ensalada de Pollo con Queso y Aderezo de Ketchup',
        ingredients: [
          { ingredientId: chicken?._id, quantity: 1 },
          { ingredientId: lettuce?._id, quantity: 2 },
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: lemon?._id, quantity: 1 },
          { ingredientId: ketchup?._id, quantity: 1 },
          { ingredientId: cheese?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Cocina la pechuga de pollo y desmenúzala.<br />
        Mezcla la lechuga picada, la cebolla y el queso rallado.<br />
        En un bowl, mezcla el ketchup con el jugo de limón para hacer un aderezo.<br />
        Agrega el pollo a la ensalada y vierte el aderezo encima.<br />
        ¡Listo! Sirve frío.<br />`,
      },
      {
        name: 'Papas Rellenas de Carne y Queso',
        ingredients: [
          { ingredientId: potato?._id, quantity: 2 },
          { ingredientId: meat?._id, quantity: 1 },
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: cheese?._id, quantity: 1 },
          { ingredientId: ketchup?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Cocina las papas en agua hirviendo hasta que estén blandas.<br />
        Pártelas a la mitad y retira parte del centro.<br />
        Cocina la carne molida con la cebolla, sal y pimienta.<br />
        Mezcla la carne con la pulpa de la papa y el queso.<br />
        Rellena las papas con la mezcla y hornea a 180°C por 15 minutos.<br />
        Sirve con un poco de ketchup encima.<br />`,
      },
      {
        name: 'Arroz con Pollo y Limón 🍛🍋',
        ingredients: [
          { ingredientId: rice?._id, quantity: 1 },
          { ingredientId: chicken?._id, quantity: 1 },
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: lemon?._id, quantity: 1 },
          { ingredientId: ketchup?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Cocina el arroz en agua con sal hasta que esté listo.<br />
        En una sartén, sofríe la cebolla, agrega el pollo y cocina hasta dorar.<br />
        Agrega el arroz cocido y mezcla bien.<br />
        Exprime el jugo de limón sobre el arroz.<br />
        Sirve con un poco de ketchup encima como salsa.<br />`,
      },
      {
        name: 'Hamburguesa Casera con Queso y Ketchup 🍔🧀',
        ingredients: [
          { ingredientId: lettuce?._id, quantity: 2 },
          { ingredientId: meat?._id, quantity: 1 },
          { ingredientId: cheese?._id, quantity: 1 },
          { ingredientId: ketchup?._id, quantity: 1 },
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: tomato?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Forma una hamburguesa con la carne y cocínala en una sartén.<br />
        Coloca el queso encima para que se derrita.<br />
        Arma la hamburguesa con lechuga, tomate, cebolla y ketchup.<br />
        ¡Disfruta!`,
      },
      {
        name: 'Sopa de Cebolla con Arroz y Pollo 🍲🍚',
        ingredients: [
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: chicken?._id, quantity: 1 },
          { ingredientId: rice?._id, quantity: 1 },
          { ingredientId: potato?._id, quantity: 1 },
          { ingredientId: lemon?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Cocina el arroz en agua con sal hasta que esté listo.<br />
        En otra olla, sofríe la cebolla hasta caramelizarla.<br />
        Agrega el pollo y la papa en cubos, cubre con agua y cocina hasta que todo esté tierno.<br />
        Mezcla con el arroz cocido y agrega jugo de limón al servir.<br />
        ¡Disfruta!<br />`,
      },
      {
        name: 'Ensalada Fresca de Tomate, Queso y Limón 🍅🧀',
        ingredients: [
          { ingredientId: tomato?._id, quantity: 1 },
          { ingredientId: cheese?._id, quantity: 1 },
          { ingredientId: lettuce?._id, quantity: 1 },
          { ingredientId: onion?._id, quantity: 1 },
          { ingredientId: lemon?._id, quantity: 1 },
          { ingredientId: ketchup?._id, quantity: 1 },
        ],
        instructions: `👩‍🍳 Preparación:<br />
        Mezcla el tomate, queso, lechuga y cebolla en un bowl.<br />
        Agrega el jugo de limón y mezcla bien.<br />
        Sirve con un poco de ketchup como aderezo si lo deseas.<br />
        ¡Disfruta!<br />`,
      },
    ];
    await this.recipeModel.insertMany(recetas);

    console.log(`✅ Inserted ${recetas.length} recetas`);
  }
}
