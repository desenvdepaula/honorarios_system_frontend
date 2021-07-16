import Vue from 'vue'

const dateFilter = value => {
  return formatDate(value);
};

function formatDate(inputDate) {
  let serverData = inputDate.split("-");
  serverData = `${serverData[2]}/${serverData[1]}/${serverData[0]}`
  return serverData
}

Vue.filter('date', dateFilter)
