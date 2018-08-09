<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- /步骤条 -->

    <!-- 标签页 -->
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- <CategoryCascader></CategoryCascader> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor
          v-model="form.goods_introduce"
          ref="myQuillEditor"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          class="quilleditor">
        </quill-editor>
      </el-tab-pane>
      <!-- 省市区三联动组件练习 cascader -->
      <el-tab-pane label="地图练习">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-tab-pane>
    </el-tabs>
    <!-- /标签页 -->
  </el-card>
</template>
<script>
// 配置省市三联动
import { regionData } from 'element-china-area-data';
// 配置富文本编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: ''
      }
    };
  },
  created() {
  },
  methods: {
    async handleAdd () {
      console.log(this.form);
    },
    onEditorBlur () {
      console.log('onEditorBlur');
    },
    onEditorFocus () {
      console.log('onEditorFocus');
    },
    onEditorReady () {
      console.log('onEditorReady');
    },
    handleChange (value) {
      console.log(value);
    }
  },
  // 配置富文本编辑器
  components: {
    quillEditor
  }
};
</script>

<style>
.quilleditor {
  margin-top: 20px;
  height: 400px!important;
  border-bottom: 1px solid #000000;
}
</style>
