import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';
import Config from './App/Config';

async function main() {
  try {
    await mongoose.connect(Config.dataBaseUrl as string);

    app.listen(Config.port, () => {
      console.log(`Bike Store Server Is Running On Port => ${Config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
