import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import logo from "assets/logo.png";
import { useLoginUserMutation } from "api/Users/loginUser";
import { useLoginAutoServiceMutation } from "api/AutoService/loginAutoService";
import TextInputComponent from "@components/TextInputComponent";
import styles from "./ProfileStyle";
import { NavigationType } from "../../../Navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { setAuthType } from "redux/authTypeSlice";
import ButtonComponent from "@components/ButtonComponent";

const Profile = ({ navigation }: NavigationType) => {
  return null;
};

export default Profile;
