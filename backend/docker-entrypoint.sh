#!/bin/sh
set -e

# Lance les migrations Adonis avant de démarrer l'app.
# Appelé depuis docker-compose.yaml en mode dev ET depuis l'image prod.
echo "▶ Running migrations..."
node ace migration:run --force || {
  echo "⚠ Migration failed — continuing anyway (le serveur démarrera quand même)"
}

# Choix du seeder selon l'environnement :
#   dev  -> index_seeder         (seed complet : muscles, exercices, users de dev, workouts...)
#   prod -> initial_data_seeder  (muscles + exercices uniquement)
if [ "$NODE_ENV" = "development" ]; then
  SEEDER_NAME="index_seeder"
else
  SEEDER_NAME="initial_data_seeder"
fi
# Le fichier est .js en prod (image build) et .ts en dev (volume monté).
if [ -f "database/seeders/main/$SEEDER_NAME.js" ]; then
  DATA_SEEDER="database/seeders/main/$SEEDER_NAME.js"
else
  DATA_SEEDER="database/seeders/main/$SEEDER_NAME.ts"
fi
echo "▶ Seeding data from $DATA_SEEDER..."
node ace db:seed --files="$DATA_SEEDER" || echo "⚠ Data seed failed — continuing"

# Seed admin (idempotent — skip si ADMIN_EMAIL/ADMIN_PASSWORD absents ou si user existe).
# Le fichier est .ts en dev (volume monté) et .js en prod (image build).
if [ -n "$ADMIN_EMAIL" ] && [ -n "$ADMIN_PASSWORD" ]; then
  if [ -f database/seeders/main/admin_seeder.js ]; then
    SEEDER_FILE="database/seeders/main/admin_seeder.js"
  else
    SEEDER_FILE="database/seeders/main/admin_seeder.ts"
  fi
  echo "▶ Seeding admin user from $SEEDER_FILE..."
  node ace db:seed --files="$SEEDER_FILE" || echo "⚠ Admin seed failed — continuing"
fi

echo "▶ Starting AdonisJS..."
exec "$@"
