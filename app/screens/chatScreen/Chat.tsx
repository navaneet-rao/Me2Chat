import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FIREBASE_AUTH as auth } from '../../../config/FirebaseConfig' ;
import { signOut } from 'firebase/auth';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

interface ChatProps {
    navigation: any; // replace with the actual type of navigation
}

const Chat: React.FC<ChatProps> = ({ navigation }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                          uri: auth?.currentUser?.photoURL || '', // Ensure uri is a string and not nullable
                      }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={signOutNow}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }, []);

    return (
      <>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
              _id: auth?.currentUser?.email || '',
              name: auth?.currentUser?.displayName || '',
              avatar: auth?.currentUser?.photoURL || ''
          }}
        />
      </>
        
    );
}

export default Chat;
