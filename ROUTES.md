# API's ROUTES

Ce fichier décrit les routes disponibles dans l'API de Botonews.

Merci de lire les documents suivants qui donnent de bon conseils sur comment
architecturer les routes d'une API.

* https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
* https://www.moesif.com/blog/technical/api-design/REST-API-Design-Best-Practices-for-Sub-and-Nested-Resources/
* https://swagger.io/resources/articles/best-practices-in-api-design/


## Notes

* Nous avons délibérément décidé d'utiliser la forme pluriel pour le premier path, par exemple `/users`, `/subscriptions`, etc. et de ne pas faire de distinction en fonction du nombre d'éléments retournés.
* Il n'y a pas de double routes telles que `/users/subscriptions` et `/subscriptions/users` qui retrournent le même contenu ; c'est l'élément le plus important (selon nous) qui est en premier.
* Pour le moment ce fichier ne fait pas mention de route authentifiées ou non.

## Routes

| URLs                           | Method | Info                                                |
| :----------------------------- | :----- | :-------------------------------------------------- |
| `/`                            | GET    | home : display API documentation                    |
| `/users`                       | GET    | Get all users                                       |

GET '/', home);
GET '/hello/:name', respond);
HEAD '/hello/:name', respond);
GET '/news', news);
GET '/users', user);
POST '/users', user);
POST '/users/edit', user_edit);
POST '/users/:support', user_edit);
DELETE '/users', user);
GET '/profile/personal-details', isLoggedIn, profile);
GET '/profile/settings', isLoggedIn, profile);
GET '/profile/linked-accounts', isLoggedIn, profile);
GET '/profile/subscriptions', isLoggedIn, profile);
GET '/profile', isLoggedIn, profile);

// Subscriptions
GET '/subscriptions/:id_subscription', subscriptions);
GET '/subscriptions/user/:user', subscriptions);
POST '/subscriptions', subscriptions);
DELETE '/subscriptions/:id_subscription', subscriptions);
PUT '/subscriptions/:id_subscription', subscriptions);

GET '/login', login)
GET '/auth/google'
GET '/google/callback'
GET '/auth/github'
GET '/github/callback'
GET '/auth/failure'
GET '/logout