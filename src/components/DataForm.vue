<template>
  <b-card :header="header">
    <div class="data-form">
      <div class="row">
        <div class="col col-md-8">
          <legend v-if="model['id']">{{$t('actions.edit')}}: {{model['id']}}</legend>
        </div>
        <div class="col col-md-4 text-right hidden-sm-down">
          <b-btn @click="$router.go(-1)">{{$t('actions.back')}}</b-btn>
          <b-btn variant="primary" @click="$refs.form.handleSubmit()">{{$t('actions.save')}}</b-btn>
        </div>
      </div>
      <b-form-builder group-by="group" v-if="loaded" :fields="fields" ref="form" v-model="model" :action="resourceUri" :method="method" @success="onSuccess"></b-form-builder>
    </div>
  </b-card>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import _ from 'lodash'
import types from '../store/types'

export default {
  components: {},
  props: {
    resource: {
      type: String,
      required: true
    },
    id: {
      default: "",
      required: true
    },
    formPath: {
      type: String,
      default: "view", //use view instead of form
      required: false
    }
  },
  data() {
    return {
      loaded: false,
      choices: {},
      fields: {},
      model: {},
      errors: []
    };
  },

  computed: {
    resourceUri() {
      return this.resource + "/" + this.id;
    },
    formUri() {
      return this.resource + "/" + this.formPath;
    },
    isNew() {
      return !this.id;
    },
    method() {
      return this.isNew ? "post" : "put";
    },
    with() {
      return _.filter(
        _.map(this.fields, (v) => v.ref && v.ref.split(".").shift())
      );
    },
    header() {
      return `
        ${this.currentMenu.name}
        <small> ${this.resource.toUpperCase()} </small>
      `;
    },
    ...mapState(["nav"]),
    ...mapGetters(["currentMenu"])
  },
  methods: {
    fetch() {
      if (this.isNew) {
        this.loaded = true
        return;
      }
      this.$http
        .get(this.resourceUri, {
          params: {
            query: {
              id: this.id //change into id
            }
          }
        })
        .then(({ data }) => {
          this.loaded = true
          this.model = data;
        });
    },
    fetchForm() {
      this.$http.get(this.formUri).then(({ data }) => {
        // data在这里传的其实是fields        
        let fields = eval('(' + data + ')') //解析字符串为对象

        this.fields = fields;

        this.fetch();
        this.fetchToken();
      });
    },
    fetchToken() {      
      // get token for uploading
      this.$http.request({
        url: 'upload/token',
        baseURL: 'http://suilin.top:8081/', //可以修改
        methodl: 'get'
      })
      .then(({data})=>{
        this.$store.commit(types.SET_TOKEN,data.token)
      })
    },

    onSuccess() {
      this.$router.go(-1);
    }
  },
  mounted() { },
  created() {
    this.fetchForm();
  }
};
</script>

