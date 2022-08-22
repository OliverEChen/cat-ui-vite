
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from "./config/unocss";

// https://vitejs.dev/config/

const rollupOptions = {
external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  resolve: { alias: { "vue": "vue/dist/vue.esm-bundler.js" } },

  plugins: [
      vue(),
    // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    // 添加UnoCSS插件
    Unocss()
  ],
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },

  // 添加库模式配置
  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    brotliSize: true,  // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "CatUI",
      fileName: "cat-ui",
      formats: ["esm", "umd", "iife"], // 导出模块类型
    },
  },

});