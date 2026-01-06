<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCaregiversStore } from '@/stores'

const router = useRouter()
const caregiversStore = useCaregiversStore()

const currentSlide = ref(0)
const slides = [
  { title: '让爱宠享受家的温暖', subtitle: '专业代养师，贴心照顾您的毛孩子', bg: 'linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%)' },
  { title: '专业团队 安心托付', subtitle: '100+认证代养师，24小时悉心呵护', bg: 'linear-gradient(135deg, #FFEDD5 0%, #FDBA74 100%)' },
  { title: '灵活服务 随心选择', subtitle: '上门喂养、家庭寄养、遛狗服务一应俱全', bg: 'linear-gradient(135deg, #FEF3E2 0%, #FB923C 50%)' }
]

const services = [
  { icon: 'House', title: '家庭寄养', desc: '代养师家中寄养，提供舒适的居住环境和全天候照顾', price: '150元/天起', features: ['独立空间', '定时喂养', '每日汇报'] },
  { icon: 'HomeFilled', title: '上门喂养', desc: '专业人员上门服务，让宠物在熟悉环境中得到照料', price: '60元/次起', features: ['喂食换水', '清洁卫生', '陪伴互动'] },
  { icon: 'Sunny', title: '遛狗服务', desc: '专业遛狗师带狗狗外出活动，保证每天充足运动量', price: '50元/次起', features: ['专业遛狗', '安全保障', 'GPS追踪'] }
]

const reviews = [
  { name: '王女士', pet: '金毛-Lucky', content: '李阿姨照顾我家Lucky非常细心，每天都发照片视频，出差也能安心了！', rating: 5 },
  { name: '张先生', pet: '英短-小橘', content: '上门喂养服务很专业，小橘一点都不认生，非常推荐！', rating: 5 },
  { name: '刘小姐', pet: '柯基-团子', content: '遛狗服务太棒了！团子每次都玩得很开心，回来倒头就睡', rating: 5 }
]

const steps = [
  { num: '01', title: '选择服务', desc: '根据需求选择合适的服务类型' },
  { num: '02', title: '挑选代养师', desc: '查看资料评价，选择心仪的代养师' },
  { num: '03', title: '提交预约', desc: '填写宠物信息，确认服务时间' },
  { num: '04', title: '安心托付', desc: '享受专业服务，实时了解宠物动态' }
]

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % slides.length }
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length }
</script>

<template>
  <div class="home">
    <!-- Hero Carousel -->
    <section class="hero" :style="{ background: slides[currentSlide].bg }">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ slides[currentSlide].title }}</h1>
          <p class="hero-subtitle">{{ slides[currentSlide].subtitle }}</p>
          <div class="hero-btns">
            <button class="btn-primary" @click="router.push('/booking')">立即预约</button>
            <button class="btn-secondary" @click="router.push('/services')">了解更多</button>
          </div>
        </div>
        <div class="hero-visual">
          <svg viewBox="0 0 400 300" class="hero-illustration">
            <ellipse cx="200" cy="270" rx="180" ry="20" fill="#D97706" opacity="0.2"/>
            <rect x="80" y="120" width="240" height="140" rx="20" fill="#FEF3E2" stroke="#D97706" stroke-width="3"/>
            <rect x="100" y="140" width="80" height="60" rx="8" fill="#FFEDD5"/>
            <rect x="200" y="140" width="100" height="100" rx="8" fill="#FED7AA"/>
            <circle cx="140" cy="200" r="25" fill="#D97706"/>
            <circle cx="132" cy="195" r="4" fill="#1F2937"/>
            <circle cx="148" cy="195" r="4" fill="#1F2937"/>
            <ellipse cx="140" cy="205" rx="5" ry="3" fill="#1F2937"/>
            <path d="M120 175 Q115 165 125 170" fill="#D97706"/>
            <path d="M160 175 Q165 165 155 170" fill="#D97706"/>
            <circle cx="250" cy="200" r="30" fill="#F59E0B"/>
            <circle cx="240" cy="193" r="5" fill="#1F2937"/>
            <circle cx="260" cy="193" r="5" fill="#1F2937"/>
            <ellipse cx="250" cy="205" rx="6" ry="4" fill="#1F2937"/>
            <path d="M250 210 Q250 220 250 215" stroke="#1F2937" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div class="hero-controls">
        <button class="carousel-btn" @click="prevSlide"><el-icon><ArrowLeft /></el-icon></button>
        <div class="carousel-dots">
          <span v-for="(_, i) in slides" :key="i" :class="['dot', { active: i === currentSlide }]" @click="currentSlide = i"></span>
        </div>
        <button class="carousel-btn" @click="nextSlide"><el-icon><ArrowRight /></el-icon></button>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">我们的服务</h2>
        <p class="section-subtitle">多样化的宠物代养服务，满足您的不同需求</p>
        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card card">
            <div class="service-icon">
              <el-icon :size="40"><component :is="service.icon" /></el-icon>
            </div>
            <h3>{{ service.title }}</h3>
            <p class="service-desc">{{ service.desc }}</p>
            <div class="service-price">{{ service.price }}</div>
            <ul class="service-features">
              <li v-for="f in service.features" :key="f"><el-icon><Check /></el-icon>{{ f }}</li>
            </ul>
            <button class="btn-primary" @click="router.push('/booking')">立即预约</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Caregivers -->
    <section class="caregivers-section">
      <div class="container">
        <h2 class="section-title">热门代养师</h2>
        <p class="section-subtitle">经验丰富、好评如潮的专业代养师</p>
        <div class="caregivers-grid">
          <div v-for="c in caregiversStore.caregivers.slice(0, 4)" :key="c.id" class="caregiver-card card">
            <div class="caregiver-avatar">
              <svg viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/>
                <circle cx="40" cy="32" r="16" fill="#D97706"/>
                <path d="M20 70 Q20 50 40 50 Q60 50 60 70" fill="#D97706"/>
              </svg>
            </div>
            <h4>{{ c.name }}</h4>
            <div class="caregiver-info">
              <span class="experience">{{ c.experience }}经验</span>
              <span class="rating"><el-icon><Star /></el-icon>{{ c.rating }}</span>
            </div>
            <div class="caregiver-tags">
              <el-tag v-for="s in c.specialties" :key="s" size="small" type="warning">{{ s }}</el-tag>
            </div>
            <div class="caregiver-price">{{ c.price }}元/天</div>
            <button class="btn-secondary" @click="router.push('/caregivers')">查看详情</button>
          </div>
        </div>
        <div class="view-all">
          <button class="btn-secondary" @click="router.push('/caregivers')">查看全部代养师</button>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section class="reviews-section">
      <div class="container">
        <h2 class="section-title">用户好评</h2>
        <p class="section-subtitle">来自真实用户的评价与反馈</p>
        <div class="reviews-grid">
          <div v-for="r in reviews" :key="r.name" class="review-card card">
            <div class="review-header">
              <div class="reviewer-avatar">
                <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#FEF3E2"/><circle cx="24" cy="18" r="10" fill="#D97706"/><path d="M10 44 Q10 32 24 32 Q38 32 38 44" fill="#D97706"/></svg>
              </div>
              <div class="reviewer-info">
                <h4>{{ r.name }}</h4>
                <span>{{ r.pet }}</span>
              </div>
            </div>
            <div class="review-stars">
              <el-icon v-for="i in r.rating" :key="i" color="#F59E0B"><StarFilled /></el-icon>
            </div>
            <p class="review-content">"{{ r.content }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="process-section">
      <div class="container">
        <h2 class="section-title">服务流程</h2>
        <p class="section-subtitle">简单四步，轻松预约专业代养服务</p>
        <div class="process-steps">
          <div v-for="step in steps" :key="step.num" class="step-item">
            <div class="step-num">{{ step.num }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>准备好为您的爱宠找一个温暖的家了吗？</h2>
          <p>立即预约，享受专业贴心的宠物代养服务</p>
          <button class="btn-primary" @click="router.push('/booking')">立即预约</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 20px 40px;
  position: relative;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--color-text-light);
  margin-bottom: 40px;
}

.hero-btns {
  display: flex;
  gap: 16px;
}

.hero-illustration {
  width: 100%;
  max-width: 400px;
}

.hero-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.carousel-btn:hover {
  background: var(--color-primary);
  color: white;
}

.carousel-dots {
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(217, 119, 6, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--color-primary);
  transform: scale(1.2);
}

.services-section, .caregivers-section, .reviews-section, .process-section {
  padding: 80px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  padding: 40px 30px;
  text-align: center;
}

.service-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.service-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
}

.service-desc {
  color: var(--color-text-light);
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.6;
}

.service-price {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.service-features {
  list-style: none;
  margin-bottom: 24px;
}

.service-features li {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.service-features .el-icon {
  color: var(--color-primary);
}

.caregivers-section {
  background: var(--color-warm-beige);
}

.caregivers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.caregiver-card {
  padding: 30px 20px;
  text-align: center;
}

.caregiver-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
}

.caregiver-avatar svg {
  width: 100%;
  height: 100%;
}

.caregiver-card h4 {
  font-size: 18px;
  margin-bottom: 8px;
}

.caregiver-info {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #F59E0B;
}

.caregiver-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
}

.caregiver-price {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.review-card {
  padding: 30px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.reviewer-avatar {
  width: 48px;
  height: 48px;
}

.reviewer-info h4 {
  font-size: 16px;
  margin-bottom: 4px;
}

.reviewer-info span {
  font-size: 13px;
  color: var(--color-text-light);
}

.review-stars {
  margin-bottom: 12px;
}

.review-content {
  color: var(--color-text-light);
  font-size: 14px;
  line-height: 1.8;
  font-style: italic;
}

.process-section {
  background: var(--color-warm-beige);
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.step-item {
  text-align: center;
  position: relative;
}

.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 35px;
  right: -15px;
  width: 30px;
  height: 2px;
  background: var(--color-primary);
}

.step-num {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.step-item h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.step-item p {
  color: var(--color-text-light);
  font-size: 14px;
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.cta-content p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.cta-content .btn-primary {
  background: white;
  color: var(--color-primary);
  font-size: 16px;
  padding: 14px 40px;
}

.cta-content .btn-primary:hover {
  background: var(--color-warm-beige);
}

@media (max-width: 1024px) {
  .services-grid, .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .caregivers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .step-item::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-btns {
    justify-content: center;
  }
  .hero-visual {
    display: none;
  }
  .services-grid, .reviews-grid, .caregivers-grid, .process-steps {
    grid-template-columns: 1fr;
  }
}
</style>
