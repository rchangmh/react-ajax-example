import React from 'react'
import { render } from 'react-dom'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
}

class App extends React.Component {
  state = {
    value: 'mounting',
    promise_response: null,
    async_response: null,
  }

  componentDidMount() {
    this.promiseFetch()
    this.asyncFetch()
  }

  promiseFetch = () => {
    fetch('https://httpbin.org/uuid') // must be https!
      .then(response => response.json()) // converts to readable json
      .then(responseJsonObj => {
        this.setState({ promise_response: responseJsonObj }) // store response in state
      })
      .catch(error => {
        console.error(error.message) // catch errors
      })
  }

  asyncFetch = async () => {
    try {
      let response = await fetch('https://httpbin.org/uuid')
      response = await response.json()
      await this.setState({ async_response: response })
    } catch (error) {
      this.setState({ value: error.message })
    }
  }

  render() {
    return (
      <div style={styles}>
        <h3>
          {`promise: ${
            this.state.promise_response
              ? this.state.promise_response.uuid
              : this.state.value
          }`}
          <br />
          <br />
        </h3>
        <h3>{`async: ${
          this.state.async_response
            ? this.state.async_response.uuid
            : this.state.value
        }`}</h3>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
