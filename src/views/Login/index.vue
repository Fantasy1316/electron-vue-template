<template>
  <div class="container">
    <div class="login">
      <div class="login-menu" v-if="loginMenuShow">
        <i
          class="iconfont icon-window-min_line"
          @click="handleLoginPageEvent('setMinimizable')"
        ></i>
        <i
          class="iconfont icon-guanbi1"
          @click="handleLoginPageEvent('quit')"
        ></i>
      </div>
      <div class="login-icon">
        <img
          src="../../assets/images/icon-2.png"
          alt=""
          class="login-icon--icon"
          ondragstart="return false;"
        />
      </div>
      <p class="login-title web-font">视频监控平台</p>
      <div class="login-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0"
        >
          <el-form-item prop="pass">
            <el-input
              type="text"
              v-model="ruleForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="el-form-item--psw">
            <el-input
              type="password"
              v-model="ruleForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div class="el-form-check">
            <div class="el-form-check--item">
              <el-checkbox v-model="ruleForm.remberPsw">记住密码</el-checkbox>
            </div>
            <div class="el-form-check--item">
              <el-checkbox v-model="ruleForm.autoLogin">自动登录</el-checkbox>
            </div>
          </div>
          <el-form-item>
            <el-button
              class="login-form--btn web-font"
              type="primary"
              round
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        remberPsw: false,
        autoLogin: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 32,
            message: '长度在 6 到 32 个字符',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      loginMenuShow: false
    }
  },
  created() {
    console.log(process.platform)
    console.log(/win/.test(process.platform))
    this.loginMenuShow = /(win32|win64)/.test(process.platform)
  },
  methods: {
    // 登录
    handleLogin() {
      this.loading = !this.loading
      this.$store.commit('isLogin', true)
      this.handleLoginPageEvent('login')
    },
    // 向主进程发送事件
    handleLoginPageEvent(event) {
      console.log(event)
      ipcRenderer.send(event)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include container(#fff);
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 400px;
    height: 500px;

    .login-menu {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 14px 16px;
      box-sizing: border-box;

      .iconfont {
        padding: 4px;
        margin-left: 10px;
        font-size: 18px;

        &:hover {
          cursor: pointer;
          background-color: #f8f8f8;
        }
      }
    }

    .login-icon {
      display: flex;
      justify-content: center;
      margin: 80px 0 20px;

      &--icon {
        width: 100px;
        height: 100px;
        user-select: none;
      }
    }

    .login-title {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      text-align: center;
      letter-spacing: 2px;
      user-select: none;
    }

    .login-form {
      margin: 40px 70px 0;

      .el-form-item--psw {
        margin-bottom: 0;
      }

      .el-form-check {
        display: flex;
        justify-content: space-between;
        margin: 10px 2px;

        .el-checkbox {
          color: #ccc;
        }
      }

      &--btn {
        width: 100%;
        padding: 9px 0;
        font-size: 18px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
