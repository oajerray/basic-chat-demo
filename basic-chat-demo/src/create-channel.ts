import * as Diffusion from 'diffusion';

Diffusion.connect({ host: window.location.host, principal: 'control', credentials: 'password' }).then((session) => {
    this.chatSession = session;
    return session.topics.add('chat/channel', Diffusion.topics.TopicType.JSON).then((res) => console.log('Chat channel created'));
});
