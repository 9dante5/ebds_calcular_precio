import { createRoot } from 'react-dom/client'
import App from './router/App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>,
)
