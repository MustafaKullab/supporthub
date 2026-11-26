<template>
  <section class="VerifyAccount min-vh-100">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="verifyCard row align-items-center w-100 bg-white rounded-4 shadow-sm border">
        <div class="col-lg-7 px-3 px-md-5">
          <div class="details text-center">
            <div class="header pt-2">
              <div class="logo">
                <img :src="logo" class="img-fluid" style="width: 200px" alt="logo" />
              </div>
              <div class="mainTitle"><h1 class="fw-bold m-0">تفعيل حسابك</h1></div>
              <div class="secondaryTitle fs-5 fw-bold" style="color: var(--secondary-color)">
                أدخل رمز التحقق الذي أرسلناه إالى بريدك الالكتروني لتفعيل حسابك.
              </div>
            </div>

            <div
              class="emailMsg d-flex align-items-center justify-content-center gap-2 p-2 my-3 rounded-3 border"
              style="background-color: #e5ecfe"
            >
              <div
                class="icon d-flex align-items-center justify-content-center rounded-pill"
                style="width: 50px; height: 50px; background-color: #c9dbfd; color: #0034f4"
              >
                <i class="bi bi-envelope fs-4"></i>
              </div>
              <div class="details" style="color: #000164">
                <p class="m-0">تم إرسال رمز التحقُق إلى:</p>
                <p class="m-0 fw-bold" v-if="email">{{ email }}</p>
              </div>
            </div>

            <form
              class="text-start"
              @submit.prevent="verifyAccount(email, verificationCode)"
            >
              <label class="form-label">رمز التحقق</label>

              <div class="OTPCode" dir="ltr">
                <input
                  type="text"
                  v-for="(digit, i) of code"
                  :key="i"
                  class="form-control d-flex align-items-center justify-content-center text-center fs-3"
                  :class="errorStatus ? 'is-invalid' : ''"
                  maxlength="1"
                  :placeholder="errorStatus ? '' : '-'"
                  v-model="code[i]"
                  ref="inputs"
                  @input="nextInp(i)"
                  @keydown.backspace="prevInp(i)"
                />
              </div>

              <div class="resendCode d-flex align-items-center justify-content-center gap-2 my-3">
                <div class="msg" style="color: var(--secondary-color)">لم يصلك رمز؟</div>
                <button
                  type="button"
                  class="btn"
                  :disabled="counter > 0 || isResending || !employee"
                  :class="counter > 0 ? 'border-0' : ''"
                  :style="{
                    backgroundColor: counter === 0 ? '#013cb8' : '#f0f1f6',
                    color: counter === 0 ? '#ffffff' : '#687088',
                  }"
                  @click.prevent="resendCode(email)"
                >
                  <div v-if="counter === 0" class="d-flex align-items-center gap-2">
                    <div class="icon"><i class="bi bi-arrow-repeat"></i></div>
                    <div class="text">إعادة إرسال الرمز</div>
                  </div>
                  <div v-else class="d-flex align-items-center gap-2">
                    <div class="icon"><i class="bi bi-clock"></i></div>
                    <div class="text">إعادة إرسال الرمز ({{ counter }} ثانية)</div>
                  </div>
                </button>
              </div>

              <transition name="fade" mode="out-in">
                <div
                  class="errorMessage my-0 d-flex align-items-center text-start gap-3 py-1 px-3 rounded border"
                  style="
                    color: #b91c1c;
                    background-color: #fee2e2;
                    border-color: #e58a8a !important;
                  "
                  v-if="errorStatus"
                >
                  <div class="icon" style="color: #dc2626">
                    <i class="bi bi-exclamation-triangle fs-4"></i>
                  </div>
                  <div class="text">
                    <h5 class="m-0">فشل التفعيل</h5>
                    <p class="m-0 fw-bold" style="font-size: 12px">
                      رمز التحقق غير صحيح أو منتهي الصلاحية. يرحى المحاولة مرة أُخرى أو طلب رمز
                      جديد.
                    </p>
                  </div>
                </div>
              </transition>

              <div class="buttons my-3">
                <div class="confirmedVerify">
                  <button
                    type="submit"
                    class="btn w-100 text-light"
                    style="background-color: #0d4dc1"
                    :disabled="isLodaing || !employee"
                  >
                    <div
                      v-if="!isLodaing"
                      class="d-flex align-items-center justify-content-center gap-2"
                    >
                      <div class="text">تأكيد التفعيل</div>
                      <div class="icon"><i class="bi bi-check-circle"></i></div>
                    </div>
                    <div v-else>جارِ التفعيل...</div>
                  </button>
                </div>
                <div class="backToLogin position-relative text-center mt-3">
                  <router-link
                    class="text-decoration-none d-flex align-items-center justify-content-center gap-2"
                    :to="{ name: 'Login' }"
                  >
                    <div class="text">العودة الى تسجيل الدخول</div>
                    <div class="icon"><i class="bi bi-chevron-left"></i></div>
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-5 p-0 d-none d-lg-block">
          <div class="imgSide d-flex align-items-end p-4">
            <div
              class="importantInfor p-3 d-flex align-items-center gap-3 rounded w-100"
              style="
                background-color: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(3px);
                color: #f2f5fc;
                border: 1px solid #3262cc !important;
              "
            >
              <div
                class="icon d-flex align-items-center justify-content-center rounded-4"
                style="width: 50px; height: 50px; background-color: #96bafc"
              >
                <i class="bi bi-exclamation-circle fs-4"></i>
              </div>
              <div class="text">
                <div class="title fw-bold fs-5">معلومة مهمة</div>
                <p>
                  رمز التحقق صالح لمدة 10 دقائق فقط, ويمكنك <br />
                  طلب إعادة ارساله عِند الحاجة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logo from '@/assets/supportHubLogo.png'
import router from '@/router'
import { resendCodeSrv, verifyAcc } from '@/services/authService'
import { computed, onUnmounted, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

const email = ref(sessionStorage.getItem('verificationEmail') || '')

// OTP vars
const code = ref(['', '', '', '', '', ''])
const inputs = ref(null)

// Function to go to next input
const nextInp = (index) => {
  if (index === 5) return
  if (code.value[index]) {
    inputs.value[index + 1].focus()
  }
}

// Function to go to prev inp
const prevInp = (index) => {
  if (index === 0) return

  if (code.value[index] === '') {
    inputs.value[index - 1].focus()
  }
}

// Var to store the code
const verificationCode = computed(() => code.value.join(''))

// Redend counter
let counter = ref(0)
let coldownCounter = null

// Store error
const errorStatus = ref(0)

watch(
  verificationCode,
  () => {
    errorStatus.value = 0
  },
  { deep: true },
)

const isResending = ref(false)

// Function to resend verificationCode
const resendCode = async (email) => {
  if (isResending.value || counter.value > 0) return

  isResending.value = true

  try {
    await resendCodeSrv(email)

    toast.success('تم استلام طلبك. تحقق من بريدك الإلكتروني إذا كان الحساب مؤهلاً لإعادة الإرسال.')

    counter.value = 60

    clearInterval(coldownCounter)

    coldownCounter = setInterval(() => {
      if (counter.value > 0) {
        counter.value--
      } else {
        clearInterval(coldownCounter)
      }
    }, 1000)
  } catch {
    toast.error('تعذّر طلب إعادة الإرسال. حاول مجدداً.')
  } finally {
    isResending.value = false
  }
}

// Var to loading
const isLodaing = ref(false)

// Function to verify Account
const verifyAccount = async (email, code) => {
  if (!/^\d{6}$/.test(code)) {
    return toast.error('يرجى إدخال رمز مكوّن من 6 أرقام')
  }

  try {
    if (isLodaing.value) return;
    isLodaing.value = true;

    await verifyAcc(email, code);

    toast.success('تم تفعيل الحساب بنجاح');

    router.push({ name: 'Login' });

    sessionStorage.removeItem('verificationEmail');
  } catch (error) {
    errorStatus.value = error?.response?.data?.data?.status
  } finally {
    isLodaing.value = false
  }
}

onUnmounted(() => {
  clearInterval(coldownCounter)
})
</script>

<style lang="scss">
.verifyCard {
  min-height: 600px;

  .imgSide {
    background-image: url('@/assets/verifyImg.png');
    background-position: center;
    background-size: cover;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    min-height: 600px;
  }
}

.confirmedVerify {
  button {
    &:hover {
      background-color: #0345b8 !important;
    }
  }
}

.backToLogin {
  position: relative;
  color: var(--secondary-color);
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    height: 1px;
    width: 35%;
    background-color: #e0e4ec;
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
}

.is-invalid {
  border: 1px solid #dc2626;
  background-color: #fee2e2;
}

.OTPCode {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 6px;

  input {
    width: 100%;
    min-width: 0;
    height: clamp(42px, 7vw, 65px);
    padding: 0;
    font-size: clamp(16px, 4vw, 26px);
  }
}
</style>
