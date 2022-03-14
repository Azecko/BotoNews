const passport = require("passport");
import home from '../lib/pages/Home';
import profile from '../lib/pages/profile';
import isLoggedIn from '../lib/pages/isLoggedIn';
import login from '../lib/pages/login';
import respond from '../lib/Respond';
import news from '../lib/News';
import user from '../lib/User'
import user_edit from '../lib/User_edit';
import subscriptions from '../lib/subscriptions';
export class ApiRoutes {
  server: any;
  constructor(server: any) {
    this.server = server;
  }

  listen() {
    this.server.get('/', home);
    this.server.get('/hello/:name', respond);
    this.server.head('/hello/:name', respond);
    this.server.get('/users/:user_id_or_username', user);
    this.server.post('/users', user);
    this.server.post('/users/edit', user_edit);
    this.server.delete('/users', user);
    this.server.get('/profile/personal-details', isLoggedIn, profile);
    this.server.get('/profile/settings', isLoggedIn, profile);
    this.server.get('/profile/settings/:id_subscription', isLoggedIn, profile);
    this.server.get('/profile/linked-accounts', isLoggedIn, profile);
    this.server.get('/profile/subscriptions', isLoggedIn, profile);
    this.server.get('/profile', isLoggedIn, profile);
    // Subscriptions
    this.server.get('/subscriptions/:id_subscription', subscriptions);
    this.server.get('/subscriptions/user/:user', subscriptions);
    this.server.post('/subscriptions', subscriptions);
    this.server.delete('/subscriptions/:id_subscription', subscriptions);
    this.server.put('/subscriptions/:id_subscription', subscriptions);

    this.server.get('/login', login)
    this.server.get('/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'] })
    )
    this.server.get('/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/',
      })
    )
    this.server.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
    )
    this.server.get('/github/callback',
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/',
      scope: ['user:email']
      })
    )
    this.server.get('/auth/failure', (req:any, res:any) => {
      res.send('something went wrong..');
    })
    this.server.get('/logout', function(req:any, res:any){
      req.logout();
      res.redirect('/');
    });
  }
}
