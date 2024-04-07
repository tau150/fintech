import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';

enum SignInType {
  Phone, Email, Google, Apple
}
const Login = () => {
  const [countryCode, setCountryCode] = useState('+49')
  const [phoneNumber, setPhoneNumber] = useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  const onSignin = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      console.log('phone')
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>Enter the phone number associated with your account.</Text>
        <View style={styles.inputContainer}>
          <TextInput style={defaultStyles.phoneInput} placeholder="Country code" keyboardType='numeric' placeholderTextColor={Colors.gray} value={countryCode} />
          <TextInput style={[defaultStyles.phoneInput, {flex: 1}]} placeholder='Mobile number' keyboardType='numeric' placeholderTextColor={Colors.gray} value={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <TouchableOpacity style={[defaultStyles.pillButton,
          phoneNumber !== '' ? styles.enabled : styles.disabled,
          {marginBottom: 20}]}
          onPress={() => onSignin(SignInType.Phone)}
          >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center',  gap: 16}}>
          <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray}} />
          <Text style={{color: Colors.gray, fontSize: 20}}>or</Text>
          <View style={{flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray}} />
        </View>
        <TouchableOpacity
          style={[defaultStyles.pillButton, {backgroundColor: '#fff', flexDirection: 'row', gap: 16, marginTop: 20}]}
          onPress={() => onSignin(SignInType.Email)}
        >
          <Ionicons name="mail" size={24} color='#000' />
          <Text style={[defaultStyles.buttonText, { color: "#000"}]}>Continue with email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.pillButton, {backgroundColor: '#fff', flexDirection: 'row', gap: 16, marginTop: 20}]}
          onPress={() => onSignin(SignInType.Google)}
        >
          <Ionicons name="logo-google" size={24} color='#000' />
          <Text style={[defaultStyles.buttonText, { color: "#000"}]}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.pillButton, {backgroundColor: '#fff', flexDirection: 'row', gap: 16, marginTop: 20}]}
          onPress={() => onSignin(SignInType.Apple)}
        >
          <Ionicons name="logo-apple" size={24} color='#000' />
          <Text style={[defaultStyles.buttonText, { color: "#000"}]}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row'
  },
  enabled: {
    backgroundColor: Colors.primary
  },
  disabled: {
    backgroundColor: Colors.primaryMuted
  }
})

export default Login;