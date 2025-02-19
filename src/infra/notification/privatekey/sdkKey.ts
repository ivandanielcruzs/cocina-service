const config = {
  type: process.env.FIRABASE_TYPE,
  project_id: process.env.FIRABASE_PROJECT_ID,
  private_key_id: process.env.FIRABASE_PRIVATE_KEY_ID,
  private_key: process.env.FIRABASE_PRIVATE_KEY,
  client_email: process.env.FIRABASE_CLIENT_EMAIL,
  client_id: process.env.FIRABASE_CLIENT_ID,
  auth_uri: process.env.FIRABASE_AUTH_URI,
  token_uri: process.env.FIRABASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIRABASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIRABASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIRABASE_UNIVERSE_DOMAIN,
};
export default config;
