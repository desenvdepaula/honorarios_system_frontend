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
                                    @click="openDialogHonorario"
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
                          :items="honorarios"
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
                                v-model="dialogNewHonorario"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">Cadastro de Novo Honorário</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>

                                        <v-col cols="12">
                                          <v-select
                                            v-model="newHonorario.empresa"
                                            label="EMPRESA"
                                            :items="loadedEmpresas"
                                            item-text="nome"
                                            item-value="id"
                                            required
                                            clearable
                                          ></v-select>
                                        </v-col>

                                        <v-col cols="12">
                                          <v-text-field
                                            v-model="newHonorario.escritorio"
                                            label="NÚMERO DO ESCRITÓRIO"
                                            type="number"
                                          ></v-text-field>
                                        </v-col>

                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="red lighten-1 white--text"
                                      @click="close"
                                    >
                                      cancelar
                                    </v-btn>
                                    <v-btn
                                      color="#5C7CFA"
                                      class="white--text"
                                      @click="addHonorario"
                                    >
                                      Cadastrar Honorário
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>

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

                                        <v-col cols="12" sm="6" md="4">
                                          <p>Empresa: {{ editedItem.empresa }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <p>Empresa: {{ editedItem.empresa }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <p>Empresa: {{ editedItem.empresa }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <p>Empresa: {{ editedItem.empresa }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <p>Empresa: {{ editedItem.empresa }}</p>
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
                              Total de Honorários - ({{ honorarios.length }})
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
  asyncData(context){
    return context.app.$axios.$get('/empresa/')
      .then(data => {
        return {
          loadedEmpresas: data
        }
      })
      .catch(e => context.error(e));
  },
  data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogNewHonorario: false,
      show: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Empresa',
          align: 'start',
          sortable: false,
          value: 'empresa_honorario.nome',
          class: 'color black--text text-md-h5'
        },
        { text: 'Escritório', value: 'escritorio', class: 'color black--text text-md-h6'},
        { text: 'Ações', value: 'actions', sortable: false, class: 'color black--text text-md-h6'},
      ],
      honorarios: [],
      editedIndex: -1,
      lastContrato: {},
      newHonorario: {},
      editedItem: {
        empresa: '',
        escritorio: 0,
      },
      defaultItem: {
        empresa: '',
        escritorio: 0,
      },
    }),
    computed: {
      loadedHonorarios(){
        return this.$store.getters.loadedHonorarios
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
      initialize(){
        this.honorarios = this.loadedHonorarios
      },
      openDialogHonorario() {
        this.dialogNewHonorario = true
      },

      addHonorario() {
        this.$store.dispatch('addHonorario', this.newHonorario).then(() => {
          this.close()
        });

      },
      viewItem (item) {
        this.editedIndex = this.honorarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        const contratos = this.editedItem.contratos
        this.lastContrato = contratos[contratos.length - 1]
      },
      deleteItem (item) {
        this.editedIndex = this.honorarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.$store.dispatch('removeHonorario', {
          honorario: this.editedItem,
          index: this.editedIndex
        }).then(() => {
            console.log('Removido com sucesso')
            this.closeDelete()
          });
      },
      close () {
        this.dialog = false
        this.dialogNewHonorario = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.newHonorario = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.lastContrato = {}
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
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
