<template>
  <div class="auth-box">
    <div v-if="isLogin">
      <img :src="user.photoURL" style="height: 200px">
      <br>
      <p>
        <i class="fas fa-user"></i>
        {{ user.displayName }}
      </p>
      <p>
        <i class="fa fa-envelope"></i>
        {{ user.email }} /
        <i class="fa fa-mobile"></i>
        {{ user.phoneNumber == "" ? phone : "-" }}
      </p>
      <p>
        <i class="fa fa-fingerprint"></i>
        {{ user.uid }}
      </p>
      <hr>
      <button @click="doLogOut" class="social-button" id="logout">Logout</button>
    </div>
    <div v-else>
      <h2>Login</h2>
      <button @click="socialLogin('google')" class="social-button" id="google-connect">
        <span>
          <i class="fab fa-google-plus-g"></i> Connect with Google
        </span>
      </button>
      <button @click="socialLogin('facebook')" class="social-button" id="facebook-connect">
        <span>
          <i class="fab fa-facebook-f"></i> Connect with Facebook
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
const SERVER = 'http://localhost:3000/';

export default {
  name: "LoginComponent",
  props: {
    auth: Boolean
  },
  data() {
    return {
      user: {},
      isLogin: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        if (localStorage.token) {
          this.isLogin = true;
        }
      } else {
        this.user = {};
        this.isLogin = false;
      }
    });
  },
  methods: {
    socialLogin(provider) {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      let providerUse = provider == "google" ? googleProvider : facebookProvider;

      firebase.auth().signInWithPopup(providerUse).then(result => {
          this.user = result;
          this.sendToServer(result.user);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    sendToServer(user) {
      axios.post(SERVER, {uid: user.uid}).then(result => {
        // eslint-disable-next-line
        console.log(result, result.data.success);
        if (result.data.success) {
          localStorage.token = true;
          this.isLogin = true;
        } else {
          // logout firebase
          this.isLogin = false;
          alert("Oops. " + 'Your Data not Valid');
          this.doLogOut();
        }
      })
      .catch((err)=> {
        alert("Oops. " + err.message);
        this.doLogOut();
      });
    },
    doLogOut() {
      firebase.auth().signOut().then(()=>{
        localStorage.token = false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.auth-box {
  background: #fff;
  padding: 20px;
  max-width: 400px;
  margin: 0px auto;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);

  .social-button {
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: left;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;
    width: 100%;
    border-radius: 3px;
    margin: 10px auto;
    text-align: center;
    outline: rgb(255, 255, 255) none 0px;
    transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #facebook-connect {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(60, 90, 154);
  }

  #facebook-connect:hover {
    background: rgb(60, 90, 154);
    -webkit-transition: all 0.8s ease-out;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease-out;
  }

  #facebook-connect span {
    box-sizing: border-box;
    color: rgb(60, 90, 154);
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    border: 0px none rgb(255, 255, 255);
    outline: rgb(255, 255, 255) none 0px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #facebook-connect:hover span {
    color: #fff;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #google-connect {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(220, 74, 61);
  }

  #google-connect:hover {
    background: rgb(220, 74, 61);
    -webkit-transition: all 0.8s ease-out;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease-out;
  }

  #google-connect span {
    box-sizing: border-box;
    color: rgb(220, 74, 61);
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    border: 0px none rgb(220, 74, 61);
    outline: rgb(255, 255, 255) none 0px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #google-connect:hover span {
    color: #fff;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #logout {
    background: rgb(255, 255, 255);
    border: 1px solid black;
    color: black;
  }

  #logout:hover {
    background: black;
    -webkit-transition: all 0.8s ease-out;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease-out;
    color: white;
  }

  #logout span {
    box-sizing: border-box;
    color: black !important;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    border: 0px none black;
    outline: rgb(255, 255, 255) none 0px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  #logout:hover span {
    color: #fff;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
}

.auth-box:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
