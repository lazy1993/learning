# React 项目配置 eslint 以及 prettier

1. 安装 eslint npm install --save-dev eslint  
2. 使用 eslint 交互式工具配置：./node_modules/.bin/eslint --init  
   1. How would you like to use ESLint? To check syntax, find problems, and enforce code style  
   2. What type of modules does your project use? JavaScript modules (import/export)  
   3. Which framework does your project use? React
   4. Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Browser  
   5. How would you like to define a style for your project? Use a popular style guide  
   6. Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)  
   7. What format do you want your config file to be in? JavaScript  
3. 配置 TypeScript 解析
   1. 安装依赖：npm install typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev  
4. 安装 prettier  
   1. npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier  
      1. prettier: 格式化规则程序  
      2. eslint-config-prettier: 使用 prettier 的规则覆盖对应的 eslint 规则  
      3. eslint-plugin-prettier: prettier 使用 eslint 的部分规则进行代码格式化  
5. 修改 .eslintrc.js 文件  
```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',

    // 下面是测试的几个全局方法
    describe: true,
    it: true,
    expect: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow extend-native
    'no-extend-native': 0,
    // 要求在语句末尾使用分号
    semi: [1, 'always', { omitLastInOneLineBlock: true }],
    // 要求或禁止函数圆括号之前有一个空格
    'space-before-function-paren': [1, 'never'],
    // 要求或禁止块内填充
    'padded-blocks': [0, { blocks: 'always' }],
    // 要求或禁止使用拖尾逗号
    'comma-dangle': [0, 'always-multiline'],
    // 强制使用一致的缩进
    indent: [1, 2, { SwitchCase: 1 }],
    // 禁止使用 空格 和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 强制操作符使用一致的换行符风格（操作符后面换行）
    'operator-linebreak': [2, 'after'],
    // 强制js字符串使用单引号
    quotes: [2, 'single'],
    // 允许在正则表达式中出现控制字符
    'no-control-regex': 0,
    // 允许出现不同的换行符
    'linebreak-style': 0,

    // 设置 缩进为 2 个空格
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    // 允许在只有一个 export 语句的情况下 不是 export default
    'import/prefer-default-export': 0,
    // 允许使用 '^@/', '^umi/' 别名进行查找模块
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    // 允许在 .js 文件中写 jsx
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    // 不强制使用解构赋值
    'react/destructuring-assignment': 0,
    // 允许页面没有引入 react 的时候使用 jsx
    'react/react-in-jsx-scope': 0,
  },
};

```  
