import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';
import Config from './App/Config';

async function main() {
  try {
    await mongoose.connect(Config.dataBaseUrl as string);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.listen(Config.port, () => {
      console.log(`Example app listening on port ${Config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
