<template>
  <section class="ResetPassword">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div
        class="resetPasswordCard row align-items-center w-100 bg-white rounded-4 shadow-sm border"
      >
        <div class="col-lg-7">
          <div class="details text-center px-3 px-lg-5">
            <div class="header pt-2">
              <div class="logo">
                <img :src="logo" class="img-fluid" style="width: 200px" alt="logo" />
              </div>
              <div class="mainTitle"><h1 class="fw-bold m-0 mb-1">إعادة تعيين كلمة المرور</h1></div>
              <div class="secondaryTitle fs-5 fw-bold" style="color: var(--secondary-color)">
                أدخل رمز الاستعادة الذي تم إرساله إلى بريدك الإلكتروني، ثُم أنشئ كلمة مرور جديدة
                لحسابك
              </div>
            </div>

            <form class="my-2" @submit.prevent="resetPasswordFun">
              <div class="OTOCode text-start">
                <label class="form-label fs-5 fw-bold">رمز الاستعادة</label>
                <div class="OTPCodeInputs my-2" dir="ltr">
                  <input
                    v-for="(dgt, i) of code"
                    :key="i"
                    type="text"
                    inputmode="numeric"
                    class="form-control d-flex align-items-center justify-content-center text-center fs-3"
                    maxlength="1"
                    v-model="code[i]"
                    ref="inputs"
                    placeholder="-"
                    @input="nextInp(i)"
                    @keydown.backspace="prevInp(i)"
                  />
                </div>
              </div>

              <div class="receiveCode d-flex align-items-center justify-content-center gap-2 mt-3">
                <div class="msg" style="color: var(--secondary-color)">لم يصلك رمز؟</div>
                <button
                  type="button"
                  class="btn"
                  :disabled="counter > 0 || isResending"
                  :class="counter > 0 ? 'border-0' : ''"
                  :style="{
                    backgroundColor: counter === 0 ? '#013cb8' : '#f0f1f6',
                    color: counter === 0 ? '#ffffff' : '#687088',
                  }"
                  @click.prevent="resendCode"
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

              <div class="mb-2 text-start password flex-grow-1">
                <label for="password" class="form-label fw-bold">كلمة المرور الجديدة</label>

                <div class="input-group position-relative has-validation">
                  <span class="input-group-text" style="background-color: transparent"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <button
                    type="button"
                    class="eyeBtn position-absolute top-50 cursor-pointer btn"
                    style="left: 0; transform: translateY(-50%); z-index: 10"
                    @click.prevent="isHide1 = !isHide1"
                  >
                    <i class="bi" :class="isHide1 ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                  <input
                    :type="isHide1 ? 'password' : 'text'"
                    class="form-control"
                    placeholder="أدخل كلمة المرور الجديدة"
                    aria-label="Password"
                    id="password"
                    aria-describedby="password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="mb-3 text-start password flex-grow-1">
                <label for="confPassword" class="form-label fw-bold"
                  >تأكيد كلمة المرور الجديدة</label
                >

                <div class="input-group position-relative has-validation">
                  <span class="input-group-text" style="background-color: transparent"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <button
                    type="button"
                    class="eyeBtn position-absolute top-50 cursor-pointer btn"
                    style="left: 0; transform: translateY(-50%); z-index: 10"
                    @click.prevent="isHide2 = !isHide2"
                  >
                    <i class="bi" :class="isHide2 ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                  <input
                    :type="isHide2 ? 'password' : 'text'"
                    class="form-control"
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    aria-label="confPassword"
                    id="confPassword"
                    aria-describedby="confPassword"
                    v-model="confirmPassword"
                  />
                </div>
              </div>

              <div class="buttons">
                <div class="mainBtn">
                  <button
                    class="btn w-100 text-light fs-5"
                    style="background-color: #0d4dc1"
                    type="submit"
                    :disabled="isLoading"
                  >
                    <div v-if="isLoading">جاري تغيير كلمة المرور...</div>
                    <div v-else class="d-flex align-items-center justify-content-center gap-3">
                      <div class="icon" style="margin-top: 2px">
                        <i class="bi bi-lock fs-4"></i>
                      </div>
                      <div class="text">تغيير كلمة المرور</div>
                    </div>
                  </button>
                </div>

                <hr style="color: #ccc" />

                <div class="d-flex align-items-center justify-content-evenly mb-3">
                  <div class="forgotPassword">
                    <router-link
                      :to="{ name: 'ForgotPassword' }"
                      class="d-flex align-items-center gap-2 text-decoration-none fs-5 fw-bold"
                    >
                      <div class="icon mt-1"><i class="bi bi-pencil"></i></div>
                      <div class="text">تغيير البريد الإلكتروني</div>
                    </router-link>
                  </div>
                  <div class="vr mx-2"></div>
                  <div class="login">
                    <router-link
                      :to="{ name: 'Login' }"
                      class="d-flex align-items-center gap-2 text-decoration-none fs-5 fw-bold"
                    >
                      <div class="icon mt-1"><i class="bi bi-arrow-left"></i></div>
                      <div class="text">العودة الى تسجيل الدخول</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-5 p-0 d-none d-lg-block align-self-stretch">
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
                <div class="title fw-bold fs-5">تغيير كلمة المرور</div>
                <p class="m-0">
                  أدخل رمز الإستعادة وكلمة المرور الجديدة <br />
                  لإعادة تعيين كلمة مرورك.
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
import { forgotPassword, resetPassword } from '@/services/authService'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { toast } from 'vue-sonner'

// Get Email from session storage
const email = ref(sessionStorage.getItem('email'))

// vars to OTPCode
const code = ref(['', '', '', '', '', ''])
const inputs = ref(null)

// Function to go to next input
const nextInp = (index) => {
  code.value[index] = code.value[index].replace(/\D/g, '')

  if (index < 5 && code.value[index]) {
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

const verificationCode = computed(() => code.value.join(''))
const password = ref('')
const confirmPassword = ref('')

// Redend counter
let counter = ref(0)
let coldownCounter = null

// Loading state
const isLoading = ref(false)

const getResetPasswordErrorMessage = (error) => {
  if (!error.response) {
    return 'تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.'
  }

  const status = error.response.status
  const message = error.response.data?.data?.message

  console.log(message)

  if (status === 400) {
    switch (message) {
      case 'Code is not correct':
        return 'رمز الاستعادة غير صحيح. حاول مجدداً.'

      case 'Current code is not valid':
        return 'انتهت صلاحية رمز الاستعادة. اطلب رمزاً جديداً.'

      case 'Your attempts is finished':
        return 'استنفدت محاولات التحقق. يرجى طلب رمز جديد.'

      case 'Invalid reset request':
        return 'طلب الاستعادة غير صالح. يرجى طلب رمز جديد.'

      default:
        return 'يرجى التأكد من صحة البيانات المدخلة.'
    }
  }

  if (status === 429) return 'لقد أجريت محاولات كثيرة. يرجى الانتظار قليلاً.'

  if (status === 503) return 'الخدمة غير متاحة حالياً. حاول لاحقاً.'

  return 'حدث خطأ غير متوقع. حاول لاحقاً.'
}

const resetPasswordFun = async () => {
  if (isLoading.value) return

  if (!/^\d{6}$/.test(verificationCode.value)) {
    return toast.error('يرجى إدخال رمز مكوّن من 6 أرقام.')
  }

  if (password.value.length < 6) {
    return toast.error('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.')
  }

  if (password.value !== confirmPassword.value) {
    return toast.error('كلمتا المرور غير متطابقتين.')
  }

  isLoading.value = true

  try {
    await resetPassword(email.value, verificationCode.value, password.value)

    toast.success('تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.')

    sessionStorage.removeItem('email')

    const result = await router.replace({ name: 'Login' })

    console.log('Navigation result:', result)
    console.log('Current route:', router.currentRoute.value.fullPath)
  } catch (error) {
    toast.error(getResetPasswordErrorMessage(error))
  } finally {
    isLoading.value = false
  }
}

// Define two var to visible ar hidden pass
const isHide1 = ref(true)
const isHide2 = ref(true)

const isResending = ref(false)

// Function to resend code
const resendCode = async () => {
  if (isResending.value || counter.value > 0) return

  isResending.value = true

  try {
    await forgotPassword(email.value)

    toast.success('تم استلام طلبك. إذا كان الحساب مؤهلاً، فسيصلك رمز الاستعادة.')

    counter.value = 60

    clearInterval(coldownCounter)

    coldownCounter = setInterval(() => {
      if (counter.value > 0) {
        counter.value--
      } else {
        clearInterval(coldownCounter)
      }
    }, 1000)
  } catch (error) {
    toast.error(getResetPasswordErrorMessage(error))
  } finally {
    isResending.value = false
  }
}

onMounted(() => {
  if (!email.value) {
    router.replace({ name: 'ForgotPassword' })
  }
})

onUnmounted(() => {
  clearInterval(coldownCounter)
})
</script>

<style lang="scss">
.resetPasswordCard {
  min-height: 600px;
  .imgSide {
    background-image: url('@/assets/resetImg.png');
    background-position: center;
    background-size: cover;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    height: 100%;
  }

  .OTPCodeInputs {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 20px;
    input {
      min-width: 0;
      height: clamp(42px, 7vw, 65px);
    }
  }

  .forgotPassword,
  .login {
    > a {
      @media (max-width: 1200px) {
        font-size: 16px !important;
      }
      @media (max-width: 767px) {
        font-size: 12px !important;
      }
    }
  }

  .header .secondaryTitle {
    @media (max-width: 767px) {
      font-size: 16px !important;
    }
  }
}
</style>
