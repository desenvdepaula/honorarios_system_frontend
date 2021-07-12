<template>
<<<<<<< HEAD
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

=======
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>
>>>>>>> 9699c53577df4f8cbd724cdf0805685ed959b7fe
