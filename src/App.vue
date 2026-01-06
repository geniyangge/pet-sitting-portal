<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', name: '首页' },
  { path: '/services', name: '服务介绍' },
  { path: '/caregivers', name: '代养师团队' },
  { path: '/booking', name: '预约服务' },
  { path: '/contact', name: '联系我们' }
]

const isActive = (path: string) => route.path === path

const handleLogin = () => {
  userStore.login()
  router.push('/profile')
}
</script>

<template>
  <div class="app-wrapper">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <svg class="logo-icon" viewBox="0 0 40 40" fill="none">
            <path d="M12 8Q8 4 6 10Q4 16 10 18Q6 20 8 26Q10 32 16 30Q20 36 24 30Q30 32 32 26Q34 20 30 18Q36 16 34 10Q32 4 28 8Q24 6 20 10Q16 6 12 8" fill="#D97706"/>
            <circle cx="15" cy="18" r="2" fill="#1F2937"/>
            <circle cx="25" cy="18" r="2" fill="#1F2937"/>
            <ellipse cx="20" cy="23" rx="3" ry="2" fill="#1F2937"/>
          </svg>
          <span class="logo-text">温馨宠物代养</span>
        </router-link>

        <nav class="nav-desktop">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="['nav-link', { active: isActive(item.path) }]"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <div class="header-actions">
          <router-link v-if="userStore.isLoggedIn" to="/profile" class="user-btn">
            <el-icon><User /></el-icon>
            <span>我的</span>
          </router-link>
          <button v-else class="btn-primary login-btn" @click="handleLogin">登录/注册</button>
          
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
            <el-icon size="24"><Menu /></el-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" class="mobile-menu">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
          <button v-if="!userStore.isLoggedIn" class="btn-primary mobile-login" @click="handleLogin; mobileMenuOpen = false">
            登录/注册
          </button>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <svg class="logo-icon" viewBox="0 0 40 40" fill="none">
                <path d="M12 8Q8 4 6 10Q4 16 10 18Q6 20 8 26Q10 32 16 30Q20 36 24 30Q30 32 32 26Q34 20 30 18Q36 16 34 10Q32 4 28 8Q24 6 20 10Q16 6 12 8" fill="#D97706"/>
                <circle cx="15" cy="18" r="2" fill="#1F2937"/>
                <circle cx="25" cy="18" r="2" fill="#1F2937"/>
                <ellipse cx="20" cy="23" rx="3" ry="2" fill="#1F2937"/>
              </svg>
              <span>温馨宠物代养</span>
            </div>
            <p class="footer-desc">专业、贴心的宠物代养服务，让您的爱宠享受家一般的温暖</p>
          </div>
          <div class="footer-links">
            <h4>快速链接</h4>
            <router-link to="/services">服务介绍</router-link>
            <router-link to="/caregivers">代养师团队</router-link>
            <router-link to="/booking">预约服务</router-link>
          </div>
          <div class="footer-links">
            <h4>帮助中心</h4>
            <router-link to="/contact">常见问题</router-link>
            <router-link to="/contact">联系客服</router-link>
            <router-link to="/contact">投诉建议</router-link>
          </div>
          <div class="footer-contact">
            <h4>联系方式</h4>
            <p><el-icon><Phone /></el-icon> 400-888-9999</p>
            <p><el-icon><Message /></el-icon> service@warmpet.com</p>
            <p><el-icon><Location /></el-icon> 北京市朝阳区宠物路88号</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright 2025 温馨宠物代养. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 40px;
  height: 40px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
}

.nav-desktop {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.3s;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-primary);
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary);
  font-weight: 500;
}

.login-btn {
  padding: 10px 24px;
  font-size: 14px;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-nav-link {
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.mobile-login {
  margin-top: 16px;
}

.main-content {
  flex: 1;
  padding-top: 72px;
}

.footer {
  background: var(--color-text);
  color: white;
  padding: 60px 0 30px;
  margin-top: 80px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-logo .logo-icon {
  width: 36px;
  height: 36px;
}

.footer-logo span {
  font-size: 18px;
  font-weight: 600;
}

.footer-desc {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  line-height: 1.8;
}

.footer-links h4, .footer-contact h4 {
  font-size: 16px;
  margin-bottom: 20px;
  color: var(--color-primary-light);
}

.footer-links a {
  display: block;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  margin-bottom: 12px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: white;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  margin-bottom: 12px;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 30px;
  text-align: center;
  color: rgba(255,255,255,0.5);
  font-size: 13px;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .login-btn {
    display: none;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
