
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import io from 'socket.io-client';
import Video from 'react-native-video';
import {SelectableText}  from '@astrocoders/react-native-selectable-text';
const meanings = {hi : "Merhaba" , dynamic : "dinamik" , condition : "koşul"};
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      chatMessage : "",
      chatMessages : [],
      videoOrMessage : "message",
      translation: "asdasdasd",
    };
  }
  componentDidMount(){
    this.socket = io("http://192.168.1.29:3000");
    this.socket.on("chat message",msg => {
      this.setState({chatMessages : [...this.state.chatMessages, msg]});
    });
  }
  getTranslation(content){
    
  }
  getTheVideo(){
    if(this.state.videoOrMessage == "video"){
      return(
        <Video source={{uri: "background"}}   // Can be a URL or a local file.
         ref={(ref) => {
           this.player = ref
         }}                                      // Store reference
         onBuffer={this.onBuffer}                // Callback when remote video is buffering
         onError={this.videoError}               // Callback when video cannot be loaded
         style={styles.backgroundVideo} />
      );
    }
    else if(this.state.videoOrMessage == "message" )
    {
      return(
        <SelectableText
          menuItems={this.state.translation}
          /* 
            Called when the user taps in a item of the selection menu:
            - eventType: (string) is the label
            - content: (string) the selected text portion
            - selectionStart: (int) is the start position of the selected text
            - selectionEnd: (int) is the end position of the selected text
          */
          //onSelection={({ eventType, content, selectionStart, selectionEnd }) => {}}
          value="I crave star damage"
        >asdasdasdasd</SelectableText>
      );
    }
  }
  submitChatMessage(){
    console.log(this.state.chatMessage);
    this.socket.emit("chat message",this.state.chatMessage);
    this.setState({chatMessage : ""});
  }
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View style={{width:'100%',height:25,backgroundColor:'#fb8c00'}}>
        <Text selectable={true} key={chatMessage} style={{marginLeft: 20, color:'#eeeeee'}}>{chatMessage}</Text>
      </View>))


    return (
      <View style={styles.container}>
     
     <SelectableText
          menuItems={["Foo", "Bar"]}
          /* 
            Called when the user taps in a item of the selection menu:
            - eventType: (string) is the label
            - content: (string) the selected text portion
            - selectionStart: (int) is the start position of the selected text
            - selectionEnd: (int) is the end position of the selected text
          */
          onSelection={({ eventType, content, selectionStart, selectionEnd }) => {}}
          value="I crave star damage"
      />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  messageInput:{
    height: 100,
    width:'100%',
    backgroundColor:'gray',
    borderColor: 'green',
    fontSize:20
  }
});
