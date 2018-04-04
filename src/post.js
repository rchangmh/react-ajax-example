const data = new FormData() // FormData constructor
data.append('foo', 'bar')

const promise = fetch('https://endpoint.api/post', {
  method: 'POST',
  body: data,
})
  .then(response => {
    if (response.ok) {
      return response
    } else {
      throw new Error('error message')
    }
  })
  .then(response => response.json())
  .then(response => console.log(response) || response) // log to console and return
  .catch(console.error)