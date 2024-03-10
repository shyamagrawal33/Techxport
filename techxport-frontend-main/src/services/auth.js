const AuthService = {}

// AuthService.register = (name, email, password) => {
//   //   const fauth = getAuth();
//   //   return new Promise((resolve, reject) => {
//   //     createUserWithEmailAndPassword(fauth, email, password)
//   //       .then((userCredential) => {
//   //         updateProfile(fauth.currentUser, {
//   //           displayName: name
//   //         }).then(() => {
//   //           resolve({ status: true, message: "Register successfully." });
//   //         }).catch((error) => {
//   //           resolve({ status: false, message: "error.message" });
//   //         });
//   //       })
//   //       .catch((error) => {
//   //         let message = "Something Went Wrong."
//   //         if(error && error.code && error.code == "auth/email-already-in-use"){
//   //           message = "Email already used.";
//   //         }
//   //         resolve({ status: false, message: message });
//   //       });
//   //   });
// }

AuthService.isLoggedIn = false
// AuthService.getProfile = (hard = false) => {
//     return new Promise(async (res, rej) => {

//         const fauth = getAuth();

//         await fauth.onAuthStateChanged((user) => {
//             if (user) {
//                 res(user);
//             } else {
//                 res(false);
//             }
//         });

//     });
// }

// AuthService.logout = async () => {
//     return new Promise((resolve) => {
//       const fauth = getAuth();
//       fauth.signOut().then(() => {
//         resolve({ status: true, message: "Logged out successfully." });;
//       }).catch(err => {
//         resolve({ status: true, message: "Logged out successfully." });
//       });
//     })
//   }

AuthService.authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken || 'abcde' }
  } else {
    return {}
  }
}
AuthService.logout = () => {
  localStorage.removeItem('user')
}
AuthService.getUser = () => {
  return localStorage.getItem('user')
}
export default AuthService
