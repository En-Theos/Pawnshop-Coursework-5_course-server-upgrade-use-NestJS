export default () => ({
    jwt_access_secret_key: process.env.JWT_ACCESS_SECRET_KEY,
    jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY
})