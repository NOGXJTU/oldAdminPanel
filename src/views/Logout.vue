<script>
import types from '../store/types'
export default {
  methods: {
    logout() {
      this.$http.put('/user/signOut').then((res) => {
        this.$store.commit(types.SET_AUTH, {})
        this.$router.replace({ name: 'login' })
      });
    }
  },
  mounted() {
    this.logout()
  }
}
</script>
