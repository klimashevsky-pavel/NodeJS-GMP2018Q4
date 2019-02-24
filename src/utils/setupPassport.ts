import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { find } from 'lodash';
import users, { User } from 'config/users';

function setupPassport(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'userName',
                passwordField: 'password'
            },
            function(username, password, done) {
                const userFromDB = find(users, { userName: username, password });
                userFromDB ? done(null, userFromDB) : done(null, false);
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: '2237257873251788',
                clientSecret: 'a5cc1fd744f81f2c0ae81e835799007d',
                callbackURL: 'http://localhost:8080/login/facebook/callback'
            },
            function(accessToken, refreshToken, profile, cb) {
                console.log('profile----------->', profile);
                cb(null, {});
            }
        )
    );

    passport.serializeUser(function(user: User, done) {
        done(null, user.userName);
    });

    passport.deserializeUser(function(userName: string, done) {
        const userFromDB = find(users, { userName });
        userFromDB ? done(null, userFromDB) : done(null, false);
    });
}

export { setupPassport };
