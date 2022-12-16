import React, { ReactElement } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Text, Icon, Layout } from '@ui-kitten/components';
import {
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  TwitterIcon,
} from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { loginUser } from '~/store/slices/application';
import { connect } from 'react-redux';

// @ts-ignore
const SignIn = (props): React.ReactElement => {
  const { navigation } = props;
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSignInButtonPress = (): void => {
    props.loginUser({ email, password });
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <KeyboardAvoidingView>
        <View style={styles.headerContainer}>
          <Text
            category='h1'>
            Hello
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
          >
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            placeholder='Email'
            accessoryLeft={PersonIcon}
            value={email}
            status="danger"
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            placeholder='Password'
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size='giant'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text
            style={styles.socialAuthHintText}
            >
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance='ghost'
              size='giant'
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance='ghost'
              size='giant'
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default connect(null, { loginUser })(SignIn);
