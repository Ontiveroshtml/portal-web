import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CheckoutAMedida } from './pages/CheckoutAMedida.tsx'
import { I18nProvider } from './i18n/provider.tsx'

// Sin router: el portal es una sola landing. /checkout-a-medida es la única
// otra página real (recibe los links de oferta a medida armados por un
// admin), así que alcanza con mirar el pathname acá.
const page = window.location.pathname.startsWith('/checkout-a-medida') ? <CheckoutAMedida /> : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      {page}
    </I18nProvider>
  </StrictMode>,
)
