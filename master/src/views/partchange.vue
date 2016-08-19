<template>
    <div>
        部门业务机会{{$route.params.id}}
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
           
        }
    },
  route: {
  data ({ to: { params: { id }}}) {
  	console.log(id);
    // return Promise.all([
    //   userService.get(userId),
    //   postsService.getForUser(userId)
    // ]).then(([user, post]) => ({ user, post }))
  }
}
}
</script>
<style scoped>
/* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
 }  */

#app {
    color: #2c3e50;
    max-width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: left;
}

#app a {
    color: #42b983;
    text-decoration: none;
}

.logo {
    width: 100px;
    height: 100px
}
</style>
