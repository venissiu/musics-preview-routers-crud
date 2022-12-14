import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      check: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.getUsersFromApi();
  }

  componentWillUnmount() {
    this.getUsersFromApi();
  }

  getUsersFromApi = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, description, image } = user;
      this.setState({ loading: false, name, email, description, image });
      this.check();
    });
  }

  userFormChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.check();
    });
  }

  check = () => {
    const { name, email, description, image } = this.state;
    if (name !== ''
    && email !== ''
    && description !== ''
    && image !== '') {
      this.setState({ check: false });
    } else {
      this.setState({ check: true });
    }
  }

  updateUser = () => {
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ loading: false });
    });
    this.setState({ redirect: true });
  }

  render() {
    const { loading, description, email, image, name, check, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                value={ name }
                name="name"
                placeholder="Name"
                onChange={ this.userFormChange }
              />
              <input
                type="email"
                data-testid="edit-input-email"
                value={ email }
                name="email"
                placeholder="Email"
                onChange={ this.userFormChange }
              />
              <textarea
                data-testid="edit-input-description"
                value={ description }
                name="description"
                placeholder="About"
                onChange={ this.userFormChange }
              />
              <input
                data-testid="edit-input-image"
                value={ image }
                placeholder="User Image"
                name="image"
                onChange={ this.userFormChange }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ check }
                onClick={ this.updateUser }
              >
                salvar
              </button>
            </form>
            <div>
              { redirect && <Redirect to="/profile" /> }
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
