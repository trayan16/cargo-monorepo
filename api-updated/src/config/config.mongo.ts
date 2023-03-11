import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // poolSize: 10,
    // authSource: 'admin',
    // ssl: true,
    // sslValidate: true,
  },
}));
