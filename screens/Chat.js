import React from 'react';
import { GiftedChat, Bubble, Send, Time } from 'react-native-gifted-chat';
import { Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import firebase from 'firebase';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateCode, updateName, signup } from '../actions/user';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, updateName, signup, updateCode }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.user.name,
      email: this.props.user.email,
      _id: this.uid
    };
  }

  render() {
    return (
        <View style = {{flex: 1, paddingTop: 20}}>
          <Icon
            raised
            name='arrow-left'
            type='entypo'
            color='black'
            reverse = {true}
            onPress = {() => this.props.navigation.navigate('WasherDryer')} 
            size = {20}/>
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        renderSend = {this.renderSend}
        renderUsernameOnMessage = {true}
        renderTime = {this.renderTime}
        alwaysShowSend = {true}
        renderBubble = {this.renderBubble}
      />
      </View>
    );
  }

  renderSend = (props) => {
    return (
      <Send {...props}>
          <Icon
      raised
      name='send'
      type='material-community'
      color='black'
      size = {16}
      reverse = {true} />
      </Send>
    );
  }

  renderTime(props) {
    return (
      <Time
        {...props}
        textStyle={{
          right: {
            color: "black"
          },
          left: {
            color: "white"
          }
        }}
      />
    );
  }

  renderBubble = (props) => {
    return ( 
    <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: '#E9E9E9',
          },
          right: {
            backgroundColor: '#287CDC'
          }}} /> 
          )};

  componentDidMount() {
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.refOff();
  }
  parse = snapshot => {
    const { text, user, createdAt } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat

    const message = {
      id,
      _id,
      createdAt,
      text,
      user,

    };
    return message;
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  refOff() {
    this.ref.off();
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  refOn = callback => {
      this.ref
        .limitToLast(100)
        .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

  get ref() {
      return firebase.database().ref('Messages/' + this.props.user.code);
  }

  send = messages => {
      for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {text, user, createdAt: this.timestamp, time: this.timestamp};
        this.ref.push(message);
      }
  };
}  

export default connect(mapStateToProps, mapDispatchToProps)(Chat);