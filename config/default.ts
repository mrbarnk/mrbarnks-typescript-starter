export default {
  port: process.env.PORT || 3111,
  host: "localhost",
  dbUri: "mongodb+srv://webcop-backend-rest-api-db:iZKdC4n_3SLP2ai@cluster0.vcuz7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN PRIVATE KEY-----
  MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKXCGqBMZmdfYnu7
  DKXkmzTq/L2iz+VQniSPew0H1pPL1KWcO2ybiJvZuLEGDrg3Y2qBYah+FqrLJhjM
  AvyJV4N54tBUcaDjhxbrTA1dqC8XaFy14Ubn/ndRTxqrXfzmu0b1uszV8Nnp3M3n
  K/WJ12B0Q5q7xLqDrbw309v8c82pAgMBAAECgYAPtDkTkMlu58GL2WfUW7k8pTq2
  uLMblay16AYPcPuqWvhVjFyw6Hdj1JfD5cAFQfIgSAu5i+CX49FDLijmRhjNS/iF
  e4lIfUoniQaSXR34aJKYS6+NwszyLyCeQlv5C63VdnsYb7LPgsP87aDb8Uts3llW
  182EePPl6os58V5FUQJBANDw3J/8Dln6yZvmYzWlgbCu8mtaateVNLUrynKHCf/y
  U+E5Y3DCITnAnu2/RpweBuk03vOzEVmYFNQz6BkXvFUCQQDLF2lqYLVvlmkiHyT+
  pHw7bqDo8MMlc2dNUD0Xjp0oDsnBEsClvT8d4uLBRwQv17BNKXvzbbeTXzbk6u5M
  KKAFAkEAmvCyOrU4k0MlNEXRdhvIo5PoUvGW301W666QjwNSyAkUaKUc96YN63zK
  njVEkEq4B0Hcv00f5ZeggogHamwujQJAITnpUzATPvhapux1fvumH4sP5ExPgPcK
  dYmlFQ+OApm4xE+vGO6HPvp5oqlds/4Tp+wbjU3r9L5lGrqc1fTniQJBALyhFMH8
  o1aHbWJrF7O4V/H4Gd1a0KzBygKZHyxrlxBh5nfVeL9YMS3ZnBcHrbWFXJegzScn
  GqiqVXTegKtjakU=
  -----END PRIVATE KEY-----`,
};
