import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: string
  weight: string
  avatar: string
}

export interface Caregiver {
  id: number
  name: string
  avatar: string
  experience: string
  rating: number
  reviews: number
  specialties: string[]
  price: number
  location: string
  available: boolean
  description: string
}

export interface Order {
  id: string
  petName: string
  caregiverName: string
  serviceType: string
  startDate: string
  endDate: string
  status: string
  totalPrice: number
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref({
    id: 1,
    name: '张小花',
    phone: '138****8888',
    email: 'zhangxiaohua@example.com',
    avatar: ''
  })

  const pets = ref<Pet[]>([
    { id: 1, name: '豆豆', type: '狗', breed: '金毛寻回犬', age: '3岁', weight: '28kg', avatar: '' },
    { id: 2, name: '咪咪', type: '猫', breed: '英国短毛猫', age: '2岁', weight: '5kg', avatar: '' }
  ])

  const orders = ref<Order[]>([
    { id: 'ORD001', petName: '豆豆', caregiverName: '李阿姨', serviceType: '家庭寄养', startDate: '2025-01-10', endDate: '2025-01-15', status: '已完成', totalPrice: 750 },
    { id: 'ORD002', petName: '咪咪', caregiverName: '王师傅', serviceType: '上门喂养', startDate: '2025-01-20', endDate: '2025-01-22', status: '进行中', totalPrice: 180 }
  ])

  const favorites = ref<number[]>([1, 3])

  const login = () => { isLoggedIn.value = true }
  const logout = () => { isLoggedIn.value = false }
  const addPet = (pet: Pet) => { pets.value.push(pet) }
  const toggleFavorite = (id: number) => {
    const idx = favorites.value.indexOf(id)
    if (idx > -1) favorites.value.splice(idx, 1)
    else favorites.value.push(id)
  }

  return { isLoggedIn, userInfo, pets, orders, favorites, login, logout, addPet, toggleFavorite }
})

export const useCaregiversStore = defineStore('caregivers', () => {
  const caregivers = ref<Caregiver[]>([
    { id: 1, name: '李阿姨', avatar: '', experience: '8年', rating: 4.9, reviews: 328, specialties: ['狗狗', '大型犬'], price: 150, location: '朝阳区', available: true, description: '资深宠物护理师，擅长大型犬照顾，家中有独立院子' },
    { id: 2, name: '王师傅', avatar: '', experience: '5年', rating: 4.8, reviews: 215, specialties: ['猫咪', '小型犬'], price: 120, location: '海淀区', available: true, description: '专业猫咪护理，家中环境安静舒适' },
    { id: 3, name: '张姐', avatar: '', experience: '6年', rating: 4.9, reviews: 186, specialties: ['狗狗', '猫咪', '异宠'], price: 130, location: '西城区', available: true, description: '全能型代养师，接受各类宠物' },
    { id: 4, name: '刘大叔', avatar: '', experience: '10年', rating: 5.0, reviews: 412, specialties: ['大型犬', '中型犬'], price: 180, location: '东城区', available: false, description: '退休兽医，专业医疗护理' },
    { id: 5, name: '陈姐', avatar: '', experience: '4年', rating: 4.7, reviews: 156, specialties: ['猫咪', '兔子'], price: 100, location: '丰台区', available: true, description: '温柔细心，猫咪最爱' },
    { id: 6, name: '赵师傅', avatar: '', experience: '7年', rating: 4.8, reviews: 289, specialties: ['狗狗', '遛狗服务'], price: 140, location: '朝阳区', available: true, description: '专业遛狗师，每天保证2小时户外活动' }
  ])

  const getAvailable = computed(() => caregivers.value.filter(c => c.available))

  return { caregivers, getAvailable }
})
