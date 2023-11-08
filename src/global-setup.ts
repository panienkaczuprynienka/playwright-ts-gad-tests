import dotenv from 'dotenv';

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
 // console.log('!!! Base url: ', process.env.BASE_URL);
}

export default globalSetup;
