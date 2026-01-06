<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCaregiversStore, useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const caregiversStore = useCaregiversStore()
const userStore = useUserStore()

const currentStep = ref(0)

const petForm = ref({
  name: '',
  type: '',
  breed: '',
  age: '',
  weight: '',
  vaccinated: true,
  sterilized: false,
  notes: ''
})

const bookingForm = ref({
  serviceType: '',
  caregiverId: null as number | null,
  startDate: '',
  endDate: '',
  address: '',
  contactName: '',
  contactPhone: ''
})

const petTypes = ['狗狗', '猫咪', '兔子', '仓鼠', '鸟类', '其他']
const serviceTypes = [
  { value: 'boarding', label: '家庭寄养', price: 150, icon: 'House' },
  { value: 'home-visit', label: '上门喂养', price: 60, icon: 'HomeFilled' },
  { value: 'dog-walking', label: '遛狗服务', price: 50, icon: 'Sunny' }
]

const selectedService = computed(() => serviceTypes.find(s => s.value === bookingForm.value.serviceType))
const selectedCaregiver = computed(() => caregiversStore.caregivers.find(c => c.id === bookingForm.value.caregiverId))
const availableCaregivers = computed(() => caregiversStore.getAvailable)

const days = computed(() => {
  if (!bookingForm.value.startDate || !bookingForm.value.endDate) return 0
  const start = new Date(bookingForm.value.startDate)
  const end = new Date(bookingForm.value.endDate)
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1)
})

const totalPrice = computed(() => {
  if (!selectedCaregiver.value) return 0
  return selectedCaregiver.value.price * days.value
})

const nextStep = () => {
  if (currentStep.value === 0 && !petForm.value.name) {
    ElMessage.warning('请填写宠物信息')
    return
  }
  if (currentStep.value === 1 && (!bookingForm.value.serviceType || !bookingForm.value.caregiverId)) {
    ElMessage.warning('请选择服务和代养师')
    return
  }
  if (currentStep.value === 2 && (!bookingForm.value.startDate || !bookingForm.value.endDate)) {
    ElMessage.warning('请选择服务时间')
    return
  }
  currentStep.value++
}

const prevStep = () => { currentStep.value-- }

const submitOrder = () => {
  ElMessage.success('预约提交成功！我们会尽快与您联系确认')
  currentStep.value = 4
}

const disabledDate = (time: Date) => time.getTime() < Date.now() - 8.64e7
</script>

<template>
  <div class="booking-page">
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <h1>预约服务</h1>
        <p>简单几步，为您的爱宠预约贴心服务</p>
      </div>
    </section>

    <!-- Booking Form -->
    <section class="booking-section">
      <div class="container">
        <el-steps :active="currentStep" finish-status="success" class="booking-steps">
          <el-step title="宠物信息" />
          <el-step title="选择服务" />
          <el-step title="预约时间" />
          <el-step title="确认订单" />
        </el-steps>

        <div class="form-container">
          <!-- Step 1: Pet Info -->
          <div v-show="currentStep === 0" class="step-content">
            <h2>填写宠物信息</h2>
            <el-form :model="petForm" label-width="100px" class="pet-form">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="宠物名字" required>
                    <el-input v-model="petForm.name" placeholder="请输入宠物名字" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="宠物类型" required>
                    <el-select v-model="petForm.type" placeholder="请选择">
                      <el-option v-for="t in petTypes" :key="t" :label="t" :value="t" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="品种">
                    <el-input v-model="petForm.breed" placeholder="如：金毛、英短等" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年龄">
                    <el-input v-model="petForm.age" placeholder="如：2岁" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="体重">
                    <el-input v-model="petForm.weight" placeholder="如：5kg" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="健康状态">
                    <el-checkbox v-model="petForm.vaccinated">已接种疫苗</el-checkbox>
                    <el-checkbox v-model="petForm.sterilized">已绝育</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="特殊说明">
                    <el-input v-model="petForm.notes" type="textarea" :rows="3" placeholder="如有特殊饮食习惯、用药需求等请在此说明" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!-- Step 2: Select Service -->
          <div v-show="currentStep === 1" class="step-content">
            <h2>选择服务类型</h2>
            <div class="service-options">
              <div v-for="s in serviceTypes" :key="s.value" :class="['service-option', { selected: bookingForm.serviceType === s.value }]" @click="bookingForm.serviceType = s.value">
                <el-icon :size="32"><component :is="s.icon" /></el-icon>
                <h4>{{ s.label }}</h4>
                <p class="price">{{ s.price }}元起</p>
              </div>
            </div>

            <h2 style="margin-top: 40px;">选择代养师</h2>
            <div class="caregiver-options">
              <div v-for="c in availableCaregivers" :key="c.id" :class="['caregiver-option', { selected: bookingForm.caregiverId === c.id }]" @click="bookingForm.caregiverId = c.id">
                <div class="cg-avatar">
                  <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="30" cy="24" r="12" fill="#D97706"/><path d="M15 54 Q15 38 30 38 Q45 38 45 54" fill="#D97706"/></svg>
                </div>
                <div class="cg-info">
                  <h4>{{ c.name }}</h4>
                  <div class="meta">
                    <span><el-icon><StarFilled /></el-icon>{{ c.rating }}</span>
                    <span>{{ c.location }}</span>
                  </div>
                </div>
                <div class="cg-price">{{ c.price }}元/天</div>
              </div>
            </div>
          </div>

          <!-- Step 3: Schedule -->
          <div v-show="currentStep === 2" class="step-content">
            <h2>选择服务时间</h2>
            <el-form label-width="100px" class="schedule-form">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="开始日期" required>
                    <el-date-picker v-model="bookingForm.startDate" type="date" placeholder="选择开始日期" :disabled-date="disabledDate" style="width: 100%;" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束日期" required>
                    <el-date-picker v-model="bookingForm.endDate" type="date" placeholder="选择结束日期" :disabled-date="disabledDate" style="width: 100%;" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="服务地址">
                    <el-input v-model="bookingForm.address" placeholder="上门服务需填写地址" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系人" required>
                    <el-input v-model="bookingForm.contactName" placeholder="请输入联系人姓名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" required>
                    <el-input v-model="bookingForm.contactPhone" placeholder="请输入联系电话" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <!-- Step 4: Confirm -->
          <div v-show="currentStep === 3" class="step-content">
            <h2>确认订单信息</h2>
            <div class="order-summary">
              <div class="summary-section">
                <h4>宠物信息</h4>
                <div class="summary-row"><span>宠物名字</span><span>{{ petForm.name }}</span></div>
                <div class="summary-row"><span>宠物类型</span><span>{{ petForm.type }} {{ petForm.breed }}</span></div>
                <div class="summary-row"><span>年龄/体重</span><span>{{ petForm.age }} / {{ petForm.weight }}</span></div>
              </div>
              <div class="summary-section">
                <h4>服务信息</h4>
                <div class="summary-row"><span>服务类型</span><span>{{ selectedService?.label }}</span></div>
                <div class="summary-row"><span>代养师</span><span>{{ selectedCaregiver?.name }}</span></div>
                <div class="summary-row"><span>服务时间</span><span>{{ bookingForm.startDate }} 至 {{ bookingForm.endDate }} ({{ days }}天)</span></div>
              </div>
              <div class="summary-section">
                <h4>联系信息</h4>
                <div class="summary-row"><span>联系人</span><span>{{ bookingForm.contactName }}</span></div>
                <div class="summary-row"><span>联系电话</span><span>{{ bookingForm.contactPhone }}</span></div>
                <div class="summary-row" v-if="bookingForm.address"><span>服务地址</span><span>{{ bookingForm.address }}</span></div>
              </div>
              <div class="price-summary">
                <div class="price-row">
                  <span>服务单价</span>
                  <span>{{ selectedCaregiver?.price }}元/天</span>
                </div>
                <div class="price-row">
                  <span>服务天数</span>
                  <span>{{ days }}天</span>
                </div>
                <div class="price-row total">
                  <span>订单总价</span>
                  <span class="total-amount">{{ totalPrice }}元</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 5: Success -->
          <div v-show="currentStep === 4" class="step-content success-content">
            <div class="success-icon">
              <el-icon :size="80" color="#059669"><SuccessFilled /></el-icon>
            </div>
            <h2>预约提交成功</h2>
            <p>我们的客服会在24小时内与您联系确认订单详情</p>
            <p class="order-no">订单编号：ORD{{ Date.now() }}</p>
            <div class="success-actions">
              <el-button type="primary" @click="$router.push('/profile')">查看我的订单</el-button>
              <el-button @click="$router.push('/')">返回首页</el-button>
            </div>
          </div>

          <!-- Navigation -->
          <div v-if="currentStep < 4" class="form-actions">
            <el-button v-if="currentStep > 0" @click="prevStep">上一步</el-button>
            <el-button v-if="currentStep < 3" type="primary" @click="nextStep">下一步</el-button>
            <el-button v-if="currentStep === 3" type="primary" @click="submitOrder">提交预约</el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-banner {
  background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
  padding: 80px 20px 60px;
  text-align: center;
  color: white;
}

.page-banner h1 {
  font-size: 40px;
  margin-bottom: 16px;
}

.booking-section {
  padding: 60px 0 80px;
}

.booking-steps {
  max-width: 800px;
  margin: 0 auto 48px;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--shadow-md);
}

.step-content h2 {
  font-size: 24px;
  margin-bottom: 32px;
  text-align: center;
}

.pet-form, .schedule-form {
  max-width: 700px;
  margin: 0 auto;
}

.service-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-option {
  padding: 32px 24px;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.service-option:hover {
  border-color: var(--color-primary);
}

.service-option.selected {
  border-color: var(--color-primary);
  background: var(--color-warm-beige);
}

.service-option .el-icon {
  color: var(--color-primary);
  margin-bottom: 12px;
}

.service-option h4 {
  font-size: 18px;
  margin-bottom: 8px;
}

.service-option .price {
  color: var(--color-primary);
  font-weight: 600;
}

.caregiver-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.caregiver-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s;
}

.caregiver-option:hover {
  border-color: var(--color-primary);
}

.caregiver-option.selected {
  border-color: var(--color-primary);
  background: var(--color-warm-beige);
}

.cg-avatar {
  width: 60px;
  height: 60px;
}

.cg-info h4 {
  font-size: 16px;
  margin-bottom: 4px;
}

.cg-info .meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-light);
}

.cg-info .meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cg-price {
  margin-left: auto;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}

.order-summary {
  max-width: 600px;
  margin: 0 auto;
}

.summary-section {
  margin-bottom: 32px;
}

.summary-section h4 {
  font-size: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: 16px;
  color: var(--color-primary);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 15px;
}

.summary-row span:first-child {
  color: var(--color-text-light);
}

.price-summary {
  background: var(--color-warm-beige);
  padding: 24px;
  border-radius: var(--radius-md);
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.price-row.total {
  border-top: 1px solid var(--color-gray-200);
  margin-top: 12px;
  padding-top: 16px;
  font-size: 18px;
  font-weight: 600;
}

.total-amount {
  color: var(--color-primary);
  font-size: 24px;
}

.success-content {
  text-align: center;
  padding: 40px 0;
}

.success-icon {
  margin-bottom: 24px;
}

.success-content h2 {
  color: #059669;
}

.success-content p {
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.order-no {
  font-size: 14px;
  color: var(--color-text-light);
  margin-top: 16px;
}

.success-actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-gray-200);
}

@media (max-width: 768px) {
  .form-container {
    padding: 24px;
  }
  .service-options {
    grid-template-columns: 1fr;
  }
  .caregiver-options {
    grid-template-columns: 1fr;
  }
}
</style>
