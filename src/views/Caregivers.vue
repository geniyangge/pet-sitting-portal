<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCaregiversStore, useUserStore } from '@/stores'

const router = useRouter()
const caregiversStore = useCaregiversStore()
const userStore = useUserStore()

const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedLocation = ref('')
const priceRange = ref([0, 300])
const showOnlyAvailable = ref(false)
const selectedCaregiver = ref<any>(null)
const dialogVisible = ref(false)

const specialties = ['狗狗', '猫咪', '大型犬', '中型犬', '小型犬', '异宠', '遛狗服务']
const locations = ['朝阳区', '海淀区', '西城区', '东城区', '丰台区']

const filteredCaregivers = computed(() => {
  return caregiversStore.caregivers.filter(c => {
    if (searchQuery.value && !c.name.includes(searchQuery.value)) return false
    if (selectedSpecialty.value && !c.specialties.includes(selectedSpecialty.value)) return false
    if (selectedLocation.value && c.location !== selectedLocation.value) return false
    if (c.price < priceRange.value[0] || c.price > priceRange.value[1]) return false
    if (showOnlyAvailable.value && !c.available) return false
    return true
  })
})

const showDetail = (caregiver: any) => {
  selectedCaregiver.value = caregiver
  dialogVisible.value = true
}

const isFavorite = (id: number) => userStore.favorites.includes(id)
</script>

<template>
  <div class="caregivers-page">
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <h1>代养师团队</h1>
        <p>经验丰富、专业认证的宠物代养专家</p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-bar">
          <el-input v-model="searchQuery" placeholder="搜索代养师姓名" prefix-icon="Search" clearable class="search-input" />
          <el-select v-model="selectedSpecialty" placeholder="擅长类型" clearable>
            <el-option v-for="s in specialties" :key="s" :label="s" :value="s" />
          </el-select>
          <el-select v-model="selectedLocation" placeholder="所在区域" clearable>
            <el-option v-for="l in locations" :key="l" :label="l" :value="l" />
          </el-select>
          <div class="price-filter">
            <span>价格范围: {{ priceRange[0] }}-{{ priceRange[1] }}元/天</span>
            <el-slider v-model="priceRange" range :min="0" :max="300" />
          </div>
          <el-checkbox v-model="showOnlyAvailable">仅显示可预约</el-checkbox>
        </div>
      </div>
    </section>

    <!-- Caregivers List -->
    <section class="caregivers-list">
      <div class="container">
        <div class="list-header">
          <span>共 {{ filteredCaregivers.length }} 位代养师</span>
        </div>
        <div class="caregivers-grid">
          <div v-for="c in filteredCaregivers" :key="c.id" class="caregiver-card card">
            <div class="card-header">
              <div class="avatar">
                <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="50" cy="40" r="20" fill="#D97706"/><path d="M25 90 Q25 65 50 65 Q75 65 75 90" fill="#D97706"/></svg>
              </div>
              <button class="favorite-btn" @click.stop="userStore.toggleFavorite(c.id)">
                <el-icon :color="isFavorite(c.id) ? '#F59E0B' : '#9CA3AF'" size="20">
                  <component :is="isFavorite(c.id) ? 'StarFilled' : 'Star'" />
                </el-icon>
              </button>
            </div>
            <div class="card-body">
              <h3>{{ c.name }}</h3>
              <div class="info-row">
                <span class="location"><el-icon><Location /></el-icon>{{ c.location }}</span>
                <span class="experience">{{ c.experience }}经验</span>
              </div>
              <div class="rating-row">
                <div class="rating">
                  <el-icon color="#F59E0B"><StarFilled /></el-icon>
                  <span>{{ c.rating }}</span>
                </div>
                <span class="reviews">{{ c.reviews }}条评价</span>
              </div>
              <div class="tags">
                <el-tag v-for="s in c.specialties" :key="s" size="small" type="warning">{{ s }}</el-tag>
              </div>
              <p class="description">{{ c.description }}</p>
              <div class="card-footer">
                <div class="price">
                  <span class="amount">{{ c.price }}</span>
                  <span class="unit">元/天</span>
                </div>
                <div class="status" :class="{ available: c.available }">
                  {{ c.available ? '可预约' : '暂不可约' }}
                </div>
              </div>
              <div class="actions">
                <button class="btn-secondary" @click="showDetail(c)">查看详情</button>
                <button class="btn-primary" :disabled="!c.available" @click="router.push('/booking')">
                  {{ c.available ? '立即预约' : '暂不可约' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <el-empty v-if="filteredCaregivers.length === 0" description="没有找到符合条件的代养师" />
      </div>
    </section>

    <!-- Detail Dialog -->
    <el-dialog v-model="dialogVisible" :title="selectedCaregiver?.name" width="600px" class="caregiver-dialog">
      <div v-if="selectedCaregiver" class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-avatar">
            <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="58" fill="#FEF3E2" stroke="#D97706" stroke-width="2"/><circle cx="60" cy="48" r="24" fill="#D97706"/><path d="M30 110 Q30 78 60 78 Q90 78 90 110" fill="#D97706"/></svg>
          </div>
          <div class="dialog-info">
            <h2>{{ selectedCaregiver.name }}</h2>
            <div class="meta">
              <span><el-icon><Location /></el-icon>{{ selectedCaregiver.location }}</span>
              <span><el-icon><Timer /></el-icon>{{ selectedCaregiver.experience }}经验</span>
            </div>
            <div class="rating">
              <el-icon color="#F59E0B"><StarFilled /></el-icon>
              <span class="score">{{ selectedCaregiver.rating }}</span>
              <span class="count">({{ selectedCaregiver.reviews }}条评价)</span>
            </div>
          </div>
        </div>
        <el-divider />
        <div class="dialog-section">
          <h4>擅长类型</h4>
          <div class="tags">
            <el-tag v-for="s in selectedCaregiver.specialties" :key="s" type="warning">{{ s }}</el-tag>
          </div>
        </div>
        <div class="dialog-section">
          <h4>个人简介</h4>
          <p>{{ selectedCaregiver.description }}</p>
        </div>
        <div class="dialog-section">
          <h4>服务价格</h4>
          <div class="price-display">
            <span class="amount">{{ selectedCaregiver.price }}</span>
            <span class="unit">元/天</span>
          </div>
        </div>
        <div class="dialog-section">
          <h4>用户评价</h4>
          <div class="review-item">
            <div class="reviewer">
              <svg viewBox="0 0 40 40" width="36" height="36"><circle cx="20" cy="20" r="18" fill="#FEF3E2"/><circle cx="20" cy="16" r="8" fill="#D97706"/><path d="M10 36 Q10 26 20 26 Q30 26 30 36" fill="#D97706"/></svg>
              <div>
                <span class="name">用户***8</span>
                <div class="stars">
                  <el-icon v-for="i in 5" :key="i" color="#F59E0B" size="12"><StarFilled /></el-icon>
                </div>
              </div>
            </div>
            <p class="review-text">非常专业细心，我家毛孩子很喜欢！每天都会发照片视频，很放心。</p>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" :disabled="!selectedCaregiver?.available" @click="router.push('/booking'); dialogVisible = false">
          {{ selectedCaregiver?.available ? '立即预约' : '暂不可约' }}
        </el-button>
      </template>
    </el-dialog>
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

.filter-section {
  background: white;
  padding: 24px 0;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 72px;
  z-index: 100;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.search-input {
  width: 200px;
}

.price-filter {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.price-filter span {
  font-size: 13px;
  color: var(--color-text-light);
}

.caregivers-list {
  padding: 40px 0 80px;
}

.list-header {
  margin-bottom: 24px;
  color: var(--color-text-light);
}

.caregivers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.caregiver-card {
  overflow: hidden;
}

.card-header {
  position: relative;
  background: linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%);
  padding: 30px;
  display: flex;
  justify-content: center;
}

.avatar {
  width: 100px;
  height: 100px;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.card-body {
  padding: 24px;
}

.card-body h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 12px;
}

.info-row span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
}

.reviews {
  font-size: 13px;
  color: var(--color-text-light);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.description {
  font-size: 14px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.price .amount {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-primary);
}

.price .unit {
  font-size: 14px;
  color: var(--color-text-light);
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  background: #FEE2E2;
  color: #DC2626;
}

.status.available {
  background: #D1FAE5;
  color: #059669;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions button {
  flex: 1;
  padding: 10px;
  font-size: 14px;
}

.dialog-content {
  padding: 0 20px;
}

.dialog-header {
  display: flex;
  gap: 24px;
  align-items: center;
}

.dialog-avatar {
  width: 120px;
  height: 120px;
}

.dialog-info h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.dialog-info .meta {
  display: flex;
  gap: 16px;
  color: var(--color-text-light);
  font-size: 14px;
  margin-bottom: 12px;
}

.dialog-info .meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dialog-info .rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dialog-info .score {
  font-size: 18px;
  font-weight: 600;
}

.dialog-info .count {
  color: var(--color-text-light);
  font-size: 14px;
}

.dialog-section {
  margin-bottom: 24px;
}

.dialog-section h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--color-text);
}

.dialog-section p {
  color: var(--color-text-light);
  line-height: 1.8;
}

.price-display .amount {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-primary);
}

.price-display .unit {
  font-size: 16px;
  color: var(--color-text-light);
}

.review-item {
  background: var(--color-gray-100);
  padding: 16px;
  border-radius: var(--radius-md);
}

.reviewer {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.reviewer .name {
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.review-text {
  color: var(--color-text-light);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .caregivers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .caregivers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
