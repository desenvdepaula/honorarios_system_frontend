<template>
  <div class="home-page">
    <section class="intro">
      <h1>HONORÁRIOS</h1>
    </section>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card elevation="7" class="rounded-lg" style="margin-top: -150px; padding: 40px;">
                  <v-container>
                      <v-row>

                        <v-col cols="12" md="3">
                          <v-text-field
                            label="EMPRESA:"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            label="ESCRITÓRIO:"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2">
                          <v-text-field
                            label="DATA DE CADASTRO:"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2">
                          <div class="text-center">
                            <v-btn
                              class="ma-2 white--text"
                              color="#5C7CFA"
                            >
                              Cadastrar
                            </v-btn>
                          </div>
                        </v-col>

                        <v-col cols="12" md="2">
                          <div class="text-center">
                              <v-btn
                                class="ma-2 white--text"
                                color="red lighten-1"
                                 @click="$router.push('/')"
                              >
                                Cancelar
                              </v-btn>
                          </div>
                        </v-col>

                      </v-row>
                  </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>


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
    height: 400px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.900)), url(https://static3.depositphotos.com/1003352/170/i/600/depositphotos_1703463-stock-photo-mountain-lake.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

  .intro h1 {
    text-align: left;
    font-family: 'Yellowtail', cursive;
    font-size: 2rem;
    color: rgba(253, 253, 253, 0.63);
    margin-left: 40px;
    padding: 10px;
  }

</style>
