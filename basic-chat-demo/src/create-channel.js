"use strict";
var _this = this;
exports.__esModule = true;
var Diffusion = require("diffusion");
Diffusion.connect({ host: window.location.host, principal: 'control', credentials: 'password' }).then(function (session) {
    _this.chatSession = session;
    return session.topics.add('chat/channel', Diffusion.topics.TopicType.JSON).then(function (res) { return console.log('Chat channel created'); });
});
