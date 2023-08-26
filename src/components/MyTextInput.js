import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, useColorScheme} from 'react-native';
import {TextInput} from 'react-native-paper';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyTextInput = props => {
  const {
    name,
    value,
    error,
    changeTextHandler,
    onBlur,
    label,
    placeholder,
    iconName,
    iconSize,
    passwordField,
    secureTextEntry,
    keyboardType,
    disabled,
  } = props;
  const isDark = useColorScheme() == 'dark';
  const [hidePassword, sethidePassword] = useState(secureTextEntry);

  const togglePasswordHandler = () => {
    sethidePassword(!hidePassword);
  };

  return (
    <View style={styles.formGroup}>
      <TextInput
        mode="flat"
        disabled={disabled}
        keyboardType={keyboardType || 'default'}
        label={label}
        name={name}
        error={error}
        placeholderTextColor={isDark ? color.white500 : color.black400}
        placeholder={placeholder}
        style={[
          styles.formControl,
          {backgroundColor: isDark ? color.black200 : color.white500},
          {color: 'red'},
        ]}
        onChangeText={changeTextHandler}
        onBlur={onBlur}
        value={value}
        activeUnderlineColor={isDark ? color.primary : color.primary}
        underlineColor={isDark ? color.black200 : color.white500}
        textColor={isDark ? color.white : color.black200}
        secureTextEntry={hidePassword}
        left={
          <TextInput.Icon
            icon={() => (
              <FontAwesome
                style={{marginRight: -20, marginTop: -1}}
                name={iconName}
                color={isDark ? color.white : color.black400}
                size={iconSize}
              />
            )}
          />
        }
        right={
          passwordField ? (
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  style={styles.togglePwdBtn}
                  onPress={togglePasswordHandler}>
                  <Ionicons
                    name={hidePassword ? 'ios-eye-off-sharp' : 'eye'}
                    color={isDark ? color.white : color.black400}
                    size={20}
                    style={styles.formIcon}
                  />
                </TouchableOpacity>
              )}
            />
          ) : null
        }
        theme={{
          colors: {
            primary: isDark ? color.black500 : color.black500,
            background: isDark ? color.black200 : color.white,
            onSurfaceVariant: isDark ? color.white400 : color.black500,
          },
          fonts: {
            bodyLarge: {fontFamily: font.regular},
          },
        }}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  formGroup: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  formControl: {
    fontSize: 13,
    marginLeft: -10,
  },
  formError: {
    color: color.danger,
    fontSize: 13,
    marginTop: 2,
  },
  formIcon: {
    marginTop: -8,
    top: 17,
  },
  togglePwdBtn: {
    position: 'absolute',
    marginLeft: 15,
    right: '15%',
    top: 0,
  },
});
