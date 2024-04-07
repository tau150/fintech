import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const Signup = () => {
  const [countryCode, setCountryCode] = useState('+49')
  const [phoneNumber, setPhoneNumber] = useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  const onSignup = async () => {

  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there</Text>
        <View style={styles.inputContainer}>
          <TextInput style={defaultStyles.phoneInput} placeholder="Country code" keyboardType='numeric' placeholderTextColor={Colors.gray} value={countryCode} />
          <TextInput style={[defaultStyles.phoneInput, {flex: 1}]} placeholder='Mobile number' keyboardType='numeric' placeholderTextColor={Colors.gray} value={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <Link href={'/login'} asChild replace>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>
        <View style={{flex: 1}} />
        <TouchableOpacity style={[defaultStyles.pillButton,
          phoneNumber !== '' ? styles.enabled : styles.disabled,
          {marginBottom: 20}]}
          onPress={onSignup}
          >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
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

export default Signup;