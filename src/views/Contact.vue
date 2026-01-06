<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const contactForm = ref({
  name: '',
  phone: '',
  email: '',
  type: '',
  message: ''
})

const contactTypes = ['咨询服务', '投诉建议', '合作洽谈', '其他']

const faqs = [
  { q: '如何选择合适的代养师？', a: '您可以根据代养师的评分、经验、擅长宠物类型和位置等条件进行筛选，查看其他用户的评价来做出选择。' },
  { q: '代养期间可以看到宠物的情况吗？', a: '当然可以！代养师会每天发送照片和视频，您可以随时了解宠物的状态。' },
  { q: '如果宠物生病了怎么办？', a: '我们的代养师都经过培训，会第一时间联系您并协助送医，平台提供紧急医疗协助服务。' },
  { q: '如何取消预约？', a: '您可以在服务开始前24小时免费取消预约，24小时内取消可能会收取一定费用。' },
  { q: '支持哪些支付方式？', a: '我们支持微信支付、支付宝、银行卡等多种支付方式。' },
  { q: '代养师的资质如何保证？', a: '所有代养师都经过平台严格审核和培训，持有相关资质证书，并有实名认证。' }
]

const expandedFaq = ref<number | null>(null)

const submitForm = () => {
  if (!contactForm.value.name || !contactForm.value.phone || !contactForm.value.message) {
    ElMessage.warning('请填写必填信息')
    return
  }
  ElMessage.success('您的留言已提交，我们会尽快回复您')
  contactForm.value = { name: '', phone: '', email: '', type: '', message: '' }
}
</script>

<template>
  <div class="contact-page">
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <h1>联系我们</h1>
        <p>有任何问题？我们随时为您服务</p>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="contact-info-section">
      <div class="container">
        <div class="contact-cards">
          <div class="contact-card">
            <div class="card-icon">
              <el-icon :size="32"><Phone /></el-icon>
            </div>
            <h3>客服热线</h3>
            <p class="highlight">400-888-9999</p>
            <p>工作时间: 9:00-21:00</p>
          </div>
          <div class="contact-card">
            <div class="card-icon">
              <el-icon :size="32"><Message /></el-icon>
            </div>
            <h3>电子邮件</h3>
            <p class="highlight">service@warmpet.com</p>
            <p>24小时内回复</p>
          </div>
          <div class="contact-card">
            <div class="card-icon">
              <el-icon :size="32"><ChatDotRound /></el-icon>
            </div>
            <h3>在线客服</h3>
            <p class="highlight">微信公众号</p>
            <p>温馨宠物代养</p>
          </div>
          <div class="contact-card">
            <div class="card-icon">
              <el-icon :size="32"><Location /></el-icon>
            </div>
            <h3>公司地址</h3>
            <p class="highlight">北京市朝阳区</p>
            <p>宠物路88号</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & FAQ -->
    <section class="contact-main">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div class="contact-form-wrapper">
            <h2>留言咨询</h2>
            <p class="form-desc">填写以下表单，我们会尽快与您联系</p>
            <el-form :model="contactForm" label-position="top" class="contact-form">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名" required>
                    <el-input v-model="contactForm.name" placeholder="请输入姓名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话" required>
                    <el-input v-model="contactForm.phone" placeholder="请输入联系电话" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model="contactForm.email" placeholder="请输入邮箱" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="咨询类型">
                    <el-select v-model="contactForm.type" placeholder="请选择">
                      <el-option v-for="t in contactTypes" :key="t" :label="t" :value="t" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="留言内容" required>
                    <el-input v-model="contactForm.message" type="textarea" :rows="5" placeholder="请输入您的问题或建议" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button type="primary" size="large" @click="submitForm">提交留言</el-button>
            </el-form>
          </div>

          <!-- FAQ -->
          <div class="faq-wrapper">
            <h2>常见问题</h2>
            <p class="faq-desc">快速了解我们的服务</p>
            <div class="faq-list">
              <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ expanded: expandedFaq === i }">
                <div class="faq-question" @click="expandedFaq = expandedFaq === i ? null : i">
                  <span>{{ faq.q }}</span>
                  <el-icon><ArrowDown /></el-icon>
                </div>
                <div class="faq-answer">
                  <p>{{ faq.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2 class="section-title">公司位置</h2>
        <div class="map-placeholder">
          <svg viewBox="0 0 800 300" class="map-svg">
            <rect width="800" height="300" fill="#FEF3E2"/>
            <path d="M0 200 Q200 150 400 180 Q600 210 800 160 L800 300 L0 300 Z" fill="#FED7AA"/>
            <circle cx="400" cy="150" r="20" fill="#D97706"/>
            <path d="M400 130 L400 100 M385 145 L415 145" stroke="white" stroke-width="4" stroke-linecap="round"/>
            <text x="400" y="200" text-anchor="middle" fill="#1F2937" font-size="14">北京市朝阳区宠物路88号</text>
          </svg>
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

.contact-info-section {
  padding: 60px 0;
  background: white;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.contact-card {
  text-align: center;
  padding: 32px 24px;
  background: var(--color-warm-beige);
  border-radius: var(--radius-lg);
  transition: all 0.3s;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.contact-card h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

.contact-card .highlight {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.contact-card p {
  font-size: 14px;
  color: var(--color-text-light);
}

.contact-main {
  padding: 60px 0 80px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.contact-form-wrapper, .faq-wrapper {
  background: white;
  padding: 40px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.contact-form-wrapper h2, .faq-wrapper h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.form-desc, .faq-desc {
  color: var(--color-text-light);
  margin-bottom: 32px;
}

.contact-form .el-button {
  width: 100%;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.faq-question {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.faq-question:hover {
  background: var(--color-warm-beige);
}

.faq-item .el-icon {
  transition: transform 0.3s;
}

.faq-item.expanded .el-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.expanded .faq-answer {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 20px 20px;
  color: var(--color-text-light);
  line-height: 1.8;
}

.map-section {
  padding: 60px 0 80px;
  background: white;
}

.map-placeholder {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.map-svg {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 1024px) {
  .contact-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .contact-cards {
    grid-template-columns: 1fr;
  }
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
