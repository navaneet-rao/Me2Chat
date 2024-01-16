import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, Button, ScrollView } from "react-native";
import React, { useState} from 'react'
import { FIREBASE_AUTH } from '../../../config/FirebaseConfig';
import { useNavigation } from "@react-navigation/native";
import { BGImage, BGImage1, BGImage2, Logo } from "../../../assets"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

import UserInputTextField from "../../../components/authComponents/UserInputTextField";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type SignUpScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const SignUp: React.FC = () => {

  const screenWidth = Math.round(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<SignUpScreenProp>();
 
  const auth = FIREBASE_AUTH;
  
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const user = userCred.user;
        await sendEmailVerification(user)
        updateProfile(user, {
          displayName: name,
          photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
        })
        .then(() => {
          alert('Registered, please login.');
        })
      });
      console.log(response);
      alert('Check your Emails!');
    } catch (error: any) {
      console.log(error);
      alert('Registration Failed: ' + error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <Image 
      source={BGImage1}
      resizeMode="cover"
      className="h-96 w-full"
      />
      <View className="w-full h-full bg-white rounded-t-[45px] -mt-44 items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-center text-primaryText text-xl front-semibold ">
          {" "}
          Hello There!!!{"\n"}
          Lets Create your Account
        </Text>
        <View className="container ">
          <UserInputTextField placeholder={"Avatar"} handleChange={(data: React.SetStateAction<string>) => setEmail(data)} />
          <UserInputTextField placeholder={"Email"} handleChange={(data: React.SetStateAction<string>) => setEmail(data)} />
          <UserInputTextField placeholder={"Name"} handleChange={(data: React.SetStateAction<string>) => setName(data)} />
          <UserInputTextField placeholder={"Password"} handleChange={(data: React.SetStateAction<string>) => setPassword(data)}/>
        {loading? ( <ActivityIndicator size="large" color="#0000ff" /> 
        ) : (
          <> 
            <View className="py-3 flex  ">
              <TouchableOpacity onPress={signUp} className="bg-orange-500 py-4 m-4 rounded">
                <Text className="text-white text-xl font-semibold text-center">Create Account</Text>
              </TouchableOpacity>
              <View className="flex flex-row justify-center text-center text-primaryText text-xl front-semibold my-6 ">
                <Text className="text-xl" >
                  Have an account !!!{"  "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                  <Text className="text-xl underline text-orange-500 font-bold">LogIn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        </View >
      </View>
    </ScrollView>
  )
}

export default SignUp