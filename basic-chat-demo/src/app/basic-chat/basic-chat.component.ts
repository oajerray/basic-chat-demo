import { Component, OnInit } from '@angular/core';
import * as diffusion from 'diffusion';

@Component({
  selector: 'app-basic-chat',
  templateUrl: './basic-chat.component.html',
  styleUrls: ['./basic-chat.component.css']
})
export class BasicChatComponent implements OnInit {
  constructor() { }
  chatSession: diffusion.Session;
  chatlog = new Array();
  ngOnInit() {
    diffusion.connect({ host: window.location.host, port: 8080, principal: 'control', credentials: 'password' }).then((session) => {
      this.chatSession = session;



      return session.topics.add(
        'chat/channel',
        diffusion.topics.TopicType.JSON).then((res) => {
          console.log(res);
          // subscribing from here:
          session.select('chat/channel');
          return session.addStream('chat/channel', diffusion.datatypes.json()).on('value', (topic, specification, newValue, oldValue) => {
            this.chatlog.push('Chat message from \'' + this.chatSession.security.getPrincipal()
              + '\': ' + JSON.stringify(newValue.get().content));

          });
        }, (err) => console.log(err));
    });
  }

  writeMessage(message: string) {
    this.chatSession.topics.update(
      'chat/channel',
      { content: message }).then((res) => { }, (err) => console.log(err));
  }
}
