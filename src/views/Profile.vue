<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, useCaregiversStore } from '@/stores'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const caregiversStore = useCaregiversStore()
const activeTab = ref('orders')

const editingProfile = ref(false)
const profileForm = ref({ ...userStore.userInfo })

const saveProfile = () => {
  Object.assign(userStore.userInfo, profileForm.value)
  editingProfile.value = false
  ElMessage.success('个人信息已更新')
}

const statusMap: Record<string, string> = {
  '已完成': 'success',
  '进行中': 'warning',
  '待确认': 'info',
  '已取消': 'danger'
}

const getFavoriteCaregivers = () => {
  return caregiversStore.caregivers.filter(c => userStore.favorites.includes(c.id))
}
</script>

<template>
  <div class="profile-page">
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <h1>个人中心</h1>
        <p>管理您的账户和订单信息</p>
      </div>
    </section>

    <section class="profile-section">
      <div class="container">
        <div class="profile-layout">
          <!-- Sidebar -->
          <div class="profile-sidebar">
            <div class="user-card">
              <div class="user-avatar">
                <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="50" cy="40" r="20" fill="#D97706"/><path d="M25 90 Q25 65 50 65 Q75 65 75 90" fill="#D97706"/></svg>
              </div>
              <h3>{{ userStore.userInfo.name }}</h3>
              <p>{{ userStore.userInfo.phone }}</p>
            </div>
            <el-menu :default-active="activeTab" @select="(key: string) => activeTab = key" class="sidebar-menu">
              <el-menu-item index="orders"><el-icon><List /></el-icon>我的订单</el-menu-item>
              <el-menu-item index="pets"><el-icon><Cherry /></el-icon>我的宠物</el-menu-item>
              <el-menu-item index="favorites"><el-icon><Star /></el-icon>收藏的代养师</el-menu-item>
              <el-menu-item index="profile"><el-icon><User /></el-icon>个人信息</el-menu-item>
            </el-menu>
          </div>

          <!-- Content -->
          <div class="profile-content">
            <!-- Orders -->
            <div v-show="activeTab === 'orders'" class="content-panel">
              <h2>我的订单</h2>
              <div class="orders-list">
                <div v-for="order in userStore.orders" :key="order.id" class="order-card card">
                  <div class="order-header">
                    <span class="order-id">订单号: {{ order.id }}</span>
                    <el-tag :type="statusMap[order.status] as any" size="small">{{ order.status }}</el-tag>
                  </div>
                  <div class="order-body">
                    <div class="order-info">
                      <p><strong>宠物:</strong> {{ order.petName }}</p>
                      <p><strong>代养师:</strong> {{ order.caregiverName }}</p>
                      <p><strong>服务类型:</strong> {{ order.serviceType }}</p>
                      <p><strong>服务时间:</strong> {{ order.startDate }} 至 {{ order.endDate }}</p>
                    </div>
                    <div class="order-price">
                      <span class="label">订单金额</span>
                      <span class="amount">{{ order.totalPrice }}元</span>
                    </div>
                  </div>
                  <div class="order-actions">
                    <el-button size="small">查看详情</el-button>
                    <el-button v-if="order.status === '已完成'" size="small" type="primary">评价</el-button>
                  </div>
                </div>
                <el-empty v-if="userStore.orders.length === 0" description="暂无订单" />
              </div>
            </div>

            <!-- Pets -->
            <div v-show="activeTab === 'pets'" class="content-panel">
              <div class="panel-header">
                <h2>我的宠物</h2>
                <el-button type="primary" size="small"><el-icon><Plus /></el-icon>添加宠物</el-button>
              </div>
              <div class="pets-grid">
                <div v-for="pet in userStore.pets" :key="pet.id" class="pet-card card">
                  <div class="pet-avatar">
                    <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="40" cy="35" r="18" fill="#D97706"/><circle cx="32" cy="32" r="4" fill="#1F2937"/><circle cx="48" cy="32" r="4" fill="#1F2937"/><ellipse cx="40" cy="42" rx="5" ry="3" fill="#1F2937"/></svg>
                  </div>
                  <div class="pet-info">
                    <h4>{{ pet.name }}</h4>
                    <p>{{ pet.type }} - {{ pet.breed }}</p>
                    <p class="pet-meta">{{ pet.age }} | {{ pet.weight }}</p>
                  </div>
                  <div class="pet-actions">
                    <el-button size="small" text><el-icon><Edit /></el-icon></el-button>
                    <el-button size="small" text type="danger"><el-icon><Delete /></el-icon></el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Favorites -->
            <div v-show="activeTab === 'favorites'" class="content-panel">
              <h2>收藏的代养师</h2>
              <div class="favorites-grid">
                <div v-for="c in getFavoriteCaregivers()" :key="c.id" class="favorite-card card">
                  <div class="fav-avatar">
                    <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="30" cy="24" r="12" fill="#D97706"/><path d="M15 54 Q15 38 30 38 Q45 38 45 54" fill="#D97706"/></svg>
                  </div>
                  <div class="fav-info">
                    <h4>{{ c.name }}</h4>
                    <div class="meta">
                      <span><el-icon><StarFilled /></el-icon>{{ c.rating }}</span>
                      <span>{{ c.location }}</span>
                    </div>
                  </div>
                  <div class="fav-price">{{ c.price }}元/天</div>
                  <el-button size="small" type="primary" @click="$router.push('/booking')">预约</el-button>
                </div>
                <el-empty v-if="getFavoriteCaregivers().length === 0" description="暂无收藏" />
              </div>
            </div>

            <!-- Profile Edit -->
            <div v-show="activeTab === 'profile'" class="content-panel">
              <h2>个人信息</h2>
              <el-form v-if="editingProfile" :model="profileForm" label-width="100px" class="profile-form">
                <el-form-item label="姓名">
                  <el-input v-model="profileForm.name" />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="profileForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="profileForm.email" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveProfile">保存</el-button>
                  <el-button @click="editingProfile = false">取消</el-button>
                </el-form-item>
              </el-form>
              <div v-else class="profile-display">
                <div class="profile-row"><span>姓名</span><span>{{ userStore.userInfo.name }}</span></div>
                <div class="profile-row"><span>手机号</span><span>{{ userStore.userInfo.phone }}</span></div>
                <div class="profile-row"><span>邮箱</span><span>{{ userStore.userInfo.email }}</span></div>
                <el-button type="primary" @click="editingProfile = true; profileForm = { ...userStore.userInfo }">编辑信息</el-button>
              </div>
            </div>
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

.profile-section {
  padding: 40px 0 80px;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
}

.profile-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.user-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
  margin-bottom: 16px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
}

.user-card h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.user-card p {
  color: var(--color-text-light);
}

.sidebar-menu {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.profile-content {
  min-height: 500px;
}

.content-panel {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-md);
}

.content-panel h2 {
  font-size: 22px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray-200);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray-200);
}

.panel-header h2 {
  margin: 0;
  border: none;
  padding: 0;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  padding: 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-id {
  font-size: 14px;
  color: var(--color-text-light);
}

.order-body {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.order-info p {
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--color-text-light);
}

.order-info strong {
  color: var(--color-text);
}

.order-price {
  text-align: right;
}

.order-price .label {
  display: block;
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: 4px;
}

.order-price .amount {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-primary);
}

.order-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.pet-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.pet-avatar {
  width: 80px;
  height: 80px;
}

.pet-info h4 {
  font-size: 18px;
  margin-bottom: 4px;
}

.pet-info p {
  font-size: 14px;
  color: var(--color-text-light);
}

.pet-meta {
  font-size: 13px;
}

.pet-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.favorite-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.fav-avatar {
  width: 60px;
  height: 60px;
}

.fav-info h4 {
  font-size: 16px;
  margin-bottom: 4px;
}

.fav-info .meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-light);
}

.fav-info .meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.fav-price {
  margin-left: auto;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin-right: 16px;
}

.profile-form {
  max-width: 400px;
}

.profile-display {
  max-width: 400px;
}

.profile-row {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.profile-row span:first-child {
  color: var(--color-text-light);
}

.profile-display .el-button {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
  .profile-sidebar {
    position: static;
  }
  .pets-grid, .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
