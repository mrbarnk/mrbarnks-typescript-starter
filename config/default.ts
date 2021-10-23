export default {
  port: process.env.PORT || 4000,
  host: "localhost",
  dbUri: process.env.DB_URL,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `Generate a random key here https://app.id123.io/free-tools/key-generator/ online.`,
};
