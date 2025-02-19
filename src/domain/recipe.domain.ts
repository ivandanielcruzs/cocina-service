export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public ingredients: { id: string; name: string; quantity: number }[],
    public instructions: string,
  ) {}
}
