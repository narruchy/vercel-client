<template>
	<div id="app" class="ui container">
		<div class="col-12 mb-4">
      <div class="d-flex justify-content-between">
        <h1>Information Table</h1>
        <div>
          <button class="btn btn-success mr-3" @click="downloadCSV()">Download CSV</button>
          <router-link to="/" class="btn btn-danger">
            Go Back
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-12">
      <vuetable ref="vuetable"
        :api-mode="false"
        :fields="['name','gender','email','phone','address','dob','contact_via','nationality']"
        :per-page="perPage"
        :data-manager="dataManager"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
      >
      </vuetable>
      <div style="padding-top:10px">
        <vuetable-pagination ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
      </div>      
    </div>

	</div>
</template>

<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import axios from "axios";
import _ from "lodash";

export default {
  name: "app",

  components: {
    Vuetable,
    VuetablePagination
  },

  data() {
    return {
      perPage: 5,
      data: []
    };
  },

  watch: {
    data() {
      this.$refs.vuetable.refresh();
    }
  },

  mounted() {
    axios.get("https://naresh-task-app.herokuapp.com/api/information").then(response => {
      this.data = response.data;
    });
  },

  methods: {
    downloadCSV: function() {
      const a = document.createElement('a')
      a.href = 'https://naresh-task-app.herokuapp.com/api/download'
      a.click()
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      console.log('pagination:', pagination)
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
      console.log("slot actions: on-click", data.name);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
button.ui.button {
  padding: 8px 3px 8px 10px;
	margin-top: 1px;
	margin-bottom: 1px;
}
.pagination {
  display: flex;
  gap: 10px;
}
a.item {
  font-size:1rem;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 4px 15px;
  border-radius: 3px;
}
</style>
