<template>
    <div class="form-group">
        <label for="role" class="form-label">Login as</label>
        <select v-model="status" id="role" class="form-select">
          <option selected>Choose...</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>
      </div>
</template>

<script>
export default{
    data(){
        return{
            status:'',
        }
    },
}
</script>



<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
</style>