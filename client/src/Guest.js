import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Header from './components/CommonComponents/Header';
import Categories from './components/CommonComponents/Categories';
import CategoriesResult from './components/CommonComponents/CategoriesResult';
import BookSearch from './components/BookSearchPage/BookSearch';
import LoginModal from './components/Modals/LoginModal';
import BookPdp from './components/BookPDP/BookPdp';
import GuestRegistration from './components/RegisterPage/GuestRegistration';
//import Test from './Test';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bookCategories: "Top Rated"
    }
  }

  changeBookCategoriesState = (category) => {
    this.setState({
      bookCategories: category
    })
  }

  render() {
    const {authStatus,updateAuthState}=this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <Header changeBookCategory={this.changeBookCategoriesState} authStatus={authStatus} updateAuthState={updateAuthState}/>
          <div className="container body">
            <div className="row">
              <Categories changeBookCategory={this.changeBookCategoriesState} />
              <Switch>
              <Route exact path="/" render = {()=>{return <CategoriesResult category={this.state.bookCategories}/>}} />
              <Route exact path="/bookstore/home" render = {()=>{return <CategoriesResult category={this.state.bookCategories}/>}} />
              <Route exact path="/bookstore/booksearch" component={BookSearch} />
              <Route exact path="/bookstore/bookpdp" component={BookPdp} />
              <Route exact path="/bookstore/register" component={GuestRegistration} />
              <Route exact path="/bookstore/*" render = {()=>{return <CategoriesResult category={this.state.bookCategories}/>}} />
              </Switch>
            </div>
          </div>
          <LoginModal updateState={updateAuthState}/>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
