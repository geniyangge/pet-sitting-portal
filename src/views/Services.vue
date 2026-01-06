<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const services = [
  {
    id: 'boarding',
    title: '家庭寄养',
    icon: 'House',
    description: '将您的爱宠托付给经验丰富的代养师，在温馨的家庭环境中得到全天候的精心照料。',
    price: '150-300元/天',
    features: ['独立舒适空间', '定时喂食喂水', '每日清洁消毒', '24小时看护', '每日照片/视频汇报', '紧急医疗协助'],
    suitable: ['出差旅行', '长期外出', '节假日托管']
  },
  {
    id: 'home-visit',
    title: '上门喂养',
    icon: 'HomeFilled',
    description: '专业人员按时上门，为您的宠物提供喂食、换水、清洁等基础照料服务。',
    price: '60-100元/次',
    features: ['喂食换水', '猫砂/尿垫更换', '简单互动陪伴', '环境简单清洁', '异常情况通知', '服务拍照反馈'],
    suitable: ['短期外出', '加班忙碌', '宠物不适应外出']
  },
  {
    id: 'dog-walking',
    title: '遛狗服务',
    icon: 'Sunny',
    description: '专业遛狗师带您的狗狗外出活动，保证充足的运动量和社交机会。',
    price: '50-80元/次',
    features: ['1-2小时户外活动', 'GPS实时追踪', '安全牵引保障', '社交互动', '运动量保证', '活动照片分享'],
    suitable: ['工作繁忙', '行动不便', '狗狗精力旺盛']
  }
]

const priceTable = [
  { type: '小型犬/猫', boarding: '150元/天', homeVisit: '60元/次', dogWalking: '50元/次' },
  { type: '中型犬', boarding: '200元/天', homeVisit: '80元/次', dogWalking: '60元/次' },
  { type: '大型犬', boarding: '250元/天', homeVisit: '100元/次', dogWalking: '80元/次' },
  { type: '特殊宠物', boarding: '面议', homeVisit: '面议', dogWalking: '-' }
]

const advantages = [
  { icon: 'Medal', title: '专业认证', desc: '所有代养师经过严格培训和认证' },
  { icon: 'Shield', title: '安全保障', desc: '全程保险覆盖，意外有保障' },
  { icon: 'VideoCamera', title: '实时反馈', desc: '每日照片视频，随时了解动态' },
  { icon: 'Service', title: '贴心服务', desc: '7x24小时客服，随时解答疑问' }
]
</script>

<template>
  <div class="services-page">
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <h1>服务介绍</h1>
        <p>专业、贴心、多样化的宠物代养服务</p>
      </div>
    </section>

    <!-- Services Detail -->
    <section class="services-detail">
      <div class="container">
        <div v-for="(service, index) in services" :key="service.id" :class="['service-block', { reverse: index % 2 === 1 }]">
          <div class="service-content">
            <div class="service-icon">
              <el-icon :size="48"><component :is="service.icon" /></el-icon>
            </div>
            <h2>{{ service.title }}</h2>
            <p class="service-desc">{{ service.description }}</p>
            <div class="service-price">{{ service.price }}</div>
            <div class="service-features">
              <h4>服务内容</h4>
              <ul>
                <li v-for="f in service.features" :key="f"><el-icon><Check /></el-icon>{{ f }}</li>
              </ul>
            </div>
            <div class="service-suitable">
              <h4>适合场景</h4>
              <div class="tags">
                <el-tag v-for="s in service.suitable" :key="s" type="warning">{{ s }}</el-tag>
              </div>
            </div>
            <button class="btn-primary" @click="router.push('/booking')">立即预约</button>
          </div>
          <div class="service-visual">
            <svg viewBox="0 0 300 250" class="service-illustration">
              <rect x="20" y="40" width="260" height="180" rx="20" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/>
              <circle v-if="service.id === 'boarding'" cx="150" cy="130" r="50" fill="#D97706"/>
              <circle v-if="service.id === 'boarding'" cx="135" cy="120" r="8" fill="#1F2937"/>
              <circle v-if="service.id === 'boarding'" cx="165" cy="120" r="8" fill="#1F2937"/>
              <ellipse v-if="service.id === 'boarding'" cx="150" cy="145" rx="10" ry="6" fill="#1F2937"/>
              <rect v-if="service.id === 'home-visit'" x="100" y="80" width="100" height="120" rx="10" fill="#F59E0B"/>
              <circle v-if="service.id === 'home-visit'" cx="150" cy="150" r="30" fill="#D97706"/>
              <ellipse v-if="service.id === 'dog-walking'" cx="150" cy="160" rx="60" ry="40" fill="#D97706"/>
              <circle v-if="service.id === 'dog-walking'" cx="130" cy="150" r="6" fill="#1F2937"/>
              <circle v-if="service.id === 'dog-walking'" cx="170" cy="150" r="6" fill="#1F2937"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Price Table -->
    <section class="price-section">
      <div class="container">
        <h2 class="section-title">服务价格</h2>
        <p class="section-subtitle">透明定价，物超所值</p>
        <el-table :data="priceTable" stripe style="width: 100%" class="price-table">
          <el-table-column prop="type" label="宠物类型" width="180" />
          <el-table-column prop="boarding" label="家庭寄养" />
          <el-table-column prop="homeVisit" label="上门喂养" />
          <el-table-column prop="dogWalking" label="遛狗服务" />
        </el-table>
        <p class="price-note">* 节假日价格可能有所调整，具体以预约时显示为准</p>
      </div>
    </section>

    <!-- Advantages -->
    <section class="advantages-section">
      <div class="container">
        <h2 class="section-title">我们的优势</h2>
        <p class="section-subtitle">选择我们的理由</p>
        <div class="advantages-grid">
          <div v-for="adv in advantages" :key="adv.title" class="advantage-card">
            <div class="adv-icon">
              <el-icon :size="36"><component :is="adv.icon" /></el-icon>
            </div>
            <h3>{{ adv.title }}</h3>
            <p>{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2>准备好预约服务了吗？</h2>
        <p>立即选择适合您的服务，给爱宠最好的照顾</p>
        <button class="btn-primary" @click="router.push('/booking')">立即预约</button>
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

.page-banner p {
  font-size: 18px;
  opacity: 0.9;
}

.services-detail {
  padding: 80px 0;
}

.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
  padding: 40px;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.service-block.reverse {
  direction: rtl;
}

.service-block.reverse > * {
  direction: ltr;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.service-content h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.service-desc {
  color: var(--color-text-light);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 16px;
}

.service-price {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.service-features h4, .service-suitable h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--color-text);
}

.service-features ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-light);
}

.service-features .el-icon {
  color: var(--color-primary);
}

.service-suitable {
  margin-bottom: 24px;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.service-visual {
  display: flex;
  justify-content: center;
}

.service-illustration {
  width: 100%;
  max-width: 300px;
}

.price-section {
  padding: 80px 0;
  background: var(--color-warm-beige);
}

.price-table {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.price-note {
  text-align: center;
  color: var(--color-text-light);
  font-size: 14px;
  margin-top: 20px;
}

.advantages-section {
  padding: 80px 0;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.advantage-card {
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.3s;
}

.advantage-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.adv-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.advantage-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

.advantage-card p {
  color: var(--color-text-light);
  font-size: 14px;
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  text-align: center;
  color: white;
}

.cta-section h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.cta-section .btn-primary {
  background: white;
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .service-block {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .service-block.reverse {
    direction: ltr;
  }
  .service-features ul {
    grid-template-columns: 1fr;
  }
  .service-visual {
    order: -1;
  }
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
