import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import React, { useState, useEffect, Fragment } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'
import { defaultStyles } from '@/constants/Styles'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors'

const CELL_COUNT = 6;

const Phone = () => {
  const [code, setCode] =  useState('')
  const {phone, signin} = useLocalSearchParams<{phone: string, signin?: string}>()
  const {signIn} = useSignIn()
  const {signUp, setActive} = useSignUp()

  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode
  });


  useEffect(() => {
    if(code.length === 6){
      if(signin === 'true') {
        verifySignin()
      }else{
        verifyCode()
      }
    }
  }, [code])

  const verifyCode = async () => {
    try{
      await signUp?.attemptPhoneNumberVerification({
        code
      })
      await setActive?.({session: signUp?.createdSessionId})
    }catch(e){
      if(isClerkAPIResponseError(e)){
        Alert.alert('Error', e.errors[0].message)
      }
    }
  }

  const verifySignin = async () => {
    try{
      await signIn?.attemptFirstFactor({
        strategy: 'phone_code',
        code
      })
      await setActive?.({session: signIn?.createdSessionId})
    }catch(e){
      if(isClerkAPIResponseError(e)){
        Alert.alert('Error', e.errors[0].message)
      }
    }
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>Code sent to {phone} unless you already have an account</Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <View onLayout={getCellOnLayoutHandler(index)} key={index} style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator}/> : null}
          </Fragment>
        )}
      />
      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}


const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
});

export default Phone