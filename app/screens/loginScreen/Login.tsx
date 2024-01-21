import { View, Text, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState} from 'react'
import { FIREBASE_AUTH } from '../../../config/FirebaseConfig';
import { Link, useNavigation } from "@react-navigation/native";
import {  BGImage1, Logo } from "../../../assets"

import { signInWithEmailAndPassword } from "firebase/auth";

import UserInputTextField from "../../../components/authComponents/UserInputTextField";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type LogInScreenProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const Login: React.FC = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LogInScreenProp>();
 
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert('SignIn Failed: ' + error.message);
    }finally{
      setLoading(false);
    }
  }


  return (
    <View className="flex-1 items-center justify-start">
      <Image 
      source={BGImage1}
      resizeMode="cover"
      className="h-96 w-full"
      />
      <View className="w-full h-full bg-white rounded-t-[45px] -mt-44 items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl text-center front-semibold ">
          {" "}
          Welcome Back{"\n"}
          Login to your Account
        </Text>
        <View className="container ">
          <UserInputTextField placeholder={"Email"} handleChange={(data: React.SetStateAction<string>) => setEmail(data)} isPass={false} />
          <UserInputTextField placeholder={"Password"} handleChange={(data: React.SetStateAction<string>) => setPassword(data)} isPass={true}/>
        {loading? ( <ActivityIndicator size="large" color="#0000ff" className="py-10"/> 
        ) : (
          <View className="py-3 flex  ">
              <TouchableOpacity onPress={signIn} className="bg-orange-500 py-4 m-3 rounded">
                <Text className=" text-white text-xl font-semibold text-center">Login</Text>
              </TouchableOpacity>
              <View className="flex flex-row justify-center text-center text-primaryText text-xl front-semibold my-6 ">
                <Text className="text-xl" >
                  Don't have an account?{"  "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                  <Text className="text-xl underline text-orange-500 font-bold">Sign Up</Text>
                </TouchableOpacity>
              </View>
          </View>
        )}
        </View >
      </View>
    </View>
  );
  
}

export default Login

