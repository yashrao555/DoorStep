<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark">
      <a class="navbar-brand" href="/">DoorStep</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link navbar-brand" href="/register"
              >Register</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link navbar-brand" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  background: #ffa500;
}
</style>
