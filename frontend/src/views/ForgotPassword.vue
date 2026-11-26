<template>
  <section class="ForgotPassword min-vh-100">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div
        class="forgotPasswordCard row align-items-center w-100 bg-white rounded-4 shadow-sm border"
      >
        <div class="col-lg-7 p-0">
          <div class="details text-center px-3 px-lg-5">
            <div class="header py-2">
              <div class="logo">
                <img :src="logo" class="img-fluid" style="width: 200px" alt="logo" />
              </div>
              <div class="mainTitle"><h1 class="fw-bold m-0 mb-2">نسيت كلمة المرور ؟</h1></div>
              <div class="secondaryTitle fs-5 fw-bold" style="color: var(--secondary-color)">
                لا تقلق. أدخِل بريدك الإلكتروني وسنُرسِل لك رمزاً لإعادة تعيين كلمة المرور.
              </div>
            </div>
            <form @submit.prevent="sendForgotPasswordRequest">
              <div class="mt-3 mb-4 text-start email">
                <label for="email" class="form-label fw-bold">البريد الإلكتروني</label>

                <div class="input-group has-validation">
                  <span
                    class="input-group-text border-end-0 rounded-0"
                    :class="errorMsg ? 'is-invalid' : ''"
                    style="
                      background-color: transparent;
                      border-top-right-radius: 5px !important;
                      border-bottom-right-radius: 5px !important;
                    "
                    ><i class="bi bi-envelope"></i
                  ></span>
                  <input
                    type="email"
                    style="direction: rtl"
                    class="form-control"
                    :class="errorMsg ? 'is-invalid' : ''"
                    placeholder="أدخل بريدك الإلكتروني"
                    aria-label="Email"
                    id="email"
                    v-model="email"
                  />
                </div>
              </div>

              <transition name="fade" mode="out-in">
                <div
                  class="errorMessage my-0 d-flex align-items-center text-start gap-3 py-1 px-3 rounded border my-3"
                  style="
                    color: #b91c1c;
                    background-color: #fee2e2;
                    border-color: #e58a8a !important;
                  "
                  v-if="errorMsg"
                >
                  <div class="icon" style="color: #dc2626">
                    <i class="bi bi-exclamation-triangle fs-4"></i>
                  </div>
                  <div class="text">
                    <h5 class="m-0">تحقق من البريد الإلكتروني</h5>
                    <p class="m-0 fw-bold" style="font-size: 12px">
                      {{ errorMsg }}
                    </p>
                  </div>
                </div>
              </transition>

              <div class="buttons">
                <div class="mainBtn">
                  <button
                    class="btn w-100 text-light fs-5"
                    style="background-color: #0d4dc1"
                    type="submit"
                    :disabled="isSending"
                  >
                    <div v-if="isSending">جاري إرسال الرمز...</div>
                    <div v-else class="d-flex align-items-center justify-content-center gap-3">
                      <div class="icon" style="margin-top: 2px">
                        <i class="bi bi-send fs-4"></i>
                      </div>
                      <div class="text">إرسال رمز الاستعادة</div>
                    </div>
                  </button>
                </div>

                <hr style="color: #ccc" class="my-4" />

                <div class="backToLogin">
                  <router-link
                    :to="{ name: 'Login' }"
                    class="d-flex align-items-center justify-content-center gap-3 text-decoration-none fs-5 fw-bold"
                  >
                    <div class="icon"><i class="bi bi-arrow-left"></i></div>
                    <div class="text">العودة الى تسجيل الدخول</div>
                  </router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-5 p-0 d-none d-lg-block">
          <div class="imgSide d-flex align-items-end p-4">
            <div
              class="note p-3 d-flex align-items-center gap-3 rounded w-100"
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
                <div class="title fw-bold fs-5">استعادة كلمة المرور</div>
                <p class="m-0">
                  أدخل بريدك الالكتروني وسنرسل لك رمزاً <br />
                  لإعادة تعيين كلمة مرورك بأمان.
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
import { forgotPassword } from '@/services/authService'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'

// Define email
const email = ref('')

// Define loading state
const isSending = ref(false)

// Define error to store error message
let errorMsg = ref('')

// Function to handle with errors
const getForgotPasswordErrorMessage = (error) => {
  if (!error?.response) {
    toast.error('تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مجدداً.')
    return
  }

  const status = error?.response?.status

  if (status === 400) {
    return 'يُرجى إدخال بريد إلكتروني صالح'
  }

  if (status === 429) {
    toast.warning('لقد أجريت عدداً كبيراً من المحاولات. يُرجى الانتظار قليلاً ثم المحاولة مجدداً.')
    return
  }

  if (status === 500) {
    toast.error('حدث خطأ غير متوقع. يُرجى المحاولة لاحقاً.')
    return
  }

  if (status === 503) {
    toast.error('الخدمة غير متاحة حالياً. يُرجى المحاولة لاحقاً.')
    return
  }

  toast.error('تعذّر معالجة طلبك. يُرجى المحاولة لاحقاً.')
}

// Function to send forgot request
const sendForgotPasswordRequest = async () => {
  if (isSending.value) return

  isSending.value = true
  errorMsg.value = ''

  try {
    const normalizedEmail = email.value.trim().toLowerCase()

    await forgotPassword(normalizedEmail)

    toast.success(
      'تم استلام طلبك بنجاح! إذا كان بريدك مرتبطاً بحساب مؤهّل، فستصلك رسالة تحتوي على رمز الاستعادة.',
    )

    sessionStorage.setItem('email', normalizedEmail)
    router.push({ name: 'ResetPassword' })
  } catch (error) {
    errorMsg.value = getForgotPasswordErrorMessage(error)
  } finally {
    isSending.value = false
  }
}

// On Change email , clear error msg
watch(email, () => {
  errorMsg.value = ''
})
</script>

<style lang="scss">
.forgotPasswordCard {
  min-height: 600px;
  .imgSide {
    background-image: url('@/assets/forgotImg.png');
    background-position: center;
    background-size: cover;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    min-height: 600px;
  }
}

.is-invalid {
  border: 1px solid #dc2626;
  background-color: #fee2e2;
}
</style>
