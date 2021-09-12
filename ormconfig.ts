module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "blog",
   "password": "sgs19950218",
   "database": process.env.NODE_ENV === "production" ? "blog_production" : "blog_development",
   "synchronize": false,
   "logging": false,
   "entities": [
      "build/entity/**/*.js"
   ],
   "migrations": [
      "build/migration/**/*.js"
   ],
   "subscribers": [
      "build/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
