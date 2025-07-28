<template>
  <div class="text-center mt-16">
    <v-progress-circular indeterminate color="primary" size="64" />
    <div class="mt-4">Redirecting...</div>
  </div>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$auth.handleCallback()
      this.$router.push('/')
    } catch (err) {
      console.error('Auth callback error:', err)
      this.$router.push('/auth/signin')
    }
  }
}
</script>
