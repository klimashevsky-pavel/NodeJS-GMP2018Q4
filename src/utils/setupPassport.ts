import { Strategy as LocalStrategy } from 'passport-local';
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

    passport.serializeUser(function(user: User, done) {
        done(null, user.userName);
    });

    passport.deserializeUser(function(userName: string, done) {
        const userFromDB = find(users, { userName });
        userFromDB ? done(null, userFromDB) : done(null, false);
    });
}

export { setupPassport };
