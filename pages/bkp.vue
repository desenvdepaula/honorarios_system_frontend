<template>
  <v-card flat>
    <v-toolbar
      color="primary"
      dark
      extended
      flat
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-row justify="center"> 
        <v-card
          class="mx-auto"
          width="700"
          style="margin-top: -64px;"
        >
          <v-toolbar flat>
            <v-toolbar-title class="grey--text">
              Title
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text style="height: 200px;"></v-card-text>
        </v-card>
      </v-row>
    </v-container>

  </v-card>
</template>