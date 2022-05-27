import { AxiosResponse } from 'axios'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

interface CartProviderProps {
  children: ReactNode
}

interface Product {
  productId: number
  name: string
  category: string
  imgUrl: string
  price: number
  userId: number
  id?: number
  quantity: number
}

interface ProductCart {
  productId: number
  name: string
  category: string
  imgUrl: string
  price: number
  userId: number | undefined
  quantity: number
  id?: number
}

interface CartContextData {
  cart: Product[]
  catalog: Product[]
  addCart: (data: Product, acessToken: string) => Promise<void>
  loadCatalog: () => Promise<void>
  search: string
  handleSearch: any
  filtered: Product[]
  loadFiltered: () => Promise<void>
  loadCart: any
  removeCart: (product: Product, acessToken: string) => Promise<void>
  getTotal: () => void
  total: number
  changeQuantPlus: any
  changeQuantMinus: any
}

interface User {
  email: string
  id: number
  name: string
}

const CartContext = createContext<CartContextData>({} as CartContextData)

const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('Use Cart must be used within an CartProvider')
  }

  return context
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([])
  const [catalog, setCatalog] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)

  const loadCatalog = useCallback(async () => {
    try {
      const response = await api.get('/catalog')

      setCatalog(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const { user } = useAuth()

  const addCart = useCallback(async (data: Product, accessToken: string) => {
    api
      .post('/cart', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(_ =>
        setTotal(cart.map(e => e.price).reduce((acc, cur) => acc + cur, 0))
      )
      .then(() => loadCart(user, accessToken))
  }, [])

  const loadCart = useCallback(async (user: User, accessToken: string) => {
    const response = await api.get(`/cart?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (response.data.length >= 0) {
      setCart(response.data)
    }
  }, [])

  const removeCart = useCallback(
    async (product: Product, accessToken: string) => {
      api
        .delete(`/cart/${product.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res: AxiosResponse<Product>) => console.log(res.data))
        .then(_ =>
          setTotal(cart.map(e => e.price).reduce((acc, cur) => acc + cur, 0))
        )
        .then(_ => loadCart(user, accessToken))
    },
    []
  )

  const handleSearch = (text: string) => {
    setSearch(text)
    setFiltered(
      catalog.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const loadFiltered = useCallback(async () => {
    try {
      const response = await api.get('/catalog')

      setFiltered(response.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const getTotal = () => {
    if (cart.length !== 0) {
      const total = cart
        .map(e => e.price * e.quantity)
        .reduce((acc, cur) => acc + cur)
      setTotal(total)
    }
  }

  const changeQuantPlus = useCallback(
    async (data: ProductCart, accessToken: string) => {
      const newData = {
        userId: data.userId,
        quantity: data.quantity + 1
      }
      api
        .patch(`/cart/${data.id}`, newData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(res => console.log(res.data))
        .then(() => loadCart(user, accessToken))
        .catch(err => console.log(err))
    },
    []
  )

  const changeQuantMinus = useCallback(
    async (data: ProductCart, accessToken: string) => {
      const newData = {
        userId: data.userId,
        quantity: data.quantity - 1
      }
      api
        .patch(`/cart/${data.id}`, newData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(() => loadCart(user, accessToken))
        .catch(err => console.log(err))
    },
    []
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        loadCatalog,
        catalog,
        search,
        handleSearch,
        loadFiltered,
        filtered,
        removeCart,
        loadCart,
        getTotal,
        total,
        changeQuantPlus,
        changeQuantMinus
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { useCart, CartProvider }
