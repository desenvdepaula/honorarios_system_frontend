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

                        <v-col cols="12" md="9">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="PESQUISAR POR EMPRESA OU ESCRITÓRIO"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                           <v-speed-dial
                            fab
                            direction="right"
                            open-on-hover
                            class="ml-14 mb-2"
                            transition="slide-y-reverse-transition"
                          >
                            <!-- eslint-disable-next-line -->
                            <template v-slot:activator>
                              <v-btn
                                color="blue darken-2"
                                dark
                                fab
                              >
                                <v-icon>
                                  mdi-plus
                                </v-icon>
                              </v-btn>
                            </template>
                            <v-tooltip v-model="show" bottom>
                                <!-- eslint-disable-next-line -->
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    fab
                                    class="white--text"
                                    color="teal"
                                    small
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="openDialogHonorario"
                                  >
                                    <v-icon>mdi-plus-box-multiple</v-icon>
                                  </v-btn>
                                </template>
                                <span>Cadastrar Honorários</span>
                            </v-tooltip>
                            <v-tooltip v-model="show1" bottom>
                                <!-- eslint-disable-next-line -->
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    fab
                                    class="white--text"
                                    color="indigo"
                                    small
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="$router.push('/empresa/')"
                                  >
                                    <v-icon>mdi-office-building</v-icon>
                                  </v-btn>
                                </template>
                                <span>Empresas</span>
                            </v-tooltip>
                            <v-tooltip v-model="show2" bottom>
                                <!-- eslint-disable-next-line -->
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    fab
                                    class="white--text"
                                    color="blue"
                                    small
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="$router.push('/regra/')"
                                  >
                                    <v-icon>mdi-book-check-outline</v-icon>
                                  </v-btn>
                                </template>
                                <span>Regras</span>
                            </v-tooltip>
                          </v-speed-dial>


                        </v-col>

                      </v-row>
                      <v-data-table
                          :headers="headers"
                          :items="honorarios"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          class="elevation-3 black--text"
                          :search="search"
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
                                    <span class="text-h5">{{ formTitle }}</span>
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
                                      {{formTitle}}
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>

                              <v-dialog
                                v-model="dialog"
                                max-width="900px"
                              >
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5 black--text">DADOS DO CONTRATO</span>
                                  </v-card-title>
                                  <v-divider inset></v-divider>
                                  <v-spacer></v-spacer>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>

                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Empresa:</strong>  {{ full.nome }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Escritório:</strong>  {{ editedItem.escritorio }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">REGRA:</strong>  {{ full.regra }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Documento:</strong>  {{ lastContrato.documento }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Data de Contrato:</strong>  {{ dt_contrato | date }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Data de Vigência:</strong>  {{ dt_vigencia | date }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Valor do Honorário:</strong>  {{ lastContrato.vl_honorario }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Número de Funcionários:</strong>  {{ lastContrato.nr_funcionarios }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Valor por Funcionário:</strong>  {{ lastContrato.vl_por_funcionario }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Valor por Funcionário Secundário:</strong>  {{ lastContrato.vl_por_funcionario_secundario }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <p class="text-h6"><strong class="text-h6 black--text">Índice de Reajuste:</strong>  {{ lastContrato.indice_reajuste }}</p>
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
                              v-if="item.contratos.length == 0"
                              medium
                              color="#DDD"
                              class="mr-5"
                            >
                              mdi-clipboard-text
                            </v-icon>
                            <v-icon
                              v-else
                              medium
                              class="mr-5 blue--text"
                              @click="viewItem(item)"
                            >
                              mdi-clipboard-text
                            </v-icon>
                            <v-icon
                              medium
                              class="mr-5 teal--text"
                              @click="$router.push('/honorario/' + item.id)"
                            >
                              mdi-eye
                            </v-icon>
                            <v-icon
                              medium
                              class="mr-5 blue--text"
                              @click="editItem(item)"
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
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogNewHonorario: false,
      show: false,
      show1: false,
      show2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: 'Empresa',
          align: 'start',
          value: 'empresa_honorario.nome',
          class: 'color black--text text-md-h5'
        },
        { text: 'Escritório', value: 'escritorio', class: 'color black--text text-md-h6'},
        { text: 'Ações', value: 'actions', sortable: false, class: 'color black--text text-md-h6'},
      ],
      honorarios: [],
      editedIndex: -1,
      lastContrato: {},
      newHonorario: {
        empresa: '',
        escritorio: null,
      },
      editedItem: {
        empresa: '',
        escritorio: null,
      },
      defaultItem: {
        empresa: '',
        escritorio: null,
      },
      full: {},
      dt_vigencia: '',
      dt_contrato: '',
    }),
    computed: {
      loadedHonorarios(){
        return this.$store.getters.loadedHonorarios
      },
      formTitle () {
        return this.editedIndex === -1 ? 'CADASTRAR HONORÁRIO' : 'EDITAR HONORÁRIO'
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
        this.honorarios = this.loadedHonorarios;
      },
      openDialogHonorario() {
        this.dialogNewHonorario = true
      },

      addHonorario() {
        if(this.editedIndex === -1){
          this.$store.dispatch('addHonorario', this.newHonorario).then(() => {
            this.close()
          });
        }else{
          this.$store.dispatch('editHonorario', {
            honorario: this.newHonorario,
            id: this.editedItem.id,
          }).then(() => {
            this.close()
          });
        }
      },


      viewItem (item) {
        this.editedIndex = this.honorarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        const contratos = this.editedItem.contratos
        this.lastContrato = contratos[contratos.length - 1]
        this.dt_contrato = this.lastContrato.dt_contrato
        this.dt_vigencia = this.lastContrato.dt_vigencia
        this.full.regra = this.lastContrato.regra_contrato.regra
        this.full.nome = this.editedItem.empresa_honorario.nome
        this.dialog = true
      },

      editItem (item) {
        this.editedIndex = this.honorarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogNewHonorario = true
        this.newHonorario.empresa = this.editedItem.empresa_honorario.id
        this.newHonorario.escritorio = this.editedItem.escritorio
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
          this.full = {}
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

 .home-page .v-speed-dial {
    position: absolute;
  }

  .home-page .v-btn--floating {
    position: relative;
  }
</style>
