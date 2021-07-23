<template>
  <div class="empresas">
    <section class="intro">
      <nuxt-link to="/" class="text-decoration-none">
        <h1>HONORÁRIOS</h1>
      </nuxt-link>
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
                              label="PESQUISAR EMPRESAS"
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
                                      @click="openDialogEmpresa"
                                    >
                                      <v-icon>mdi-plus-box-multiple</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Cadastrar Empresas</span>
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
                                      @click="$router.push('/regra/')"
                                    >
                                      <v-icon>mdi-book-check-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Regras</span>
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
                                      @click="$router.push('/')"
                                    >
                                      <v-icon>mdi-home</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Home</span>
                              </v-tooltip>
                            </v-speed-dial>


                          </v-col>

                        </v-row>

                        <v-data-table
                          :headers="headers"
                          :items="empresas"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          class="table elevation-6"
                          :search="search"
                          @page-count="pageCount = $event">
                            <!-- eslint-disable-next-line -->
                            <template v-slot:top>
                            <v-dialog
                                v-model="dialogNew"
                                max-width="550px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h6">{{ formTitle }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newEmpresa.codigo"
                                            type="number"
                                            label="Código da Empresa"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newEmpresa.nome"
                                            label="Nome da Empresa"
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
                                        @click="addEmpresa"
                                      >
                                        {{formTitle}}
                                      </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDelete" max-width="600px">
                                <v-card>
                                  <v-card-title class="text-h5">Tem certeza de que deseja excluir esta Empresa?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>

                              <v-dialog
                                v-model="dialog"
                                max-width="600px"
                              >
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5 black--text">DADOS DA EMPRESA</span>
                                  </v-card-title>
                                  <v-divider inset></v-divider>
                                  <v-spacer></v-spacer>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                          <p class="text-h6"><strong class="text-h6 black--text">Código da Empresa:</strong>  {{ newEmpresa.codigo }}</p>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                          <p class="text-h6"><strong class="text-h6 black--text">NOME:</strong>  {{ newEmpresa.nome }}</p>
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
                            </template>

                            <!-- eslint-disable-next-line -->
                            <template v-slot:item.actions="{ item }">

                            <v-icon
                              medium
                              class="mr-4 teal--text"
                              @click="viewItem(item)"
                            >
                              mdi-eye
                            </v-icon>
                            <v-icon
                              medium
                              class="mr-3 blue--text"
                              @click="editItem(item)">
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              medium
                              class="red--text"
                              @click="deleteItem(item)">
                              mdi-trash-can
                            </v-icon>
                            </template>
                        </v-data-table>

                        <div class="text-center pt-2">
                          <v-pagination
                            v-model="page"
                            :length="pageCount"
                          ></v-pagination>

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
  name: 'Empresas',
  asyncData(context){
     return context.app.$axios.$get('/empresa/')
        .then(data => {
          return {
            empresa: data,
          }
        })
        .catch(e => context.error(e))
  },
  data: () => ({
      search: '',
      dialog: false,
      dialogNew: false,
      dialogDelete: false,
      show: false,
      show1: false,
      show2: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: 'CÓDIGO DA EMPRESA', align: 'center', value: 'codigo', class: 'dark-text text-md-h6' },
        { text: 'NOME DA EMPRESA', align: 'center', value: 'nome', class: 'dark-text text-md-h6'},
        { text: 'AÇÕES', align: 'center', value: 'actions', sortable: false, class: 'dark-text text-md-h6'},
      ],
      editedIndex: -1,
      newEmpresa: {
        codigo: null,
        nome: '',
      },
      editedItem: {
        codigo: null,
        nome: '',
      },
      defaultItem: {
        codigo: null,
        nome: '',
      },
    }),

    computed: {
      empresas () {
        return this.empresa
      },
      formTitle () {
        return this.editedIndex === -1 ? 'CADASTRAR EMPRESA' : 'EDITAR EMPRESA'
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

    methods: {

      openDialogEmpresa() {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.show= false
          this.show1= false
          this.show2= false
        })
        this.dialogNew = true
      },

      addEmpresa() {
        if(this.editedIndex === -1){
          try{
            this.$axios.$post('/empresa/', {
              codigo: parseFloat(this.newEmpresa.codigo),
              nome: this.newEmpresa.nome
            })
              .then(data => {
                this.empresas.push(data)
                this.$toast.success('Cadastro Efetuado com Sucesso')
                this.close()
              }).catch(e => this.$toast.error(`Error ${e}`))
          }catch(err){
            this.$toast.error(err)
            this.close()
          }
        }else{
          try{
            this.$axios.$put('/empresa/' + this.editedItem.id + '/', this.newEmpresa)
              .then(data => {
                this.empresas.splice(this.editedIndex, 1, data)
                this.$toast.success('Edição Efetuado com Sucesso')
                this.close()
              }).catch(e => this.$toast.error(`Error ${e}`))
          }catch(err){
            this.$toast.error(err)
            this.close()
          }
        }
      },

      editItem (item) {
        this.editedIndex = this.empresas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogNew = true
        this.newEmpresa.codigo = parseFloat(this.editedItem.codigo)
        this.newEmpresa.nome = this.editedItem.nome
      },

      viewItem (item) {
        this.newEmpresa = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.empresas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        try{
          this.$axios.$delete('/empresa/' + this.editedItem.id)
            .then(() => {
              this.empresas.splice(this.editedIndex, 1)
              this.$toast.success('Removido com Sucesso')
              this.closeDelete()
            }).catch(e => this.$toast.error(`Error ${e}`))
        }catch(err){
          this.$toast.error(err)
          this.closeDelete()
        }
      },

      close () {
        this.dialog = false
        this.dialogNew = false
        this.show = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.newEmpresa = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.show= false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.newEmpresa = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
}
</script>

<style>

    .intro {
        height: 600px;
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
        margin-top: 10%;
        color: rgba(253, 253, 253, 0.63);
        padding: 10px;
    }

    .table thead tr:first-child{ background-color: #F8F9FA;}
    .table tr{ background-color: #CED4DA; }
    .table tr:nth-child(even){ background-color: #F8F9FA; }
    .table tr td{ font-size: 22px; font-weight: bold; color: #717070; }

    .custom-text{ font-size: 22px; font-weight: bold;}

    .dark-text{ color: #575757;}
    .light-text{ color: #848484; }

  .empresas .v-speed-dial {
    position: absolute;
  }

  .empresas .v-btn--floating {
    position: relative;
  }
</style>
