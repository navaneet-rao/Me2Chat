import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { BGImage1, Logo, defAvatar } from "../../../assets";
import * as ImagePicker from "expo-image-picker";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import UserInputTextField from "../../../components/authComponents/UserInputTextField";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type SignUpScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const SignUp: React.FC = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Stores the selected image URI
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Function to pick an image from
  //the device's media library
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
        roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setAvatar(result.uri);
        // Clear any previous errors
        setError(null);
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<SignUpScreenProp>();

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (userCred) => {
        const user = userCred.user;
        await sendEmailVerification(user);
        updateProfile(user, {
          displayName: name,
          photoURL: avatar ? avatar : defAvatar,
        }).then(() => {
          alert("Registered, please login.");
        });
      });
      console.log(response);
      alert("Check your Emails!");
    } catch (error: any) {
      console.log(error);
      alert("Registration Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Image source={BGImage1} resizeMode="cover" className="h-96 w-full" />
      <View className="w-full h-full bg-white rounded-t-[45px] -mt-44 items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-center text-primaryText text-xl front-semibold ">
          {" "}
          Hello There!!!{"\n"}
          Lets Create your Account
        </Text>

        <View className="w-full flex items-center justify-center relative -my-4">
          <TouchableOpacity
            onPress={pickImage}
            className="w-20 h-20 p-1 rounded-full  bg-[#ecb158]"
          >
            {avatar ? (
              // Display the selected image
              <Image
                source={{ uri: avatar }}
                className="w-full h-full rounded-full "
                resizeMode="cover"
              />
            ) : (
              // Display an error message if there's
              // an error or no image selected
              <Image
                source={defAvatar}
                className="w-full h-full "
                resizeMode="contain"
              />
              
            )}
          </TouchableOpacity>
        </View>

        <View className="container ">
          <UserInputTextField
            placeholder={"Email"}
            handleChange={(data: React.SetStateAction<string>) =>
              setEmail(data)
            }
            isPass={false}
          />
          <UserInputTextField
            placeholder={"Name"}
            handleChange={(data: React.SetStateAction<string>) => setName(data)}
            isPass={false}
          />
          <UserInputTextField
            placeholder={"Password"}
            handleChange={(data: React.SetStateAction<string>) =>
              setPassword(data)
            }
            isPass={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View className="py-3 flex  ">
                <TouchableOpacity
                  onPress={signUp}
                  className="bg-orange-500 py-4 m-4 rounded"
                >
                  <Text className="text-white text-xl font-semibold text-center">
                    Create Account
                  </Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-center text-center text-primaryText text-xl front-semibold my-6 ">
                  <Text className="text-xl">Have an account !!!{"  "}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text className="text-xl underline text-orange-500 font-bold">
                      LogIn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
