'use strict';

var helpers = require('app/api/helpers');
var pr = require('app/util/pr');
var auth = require('app/util/auth');

var router_impl = require('app/api/user/router_impl');

var express = require('express');
var router = new express.Router();
router.get('/user', auth.mw.ensure_auth, helpers.inject_pr_into_router_impl(router_impl.get_user, pr));
router.get('/logout', auth.mw.ensure_auth, router_impl.logout);

router.post('/access/local/login', auth.mw.ensure_unauth, router_impl.access_local_check_login_post,
  router_impl.access_local_login);
router.post('/access/local/signup', auth.mw.ensure_unauth, router_impl.access_local_check_login_signup,
  router_impl.access_local_signup);

router.get('/access/facebook/auth', auth.mw.ensure_unauth, router_impl.access_facebook_auth);
router.get('/access/facebook/callback', auth.mw.ensure_unauth, router_impl.access_facebook_callback);
router.get('/access/google/auth', auth.mw.ensure_unauth, router_impl.access_google_auth);
router.get('/access/google/callback', auth.mw.ensure_unauth, router_impl.access_google_callback);
router.get('/access/twitter/auth', auth.mw.ensure_unauth, router_impl.access_twitter_auth);
router.get('/access/twitter/callback', auth.mw.ensure_unauth, router_impl.access_twitter_callback);


router.get('/connect/facebook/auth', auth.mw.ensure_auth, router_impl.connect_facebook_auth);
router.get('/connect/facebook/callback', auth.mw.ensure_auth, router_impl.connect_facebook_callback,
  auth.mw.redirect_to);
router.post('/connect/facebook/disconnect', auth.mw.ensure_auth, router_impl.connect_facebook_disconnect);
router.get('/connect/google/auth', auth.mw.ensure_auth, router_impl.connect_google_auth);
router.get('/connect/google/callback', auth.mw.ensure_auth, router_impl.connect_google_callback, auth.mw.redirect_to);
router.post('/connect/google/disconnect', auth.mw.ensure_auth, router_impl.connect_google_disconnect);
router.get('/connect/twitter/auth', auth.mw.ensure_auth, router_impl.connect_twitter_auth);
router.get('/connect/twitter/callback', auth.mw.ensure_auth, router_impl.connect_twitter_callback, auth.mw.redirect_to);
router.post('/connect/twitter/disconnect', auth.mw.ensure_auth, router_impl.connect_twitter_disconnect);

module.exports = router;
