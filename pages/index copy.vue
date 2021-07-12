<template>
  <div class="home-page">
    <section class="intro">
      <h1 class="">HONORÁRIOS</h1>
    </section>
  </div>
</template>

<script>

export default{
  name: 'Home',
  layout: 'init',
}
</script>

<style scoped>

  .intro {
    height: 925px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(https://www.nawpic.com/media/2020/mountain-nawpic-9.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

  .intro h1 {
    text-align: center;
    font-family: 'Yellowtail', cursive;
    font-size: 3rem;
    margin-top: 20%;
    color: rgba(253, 253, 253, 0.63);
    padding: 10px;
  }

  /* @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  } */
</style>

