<template>
  <div
    id="g_id_onload"
    :data-client_id="googleClientId"
    data-callback="handleCredentialResponse"
    data-auto_prompt="false"
  ></div>
  <div class="g_id_signin" data-type="standard"></div>
</template>

<script setup>
// Composables and refs
const user = ref(null)
const config = useRuntimeConfig().public

// Hook to load Google sign-in
onMounted(() => {
  loadGoogleSignIn()
})

// Method to load Google sign-in
const loadGoogleSignIn = () => {
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: config.googleClientId,
      callback: handleCredentialResponse
    })
    window.google.accounts.id.renderButton(
      document.querySelector('.g_id_signin'),
      { theme: 'outline', size: 'large' }
    )
  }
  document.head.appendChild(script)
}

const handleCredentialResponse = response => {
  // Set user token in local storage
  const idToken = response.credential
  localStorage.setItem('userToken', idToken)

  // Parse JWT token and set user data in local storage
  const userData = parseJwt(idToken)
  user.value = userData
  localStorage.setItem('userData', JSON.stringify(userData))

  // Reload the page to update the UI with the new user data
  if (userData) {
    window.location.reload()
  }
}

// Function to parse JWT token
const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
</script>
