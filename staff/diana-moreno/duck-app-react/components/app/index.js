const { Component } = React
const { id, token } = sessionStorage
const { query } = location

class App extends Component {

  state = {
    view: 'login',
    error: undefined,
    ducks: undefined,
    item: undefined,
    name: '',
    query,
    favorites: []
  }

  UNSAFE_componentWillMount() {

    if (id && token)
      try {
        retrieveUser(id, token, ({ name }) => { // falta errores
          this.setState({ name: name, view: 'search' })
        })
      } catch (error) {
        this.setState({ error: error.message })
      }

    const { state: { query } } = this

    query ? this.handleSearch(query) : this.initialRandom()
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register' })
  }

  handleGoToLogin = () => {
    this.setState({ view: 'login' })
  }

  handleGoToList = () => {
    this.setState({ view: 'search' })
  }

  handleGoToFavs = () => {
    this.setState({ view: 'favorites' })
  }

  handleBackFromRegister = () => {
    this.setState({ view: 'login', error: undefined })
  }

  handleRegister = (name, surname, email, password) => {
    try {
      registerUser(name, surname, email, password, error => {
        if (error) this.setState({ error: error.message })
        else this.setState({ view: 'register-success' })
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleLogin = (email, password) => {
    try {
      authenticateUser(email, password, (error, result) => {
        if (error) {
          this.setState({ error: error.message })
        } else {
          sessionStorage.id = result.id
          sessionStorage.token = result.token
          this.setState({
            ...this.state,
            view: 'search'
          })
          this.initialRandom()

          this.handleRetrieveUser(result.id, result.token);
        }
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleRetrieveUser = (id, token) => {
    retrieveUser(id, token, ({ name }) => { //result.data.name
      this.setState({
        ...this.state,
        name: name,
      })
    })
  }

  retrieveAndPrintFavs = (ducks) => {
    const {id, token } = sessionStorage
    if(id && token) {
      retrieveFavDucks(id, token, (error, favs) => {
        favs.forEach(fav => {
          fav.icon = true
          ducks.forEach(duck => {
            if (duck.id === fav.id) {
              duck.icon = true
            }
          })
        })
        this.setState({
          ...this.state,
          favorites: favs
        })
      })
    }
  }

  initialRandom = () => {
    searchDucks('', (error, ducks) => {
      if (error) {
        this.setState({ error: error.message })
      } else {
        ducks = ducks.shuffle().splice(0, 8)
        this.setState({
          ...this.state,
          ducks: ducks,
          error: undefined
        })
      }

      this.retrieveAndPrintFavs(ducks)
    })
  }

  handleSearch = (query) => {
    searchDucks(query, (error, ducks) => {
      if (error) {
        this.setState({
          error: error.message,
          ducks: ''
        })
      } else {
        location.query = query;
        this.setState({
          ...this.state,
          ducks: ducks,
          view: 'search'
        })
      }
      this.retrieveAndPrintFavs(ducks)
    })
  }

  handleDetail = (item) => {
    const id = item.id //cambiar
    retrieveDuck(id, (error, duck) => { //falta try catch
      if (error) {
        this.setState({ error: error.message })
      } else {
        const ducks = [duck]
        this.retrieveAndPrintFavs(ducks);
        this.setState({
          ...this.state,
          item: duck,
          view: 'detail'
        })
      }

    })
  }

  paintHeartsFav(id) {
    const allDucks = [...this.state.ducks, ...this.state.favorites]

    allDucks.forEach(duck => {
      if (duck.id === id && !duck.icon) {
        duck.icon = true; //true es favorito
      } else if (duck.id === id && duck.icon) {
        duck.icon = false;
      }
      this.setState({
        ...this.state,
      })
    })
  }

  handleFavorite = (idItem) => {
    this.paintHeartsFav(idItem)
    toggleFavDuck(id, token, idItem, result => {
    })
  }


  render() {
    const { state: { view, error, item, ducks, name, favorites }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackFromRegister, handleLogin, handleSearch, handleDetail, handleGoToList, handleFavorite, handleGoToFavs } = this

    return < > { view === 'login' && <Login onLogin={handleLogin} onRegister={handleGoToRegister} error={error} /> }

    { view === 'register' && <Register onRegister={handleRegister} onBack={handleBackFromRegister} error={error} /> }

    { view === 'register-success' && <RegisterSuccess onBack={handleBackFromRegister} /> }

    {
      (view === 'search' || view === 'detail' || view === 'favorites') &&
      <Search searchDucks={handleSearch} username={name} onFavs={handleGoToFavs} />
    }

    { view === 'search' && <DucksList ducks={ducks} item={handleDetail} error={error} handleFavorite= {handleFavorite} /> }

    { view === 'favorites' && <DucksList ducks={favorites} item={handleDetail} error={error} handleFavorite= {handleFavorite} /> }

    { view === 'detail' && <Detail item={item} onBack={handleGoToList}/> } <
    />
  }
}
