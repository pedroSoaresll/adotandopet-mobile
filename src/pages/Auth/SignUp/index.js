import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

import NativeButton from '~/components/NativeButton';
import Input from '~/components/Input';

import {
  Container,
  ContentContainer,
  Title,
  FormContainer,
  FormLabel,
  FormNotificationContainer,
  FormNotificationText,
  FormNotificationSwitch,
  Error,
  SigninLinkContainer,
  SigninLinkContent,
  SigninLinkText,
} from './styles';

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    signupRequest: PropTypes.func.isRequired,
  };

  state = {
    name: 'Claudio Orlandi',
    phone: '123123',
    gender: 'male',
    email: 'a@b.com',
    password: '123123',
    passwordConfirmation: '123123',
    error: '',
    notifications: true,
  };

  handleNavigate = (route) => {
    const { navigation } = this.props;
    navigation.navigate(route);
  };

  handleSwitch = value => this.setState({ notifications: value });

  handleInputChange = (id, value) => this.setState({ [id]: value, error: false });

  handleSignUp = () => {
    const {
      loading,
      name,
      phone,
      gender,
      email,
      password,
      passwordConfirmation,
      notifications,
    } = this.state;
    const { signupRequest } = this.props;

    if (loading) return;

    if (!name || !phone || !email || !password || !this.passwordConfirmationInput) {
      this.setState({ error: 'Por favor, preencha todos os campos para continuar!' });
    }

    if (password !== passwordConfirmation) {
      this.setState({ error: 'A senha e a confirmação não correspondem!' });
    }

    signupRequest({
      name,
      phone,
      gender,
      email,
      password,
      password_confirmation: passwordConfirmation,
      notifications,
    });
  };

  setPhoneInputRef = ref => (this.phoneInput = ref);

  setEmailInputRef = ref => (this.emailInput = ref);

  setPasswordInputRef = ref => (this.passwordInput = ref);

  setPasswordConfirmationInputRef = ref => (this.passwordConfirmationInput = ref);

  render() {
    const {
      notifications, name, phone, gender, email, password, passwordConfirmation, error,
    } = this.state;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ContentContainer>
          <Title>Cadastro</Title>
          <FormContainer>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              id="name"
              placeholder="Insira aqui seu Nome Completo"
              autoCapitalize="words"
              value={name}
              onChangeText={this.handleInputChange}
              returnKeyType="next"
              onSubmitEditing={() => this.phoneInput.focus()}
            />
            <FormLabel>Telefone/Celular</FormLabel>
            <Input
              id="phone"
              placeholder="Insira aqui seu Telefone/Celular"
              autoCapitalize="none"
              value={phone}
              onChangeText={this.handleInputChange}
              returnKeyType="next"
              setRef={this.setPhoneInputRef}
              onSubmitEditing={() => this.emailInput.focus()}
              keyboardType="numeric"
            />
            <FormLabel>Gênero</FormLabel>
            <RadioForm
              radio_props={[
                { label: 'Masculino', value: 'male' },
                { label: 'Feminino', value: 'female' },
              ]}
              formHorizontal
              animation
              initial={gender}
              onPress={gender => this.setState({ gender })}
            />
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              placeholder="Insira aqui seu Email"
              autoCapitalize="none"
              value={email}
              onChangeText={this.handleInputChange}
              returnKeyType="next"
              setRef={this.setEmailInputRef}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
            />
            <FormLabel>Senha</FormLabel>
            <Input
              id="password"
              placeholder="Insira aqui sua Senha"
              autoCapitalize="none"
              value={password}
              onChangeText={this.handleInputChange}
              returnKeyType="next"
              setRef={this.setPasswordInputRef}
              onSubmitEditing={() => this.passwordConfirmationInput.focus()}
              secureTextEntry
            />
            <FormLabel>Confirmação de Senha</FormLabel>
            <Input
              id="passwordConfirmation"
              placeholder="Insira novamente sua Senha"
              autoCapitalize="none"
              value={passwordConfirmation}
              onChangeText={this.handleInputChange}
              returnKeyType="send"
              setRef={this.setPasswordConfirmationInputRef}
              onSubmitEditing={this.handleSignUp}
              secureTextEntry
            />
            <FormNotificationContainer>
              <FormNotificationText>
                Gostaria de receber notificações para ficar por dentro das novidades?
              </FormNotificationText>
              <FormNotificationSwitch value={notifications} onValueChange={this.handleSwitch} />
            </FormNotificationContainer>
            {!!error && <Error>{error}</Error>}
          </FormContainer>
          <NativeButton onPress={this.handleSignUp} value="Cadastrar" />
          <SigninLinkContainer onPress={() => this.handleNavigate('SignIn')}>
            <SigninLinkContent>
              <SigninLinkText>Já tem conta?</SigninLinkText>
              <SigninLinkText featured>Entrar!</SigninLinkText>
            </SigninLinkContent>
          </SigninLinkContainer>
        </ContentContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
