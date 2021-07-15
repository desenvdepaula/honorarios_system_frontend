<template>
  <v-card flat>
    <!-- src="https://www.nawpic.com/media/2020/mountain-nawpic-9.jpg" -->
    <v-toolbar     
      dark
      flat
      prominent
      extended>

        <v-toolbar-title>HONORÁRIO</v-toolbar-title>

        <v-spacer></v-spacer>
    </v-toolbar>

    <v-container>
        <v-row justify="center"> 
            <v-col>
                <v-card elevation="2"  style="margin-top: -64px; padding: 40px">

                    <v-row>
                        <v-col>
                            <h3 class="text-center dark-text">EMPRESA X</h3>
                            <p><strong  class="dark-text">NOME:</strong>  <span class="light-text">EMPRESA</span></p>
                            <p><strong  class="dark-text">N°:</strong>  <span class="light-text">0001</span></p>
                            <p><strong  class="dark-text">OUTROS DADOS:</strong>  <span class="light-text">...</span></p>                          
                        </v-col>
                        <v-col>
                            <h3 class="text-center dark-text">CONTRATO</h3>
                            <p><strong  class="dark-text">NOME:</strong>  <span class="light-text">EMPRESA</span></p>
                            <p><strong  class="dark-text">N°:</strong>  <span class="light-text">0001</span></p>
                            <p><strong  class="dark-text">OUTROS DADOS:</strong>  <span class="light-text">...</span></p>  
                        </v-col>
                    </v-row>

                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-center custom-text"> <h2>DATA</h2> </th>
                                <th class="text-center custom-text"> <h2>LIMITE FUNCIONÁRIOS</h2> </th>
                                <th class="text-center custom-text"> <h2>VALOR</h2> </th>
                                <th class="text-center custom-text"> <h2>REGRA</h2> </th>
                                <th class="text-center custom-text"> <h2>AÇÕES</h2> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="honorario in honorarios" :key="honorario.codigo">
                                <td class="text-center custom-text">{{ honorario.data }}</td>
                                <td class="text-center custom-text">{{ honorario.limite_funcionarios }}</td>
                                <td class="text-center custom-text">{{ honorario.valor }}</td>
                                <td class="text-center custom-text">{{ honorario.regra }}</td>
                                <td class="text-center custom-text"> 
                                    <v-btn color="primary" elevation="2" icon>
                                        <v-icon dark> mdi-pencil </v-icon>
                                    </v-btn>
                                    <v-btn color="primary" elevation="2" icon>
                                        <v-icon dark> mdi-delete </v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </v-card>
</template>

<script>
    export default{
        layout: 'default',
        data(){
            return {
                honorarios: []
            }
        },
        created(){
            this.initialize();
        },
        methods: {
            initialize(){
                this.honorarios = [
                    {
                        codigo: 0,
                        data: '10/10/2020',
                        limite_funcionarios: 2,
                        valor: 30.00,
                        regra: 'REGRA 01',
                    },
                    {
                        codigo: 1,
                        data: '10/10/2020',
                        limite_funcionarios: 2,
                        valor: 30.00,
                        regra: 'REGRA 01',
                    },
                    {
                        codigo: 2,
                        data: '10/10/2020',
                        limite_funcionarios: 2,
                        valor: 30.00,
                        regra: 'REGRA 01',
                    },
                    {
                        codigo: 3,
                        data: '10/10/2020',
                        limite_funcionarios: 2,
                        valor: 30.00,
                        regra: 'REGRA 01',
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    table thead tr:first-child{
        background-color: #F8F9FA;
    }  
    table tbody tr{
        background-color: #CED4DA;
    } 
    table tbody tr:nth-child(even){
        background-color: #F8F9FA;
    } 
    .text-center{text-align: center;}
    .custom-text{ font-size: 22px; font-weight: bold;}

    .dark-text{ color: #575757;}
    .light-text{ color: #848484; }

</style>