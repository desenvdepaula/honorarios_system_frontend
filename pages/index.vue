<template>
  <div class="home-page">
    <section class="intro">
      <h1 class="">HONORÁRIOS</h1>
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
                        <v-icon>mdi-calendar-range</v-icon>

                        <v-col cols="12" md="2">
                            <v-tooltip v-model="show" bottom>
                                <!-- eslint-disable-next-line -->
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    class="ml-10 white--text"
                                    color="teal"
                                    fab
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="$router.push('/honorario')"
                                  >
                                    <v-icon>mdi-plus-box-multiple</v-icon>
                                  </v-btn>
                                </template>
                                <span>Cadastrar Honorários</span>
                            </v-tooltip>
                        </v-col>

                        <v-col cols="12" md="1">
                            <v-btn fab>
                              <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </v-col>

                      </v-row>
                      <v-data-table
                          :headers="headers"
                          :items="desserts"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          class="elevation-3 black--text"
                          @page-count="pageCount = $event"
                        >
                        <!-- eslint-disable-next-line -->
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-dialog
                                v-model="dialog"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h6">DADOS DO CONTRATO</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                        >
                                          <v-text-field
                                            v-model="editedItem.name"
                                            label="Dessert name"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                        >
                                          <v-text-field
                                            v-model="editedItem.calories"
                                            label="Calories"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                        >
                                          <v-text-field
                                            v-model="editedItem.fat"
                                            label="Fat (g)"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                        >
                                          <v-text-field
                                            v-model="editedItem.carbs"
                                            label="Carbs (g)"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                        >
                                          <v-text-field
                                            v-model="editedItem.protein"
                                            label="Protein (g)"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1 white--text"
                                      @click="close"
                                    >
                                      OK
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDelete" max-width="600px">
                                <v-card>
                                  <v-card-title class="text-h5">Tem certeza de que deseja excluir este Honorário?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                          </template>
                          <!-- eslint-disable-next-line -->
                          <template v-slot:item.actions="{ item }">

                            <v-icon
                              medium
                              class="mr-3 blue--text"
                              @click="viewItem(item)"
                            >
                              mdi-clipboard-text
                            </v-icon>
                            <v-icon
                              medium
                              class="mr-3 teal--text"
                              @click="$router.push('/honorario/id')"
                            >
                              mdi-eye
                            </v-icon>
                            <v-icon
                              medium
                              class="mr-3 blue--text"
                              @click="$router.push('/honorario')"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              medium
                              class="red--text"
                              @click="deleteItem(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>

                        <div class="text-center pt-2">
                          <v-pagination
                            v-model="page"
                            :length="pageCount"
                          ></v-pagination>

                            <p class="text-right indigo--text">
                              Total de Honorários - ({{ desserts.length }})
                            </p>

                          <v-text-field
                            :value="itemsPerPage"
                            label="ITENS POR PÁGINAS"
                            type="number"
                            min="-1"
                            max="15"
                            @input="itemsPerPage = parseInt($event, 10)"
                          ></v-text-field>
                        </div>
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
  data: () => ({
      dialog: false,
      dialogDelete: false,
      show: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Empresa',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'color black--text text-md-h5'
        },
        { text: 'Escritório', value: 'calories', class: 'color black--text text-md-h6'},
        { text: 'Data', value: 'fat', class: 'color black--text text-md-h6'},
        { text: 'Regra', value: 'carbs', class: 'color black--text text-md-h6'},
        { text: 'Ações', value: 'actions', sortable: false, class: 'color black--text text-md-h6'},
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      viewItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.unshift(this.editedItem)
        }
        this.close()
      },
    },
}
</script>

<style scoped>
  .intro {
    height: 925px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-image: linear-gradient(rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.835)), url(https://www.nawpic.com/media/2020/mountain-nawpic-9.jpg);
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
</style>