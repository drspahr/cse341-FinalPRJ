const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Welcome!');
});

router.use('/groceries', require('./groceries'));
router.use('/electronics', require('./electronics'));
router.use('/clothing', require('./clothing'));
router.use('/user', require('./usermanage'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout',function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err);}
        res.redirect('/');
    });
});


module.exports = router;