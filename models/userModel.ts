import * as mongoose from 'mongoose';
import * as slugger from 'mongoose-slugger-plugin';

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  city: string;
  slug: string;
}

const schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  city: String,
  slug: String
});

schema.index({ city: 1, slug: 1 }, { name: 'city_slug', unique: true });

schema.plugin(slugger.plugin, new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: ['firstname', 'lastname'],
  index: 'city_slug'
}));

let Model = mongoose.model<IUser>('UserModel', schema);
Model = slugger.wrap(Model);

export default Model;
