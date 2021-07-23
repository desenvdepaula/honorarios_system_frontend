<template>
  <div class="home-page">
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
                            <v-col>
                                <h2 class="text-left ml-10 mb-8 dark-text">EMPRESA</h2>
                                <p><strong  class="dark-text">NOME: </strong>  <span class="light-text">{{ honorario.empresa_honorario.nome }}</span></p>
                                <p><strong  class="dark-text">CÓDIGO DA EMPRESA: </strong>  <span class="light-text">{{ honorario.empresa_honorario.codigo }}</span></p>
                            </v-col>
                            <v-col v-if="show">
                                <h2 class="text-left ml-10 mb-8 dark-text">CONTRATO</h2>
                                <p><strong  class="dark-text">DATA DE CONTRATO:</strong>  <span class="light-text"> {{ editedItem.dt_contrato | date }}</span></p>
                                <p><strong  class="dark-text">DATA DE VIGÊNCIA:</strong>  <span class="light-text"> {{ editedItem.dt_vigencia | date }}</span></p>
                                <p><strong  class="dark-text">DOCUMENTO:</strong>  <span class="light-text"> {{ editedItem.documento }}</span></p>
                                <p><strong  class="dark-text">VALOR DO HONORÁRIO:</strong>  <span class="light-text"> {{ editedItem.vl_honorario }}</span></p>
                                <p><strong  class="dark-text">NÚMERO DE FUNCIONÁRIOS:</strong>  <span class="light-text"> {{ editedItem.nr_funcionarios }}</span></p>
                                <p><strong  class="dark-text">VALOR POR FUNCIONÁRIO:</strong>  <span class="light-text"> {{ editedItem.vl_por_funcionario }}</span></p>
                                <p><strong  class="dark-text">VALOR POR FUNCIONÁRIO SECUNDÁRIO:</strong>  <span class="light-text"> {{ editedItem.vl_por_funcionario_secundario }}</span></p>
                                <p><strong  class="dark-text">ÍNDICE DE REAJUSTE:</strong>  <span class="light-text"> {{ editedItem.indice_reajuste }}</span></p>
                                <p><strong  class="dark-text">REGRA:</strong>  <span class="light-text"> {{ editedItem.regra_contrato.regra }}</span></p>
                            </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="4" md="4" class="mb-5">
                            <v-btn color="primary" elevation="2"> RELATÓRIO <v-icon>mdi-file-pdf</v-icon> </v-btn>
                            <v-btn color="blue lighten-1" elevation="2" class=" ml-3 white--text" @click="openDialog"> ADICIONAR CONTRATO <v-icon class="ml-2">mdi-text-box-plus</v-icon> </v-btn>
                          </v-col>
                        </v-row>

                        <v-data-table
                          :headers="headers"
                          :items="contratos"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          class="table elevation-6"
                          @page-count="pageCount = $event">
                            <!-- eslint-disable-next-line -->
                            <template v-slot:top>
                            <v-dialog
                                v-model="dialog"
                                max-width="700px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h6">{{ formTitle }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-file-input
                                            v-model="newContrato.documento"
                                            counter
                                            show-size
                                            truncate-length="50"
                                            label="Documento:"
                                          ></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato._dtContrato"
                                            v-mask="'##/##/####'"
                                            label="Data de Contrato:"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato._dtVigencia"
                                            v-mask="'##/##/####'"
                                            label="Data de Vigência:"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato.indice_reajuste"
                                            label="Índice de Reajuste:"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato.nr_funcionarios"
                                            label="Número de Funcionários:"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" >
                                          <v-select
                                            v-model="newContrato.regra"
                                            label="REGRA"
                                            :items="regras"
                                            item-text="regra"
                                            item-value="id"
                                            required
                                            clearable
                                          ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato.vl_honorario"
                                            label="Valor do Honorário:"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato.vl_por_funcionario"
                                            label="Valor do Honorário por Funcionário"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field
                                            v-model="newContrato.vl_por_funcionario_secundario"
                                            label="Valor do Honorário por Funcionário Secundário"
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
                                        @click="addContrato"
                                      >
                                        {{formTitle}}
                                      </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDelete" max-width="600px">
                                <v-card>
                                  <v-card-title class="text-h5">Tem certeza de que deseja excluir este Contrato?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
                                    <v-spacer></v-spacer>
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
  name: 'Honorario',
  async asyncData(context){
    return{
      getContratos: await context.app.$axios.$get('/honorario/' + context.params.id)
        .then(data => {
          return {
            honorario: data,
            contratos: data.contratos.reverse(),
            idHonorario: context.params.id,
          }
        })
        .catch(e => context.error(e)),

      getRegras: await context.app.$axios.$get('/regra/')
        .then(data => {
          return {
            regras: data,
          }
        })
        .catch(e => context.error(e))
    }
  },
  data: () => ({
      dialog: false,
      dialogDelete: false,
      show: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: 'DATA', align: 'center', value: 'dt_contrato', class: 'dark-text text-md-h6' },
        { text: 'LIMITE FUNCIONÁRIOS', align: 'center', value: 'nr_funcionarios', class: 'dark-text text-md-h6'},
        { text: 'VALOR', align: 'center', value: 'vl_honorario', class: 'dark-text text-md-h6'},
        { text: 'REGRA', align: 'center', value: 'regra_contrato.regra', class: 'dark-text text-md-h6'},
        { text: 'AÇÕES', align: 'center', value: 'actions', sortable: false, class: 'dark-text text-md-h6'},
      ],
      editedIndex: -1,
      newContrato: {
        _dtContrato: '',
        _dtVigencia: '',
        documento: null,
        honorario: '',
        dt_contrato: '',
        dt_vigencia: '',
        vl_honorario: null,
        nr_funcionarios: null,
        vl_por_funcionario: null,
        vl_por_funcionario_secundario: null,
        indice_reajuste: null,
        regra: ''
      },
      editedItem: {
        _dtContrato: '',
        _dtVigencia: '',
        documento: null,
        honorario: '',
        dt_contrato: '',
        dt_vigencia: '',
        vl_honorario: null,
        nr_funcionarios: null,
        vl_por_funcionario: null,
        vl_por_funcionario_secundario: null,
        indice_reajuste: null,
        regra_contrato: {
          codigo_regra: null,
          regra: '',
          descricao: '',
          id: ''
        }
      },
      defaultItem: {
        _dtContrato: '',
        _dtVigencia: '',
        documento: null,
        honorario: '',
        dt_contrato: '',
        dt_vigencia: '',
        vl_honorario: null,
        nr_funcionarios: null,
        vl_por_funcionario: null,
        vl_por_funcionario_secundario: null,
        indice_reajuste: null,
        regra_contrato: {
          codigo_regra: null,
          regra: '',
          descricao: '',
          id: ''
        }
      },
    }),

    computed: {
      regras () {
        return this.getRegras.regras
      },
      contratos () {
        return this.getContratos.contratos
      },
      honorario () {
        return this.getContratos.honorario
      },
      idHonorario () {
        return this.getContratos.idHonorario
      },
      formTitle () {
        return this.editedIndex === -1 ? 'CADASTRAR CONTRATO' : 'EDITAR CONTRATO'
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
      toTop () {
        this.$vuetify.goTo(300)
      },

      openDialog() {
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.show= false
        })
        this.dialog = true
      },

      addContrato() {
        this.newContrato.dt_contrato = this.dbData(this.newContrato._dtContrato);
        this.newContrato.dt_vigencia = this.dbData(this.newContrato._dtVigencia);
        this.newContrato = {...this.newContrato, honorario: this.idHonorario, index: this.editedIndex}
        if(this.editedIndex === -1){
          try{
            this.$axios.$post('/contrato/', this.newContrato)
              .then(data => {
                this.contratos.unshift(data)
                this.$toast.success('Cadastro Efetuado com Sucesso')
                this.close()
              }).catch(e => this.$toast.error(`Error ${e}`))
          }catch(err){
            this.$toast.error(err)
            this.close()
          }
        }else{
          try{
            this.$axios.$put('/contrato/' + this.newContrato.id + '/', this.newContrato)
              .then(data => {
                this.contratos.splice(this.newContrato.index, 1, data)
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
        this.editedIndex = this.contratos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.newContrato.documento = this.editedItem.documento
        this.newContrato.id = this.editedItem.id
        this.newContrato.honorario = this.editedItem.honorario
        this.newContrato._dtContrato = this.dataConvert(this.editedItem.dt_contrato);
        this.newContrato._dtVigencia = this.dataConvert(this.editedItem.dt_vigencia);
        this.newContrato.vl_honorario = this.editedItem.vl_honorario
        this.newContrato.nr_funcionarios = this.editedItem.nr_funcionarios
        this.newContrato.vl_por_funcionario = this.editedItem.vl_por_funcionario
        this.newContrato.vl_por_funcionario_secundario = this.editedItem.vl_por_funcionario_secundario
        this.newContrato.indice_reajuste = this.editedItem.indice_reajuste
        this.newContrato.regra = this.editedItem.regra_contrato.id
      },

      viewItem (item) {
        this.editedItem = Object.assign({}, item)
        this.show = true
        this.toTop()
      },

      deleteItem (item) {
        this.editedIndex = this.contratos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        try{
          this.$axios.$delete('/contrato/' + this.editedItem.id)
            .then(() => {
              this.contratos.splice(this.editedIndex, 1)
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
        this.show = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.newContrato = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.show= false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      dbData(data){
        if( data ){
          let sData = data.split("/");
          sData = `${sData[2]}-${sData[1]}-${sData[0]}`
          return sData
        }
        return null;
      },

      dataConvert(data){
        if(data){
          let sData = data.split("-");
          sData = `${sData[2]}/${sData[1]}/${sData[0]}`
          return sData
        }
        return null;
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
</style>
