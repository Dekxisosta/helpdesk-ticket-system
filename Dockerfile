FROM php:8.3-apache

RUN apt-get update && apt-get install -y git unzip curl libzip-dev \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && docker-php-ext-install pdo_mysql zip \
 && a2enmod rewrite \
 && rm -rf /var/lib/apt/lists/*

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction \
 && npm ci && npm run build && rm -rf node_modules \
 && chown -R www-data:www-data storage bootstrap/cache

CMD sh -c "sed -i \"s/Listen 80/Listen \${PORT:-10000}/\" /etc/apache2/ports.conf \
 && sed -i \"s/:80/:\${PORT:-10000}/\" /etc/apache2/sites-available/000-default.conf \
 && php artisan migrate --force --seed \
 && php artisan config:cache && php artisan route:cache && php artisan view:cache \
 && apache2-foreground"
