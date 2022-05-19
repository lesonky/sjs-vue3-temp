import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
// vite.config.ts 增加如下的配置
import autoprefixer from 'autoprefixer';
import svgLoader from 'vite-svg-loader';

// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(
  path.resolve('./src/assets/scss/variable.scss'),
);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 别名配置
    alias: {
      '@': normalizePath(path.join(__dirname, 'src')),
      '@assets': normalizePath(path.join(__dirname, 'src/assets')),
    },
  },
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
      ],
    },
  },
  plugins: [vue(), svgLoader()],
});
