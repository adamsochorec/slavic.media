import { ref, provide, inject } from "vue";
import { useRouter } from "vue-router";

const isAuthenticatedSymbol = Symbol();

export function provideAuth() {
  const isAuthenticated = ref(false);

  const router = useRouter();

  const logIn = async () => {
    try {
      localStorage.setItem("user", "admin");
      isAuthenticated.value = true;
      console.log("User is logged in");
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("lsToken"); // removes token from local storage after user is being loged out / ends session
      isAuthenticated.value = false;
      console.log("User is logged out");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  provide(isAuthenticatedSymbol, {
    isAuthenticated,
    logIn,
    logOut,
  });
}

export function useAuth() {
  const auth = inject(isAuthenticatedSymbol);
  if (!auth) {
    throw new Error("No auth provided");
  }
  return auth;
}

// export default function useUsers() {

//   const router = useRouter()
//   const isAuthenticated = ref(false)

//   const logIn = async () => {
//     try {
//       localStorage.setItem('user', 'admin')
//       isAuthenticated.value = true
//       console.log("User is logged in")
//     }
//     catch(error) {
//       console.error(error)
//     }
//   }

//   const logOut = async () => {
//     try {
//       localStorage.removeItem('user')
//       isAuthenticated.value = false
//       console.log("User is logged out")
//       router.push('/')
//     }
//     catch(error)
//     {
//       console.error(error)
//     }
//   }

//   return {
//     isAuthenticated,
//     logIn,
//     logOut
//   }
// }
