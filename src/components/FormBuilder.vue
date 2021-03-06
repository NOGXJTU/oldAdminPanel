<template>
  <div v-if="model">
    <b-form ref="form" inline @submit.prevent="handleSubmit" v-if="inline" enctype="multipart/form-data">
      <template v-for="(field, name) in fields">
        <label :for="'input_' + name" class="m-1" :key="name">{{field.label || $inflection.titleize(name)}}</label>
        <b-form-field :parent="model" class="m-1 mr-4" v-model="model[name]" :id="'input_' + name" :name="name" :field="field" :state="!hasError(name)" :key="id + '_' +name" />
      </template>

      <slot name="actions">
        <b-button type="submit" variant="primary">{{submitText}}</b-button>
        <b-button type="button" variant="secondary" @click="$router.go(-1)" v-if="backText">{{backText}}</b-button>
        <slot name="extra-buttons"></slot>
      </slot>
    </b-form>

    

    <b-form ref="form" :inline="false" @submit.prevent="handleSubmit" enctype="multipart/form-data" v-else>

      <b-tabs class="my-3" v-if="groupBy">
        <b-tab v-for="(fields, tabName) in groupedFields" :title="tabName || $t('messages.default')" :key="tabName">
          <div class="row">
            <b-form-group :class="getClass(field)"  v-if="isShowField(field) && model" :state="!hasError(name)" 
            v-for="(field, name) in fields" :key="id + '_' +name" v-bind="field" :label-for="'input_' + name"
            :label="field.label || $inflection.titleize(name)">
              <div class="">
                <b-form-field :class="getInputClass(field)" :parent="model" v-model="model[name]" :name="name" :field="field" :state="!hasError(name)" :id="'input_' + name" />
              </div>
            </b-form-group>
          </div>
        </b-tab>
      </b-tabs>
      <div class="row" v-else>
        <b-form-group :class="getClass(field)"  v-if="isShowField(field) && model" :state="!hasError(name)" 
        v-for="(field, name) in fields" :key="id + '_' +name" v-bind="field" :label-for="'input_' + name"
        :label="field.label || $inflection.titleize(name)">
          <div class="">
            <b-form-field :class="getInputClass(field)" :parent="model" v-model="model[name]" :name="name" :field="field" :state="!hasError(name)" :id="'input_' + name" />
          </div>
        </b-form-group>
      </div>
      

      <slot name="actions">
        <b-button type="submit" variant="primary">{{submitText}}</b-button>
        <b-button type="button" variant="secondary" @click="$router.go(-1)" v-if="backText">{{backText}}</b-button>
      </slot>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "b-form-builder",
  components: {},
  props: {
    id: {
      type: String,
      default() {
        return "form_" + parseInt(Math.random() * 9999);
      }
    },
    col: {
      type: Number,
      default: 12
    },
    inline: {
      type: Boolean,
      default: false
    },
    useFormData: {
      type: Boolean,
      default: false
    },
    groupBy: {
      type: String,
      default: null
    },
    value: {
      default() {
        return {};
      }
    },
    fields: {
      required: true,
      default() {
        return {};
      }
    },
    onSubmit: {
      type: Function,
      required: false
    },
    action: {},
    method: {
      default: "post"
    },
    submitText: {
      default() {
        return this.$t("actions.save");
      }
    },
    backText: {
      default() {
        return this.$t("actions.back");
      }
    },

    successMessage: {
      default() {
        return this.$t("messages.succeed");
      }
    }
  },
  data() {
    return {
      model: null,
      errors: []
    };
  },
  watch: {
    value(val) {
      this.model = val;
    }
  },
  computed: {
    groupedFields() {
      const ret = {};
      _.keys(_.groupBy(this.fields, this.groupBy)).map(v => {
        // console.log(v, v == 'undefined')
        let tabName = v;
        if (v == "undefined") {
          v = null;
          tabName = this.$t("messages.default");
        }
        ret[tabName] = _.pickBy(this.fields, field => field.group == v);
      });
      return ret;
    }
  },
  methods: {
    titlize() {},
    isShowField(field) {
      return (
        !field.showWhen || this.model[field.showWhen] || eval(field.showWhen)
      );
  },
    getInputClass() {
      return [];
      // const classNames = [];
      // classNames.push(`col-lg-${field.input_cols ? field.input_cols : "12"}`);
      // return classNames;
    },
    getClass(field) {
      const cols = field.cols ? field.cols : 12;
      const classNames = ["col-lg-" + cols, "col-" + Math.min(12, cols * 2)];
      return classNames;
    },
    hasError(name) {
      return _.find(this.errors, v => v.field == name);
    },

    handleSubmit() {      
      if (this.onSubmit) {
        return this.onSubmit(this.model);
      }
      const methodName = String(this.method).toLowerCase();
      // console.log(this.$refs.form);
      let formData = this.model;
      if (this.useFormData) {
        formData = new FormData();
        _.mapValues(this.model, (v, k) => formData.append(k, v));
      }

      //dbg
      // console.log(this.action)
      // console.log(formData)
      console.log('formDatahere');
      
      console.log(formData);
      

      if (this.action === 'user/signIn') {
        console.log("log in other server");
        
        //在另一台服务器登陆
        this.$http[methodName](this.action, formData)
        this.$http.request({
          url: 'user/signIn',
          baseURL: 'http://suilin.top:8081/', //可以修改
          method: 'post',
          data: formData
        })
        .then(({ data }) => {
          if (this.successMessage) {
            this.$snotify.success(this.successMessage);
          }
          this.errors = [];
          this.$emit("success", data);
        })
        .catch(({ data, status }) => {
          if (status == 422) {
            this.errors = data.message;
          }
        });
      } else {
        this.$http[methodName](this.action, formData)
        .then(({ data }) => {
          if (this.successMessage) {
            this.$snotify.success(this.successMessage);
          }
          this.errors = [];
          this.$emit("success", data);
        })
        .catch(({ data, status }) => {
          if (status == 422) {
            this.errors = data.message;
          }
        });
      }
    }
  },
  mounted() {
    this.model = this.value;
  },
  created() {}
};
</script>

